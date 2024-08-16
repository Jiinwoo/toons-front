import {useEffect, useState} from 'react';
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getWebtoonsApi} from "../apis/webtoons.ts";
import {Card, Col, Input, List, Pagination, Row, Select, Space, Tag, Typography} from 'antd';
import {LinkOutlined} from "@ant-design/icons";
import {getDayInKorean, getDayOfWeek, getPlatformColor} from "../utils/string.ts";

const { Text, Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const WebtoonListPage = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const { data, isLoading } = useQuery({
        queryKey: ['webtoons', searchTitle, selectedDays, selectedPlatforms, page],
        queryFn: () => getWebtoonsApi(page - 1, pageSize, searchTitle, selectedDays.map(getDayOfWeek), selectedPlatforms),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5, // 5분
    });

    const handleSearch = (value: string) => {
        setSearchTitle(value);
        setPage(1);
    };

    const handleDayChange = (value: string[]) => {
        setSelectedDays(value);
        setPage(1);
    };

    const handlePlatformChange = (value: string[]) => {
        setSelectedPlatforms(value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // 페이지 변경 시 스크롤을 맨 위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Search
                        placeholder="웹툰 제목 검색"
                        onSearch={handleSearch}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span={8}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="요일 선택"
                        onChange={handleDayChange}
                        allowClear
                    >
                        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                            <Option key={day} value={day}>{day}요일</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={8}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="플랫폼 선택"
                        onChange={handlePlatformChange}
                        allowClear
                    >
                        <Option value="NAVER">네이버</Option>
                        <Option value="KAKAO">카카오</Option>
                    </Select>
                </Col>
            </Row>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <List
                        grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                        dataSource={data?.content}
                        renderItem={(webtoon) => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={<img
                                        alt={webtoon.title}
                                        src={webtoon.thumbnailUrl}
                                    />}
                                    actions={[
                                        <a href={webtoon.link} target="_blank" rel="noopener noreferrer">
                                            <LinkOutlined key="link"/> 보러가기
                                        </a>
                                    ]}
                                >
                                    <Card.Meta
                                        title={<Title level={4}>{webtoon.title}</Title>}
                                        description={
                                            <Space direction="vertical">
                                                <Text>연재일: {getDayInKorean(webtoon.dayOfWeek)}요일</Text>
                                                <Tag color={getPlatformColor(webtoon.platform)}>{webtoon.platform}</Tag>
                                            </Space>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Row justify="center">
                        <Col>
                            <Pagination
                                current={page}
                                total={data?.totalElements}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                                style={{ marginTop: '20px' }}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </Space>
    );
}

export default WebtoonListPage;