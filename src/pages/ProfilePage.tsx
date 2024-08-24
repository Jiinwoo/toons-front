import React, {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Card, Input, List, message, Space, Tag, Typography} from 'antd';
import {requestVerificationApi, subscribeApi, unsubscribeApi} from "../apis/auth.ts";
import useAuth from "../hooks/useAuth.ts";
import {deleteAlarmApi, getAlarmsApi} from "../apis/alarm.ts";
import {getPlatformColor} from "../utils/string.ts";

const {Title, Text} = Typography;

const ProfilePage: React.FC = () => {
    const queryClient = useQueryClient();
    const {user, isLoading} = useAuth()

    const [email, setEmail] = useState("")

    const {data: alarms, isLoading: isAlarmLoading} = useQuery({
        queryKey: ['alarmWebtoons'],
        queryFn: getAlarmsApi,
    });

    const unsubscribeMutation = useMutation({
        mutationFn: unsubscribeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']})
            message.success('알림이 성공적으로 해지되었습니다.')
        }
    })

    const subscribeMutation = useMutation({
        mutationFn: subscribeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']})
            message.success('알림이 성공적으로 등록되었습니다.')
        }
    })

    const verificationMutation = useMutation({
        mutationFn: requestVerificationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']});
            message.success('인증 메일이 발송되었습니다.');
        },
        onError: (error) => {
            message.error('인증 메일 발송 중 오류가 발생했습니다.');
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

    const handleVerification = () => {
        verificationMutation.mutate(email);
    };

    const handleRemoveAlarm = (webtoonId: number) => {
        removeAlarmMutation.mutate(webtoonId);
    };

    useEffect(() => {
        if (user?.verifiedEmail) {
            setEmail(user.verifiedEmail)
        }
    }, [user])

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

                    {user.verifiedEmail && <>
                        <br/>
                        <Text>인증된 이메일: {user.verifiedEmail}</Text>
                    </>}
                    <br/>
                    <Text>로그인 제공자: {user.provider}</Text>
                </div>

                <div>
                    <Title level={4}>알림 설정</Title>
                    <Space>
                        <Input
                            disabled={verificationMutation.isPending || user.verifiedEmail !== null}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일 주소"
                            style={{width: 200}}
                        />
                        <Button
                            onClick={() => handleVerification()}
                            disabled={verificationMutation.isPending || user.verifiedEmail !== null}
                            loading={verificationMutation.isPending}
                        >
                            {user.verifiedEmail ? '인증 완료됨' : '인증 요청'}
                        </Button>

                        {user.subscribe ? (
                            <Button
                                onClick={() => unsubscribeMutation.mutate()}
                                loading={unsubscribeMutation.isPending}
                            >
                                구독 해지하기
                            </Button>
                        ) : (
                            <Button
                                disabled={user.verifiedEmail === null}
                                onClick={() => subscribeMutation.mutate()}
                                loading={subscribeMutation.isPending}
                            >
                                구독 하기
                            </Button>
                        )}
                    </Space>
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