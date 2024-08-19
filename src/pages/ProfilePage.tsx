import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, List, Typography, Card, Space, Tag, message} from 'antd';
import {requestVerificationApi} from "../apis/auth.ts";
import useAuth from "../hooks/useAuth.ts";
import {deleteAlarmApi, getAlarmsApi} from "../apis/alarm.ts";
import {getPlatformColor} from "../utils/string.ts";

const {Title, Text} = Typography;

const ProfilePage: React.FC = () => {
    const queryClient = useQueryClient();
    const {user, isLoading} = useAuth()

    const {data: alarms, isLoading: isAlarmLoading} = useQuery({
        queryKey: ['alarmWebtoons'],
        queryFn: getAlarmsApi,
    });

    const verificationMutation = useMutation({
        mutationFn: requestVerificationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userProfile']});
            message.success('인증 요청이 성공적으로 전송되었습니다.');
        },
        onError: (error) => {
            message.error('인증 요청 중 오류가 발생했습니다.');
            console.error('Verification error:', error);
        },
    });

    const removeAlarmMutation = useMutation({
        mutationFn: deleteAlarmApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['alarmWebtoons']});
            message.success('알람이 성공적으로 제거되었습니다.');
        },
        onError: (error) => {
            message.error('알람 제거 중 오류가 발생했습니다.');
            console.error('Remove alarm error:', error);
        },
    });

    const handleVerification = (method: 'phone' | 'email') => {
        verificationMutation.mutate(method);
    };

    const handleRemoveAlarm = (webtoonId: number) => {
        removeAlarmMutation.mutate(webtoonId);
    };

    if (isAlarmLoading || isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Profile not found</div>;
    }

    return (
        <Card title="프로필" style={{width: '100%', maxWidth: 600, margin: '0 auto'}}>
            <Space direction="vertical" size="large" style={{width: '100%'}}>
                <div>
                    <Title level={4}>기본 정보</Title>
                    <Text>이름: {user.name}</Text>
                    <br/>
                    <Text>로그인 제공자: {user.provider}</Text>
                </div>

                <div>
                    <Title level={4}>알림 설정</Title>
                    <Space>
                        <Button
                            onClick={() => handleVerification('phone')}
                            // disabled={profile.isPhoneVerified || verificationMutation.isPending}
                            loading={verificationMutation.isPending && verificationMutation.variables === 'phone'}
                        >
                            {/*{profile.isPhoneVerified ? '전화번호 인증됨' : '전화번호 인증'}*/}
                        </Button>
                        <Button
                            onClick={() => handleVerification('email')}
                            // disabled={profile.isEmailVerified || verificationMutation.isPending}
                            loading={verificationMutation.isPending && verificationMutation.variables === 'email'}
                        >
                            {/*{profile.isEmailVerified ? '이메일 인증됨' : '이메일 인증'}*/}
                        </Button>
                    </Space>
                    <br/>
                    <Text>
                        {/*선호하는 알림 방법: {profile.preferredAlarmMethod || '설정되지 않음'}*/}
                    </Text>
                </div>

                <div>
                    <Title level={4}>알람 등록된 웹툰</Title>
                    <List
                        dataSource={alarms}
                        renderItem={alarm => (
                            <List.Item
                                extra={<img width={100} alt={alarm.webtoon.title} src={alarm.webtoon.thumbnailUrl}/>}
                                actions={[
                                    <Button
                                        onClick={() => handleRemoveAlarm(alarm.id)}
                                        loading={removeAlarmMutation.isPending && removeAlarmMutation.variables === alarm.id}
                                    >
                                        알람 제거
                                    </Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={alarm.webtoon.title}
                                    description={<Tag color="blue">알람 등록됨</Tag>}
                                />
                                <Tag color={getPlatformColor(alarm.webtoon.platform)}>{alarm.webtoon.platform}</Tag>
                            </List.Item>
                        )}
                    />
                </div>
            </Space>
        </Card>
    );
};

export default ProfilePage;