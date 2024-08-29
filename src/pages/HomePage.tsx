import styled from "@emotion/styled";
import {Avatar, Card, Col, List, Row, Space} from "antd";
import {useQuery} from "@tanstack/react-query";
import {queryHomeApi} from "../apis/home.ts";
import {Link} from "react-router-dom";
import {LikeOutlined} from "@ant-design/icons";

function HomePage() {
    const {data,} = useQuery({
        queryKey: ["home"],
        queryFn: queryHomeApi,
    })

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <MainContentsWrapper>
            <Row>
                <Col xs={24} sm={12}>
                    <Card
                        title="인기 게시물"
                        extra={<Link to={"/posts"}>More</Link>}
                        styles={{
                            body: {
                                padding: '0 24px'
                            }
                        }}
                    >
                        <List
                            style={{height: "300px", overflow: "scroll"}}
                            dataSource={data.hotPosts}
                            renderItem={(post) => (
                                <List.Item key={post.id}>
                                    <Space style={{width: '100%', justifyContent: 'space-between'}}>
                                        <span>{post.title}</span>
                                        <span>
                                            <LikeOutlined/> {post.likeCount} 좋아요
                                        </span>
                                    </Space>
                                </List.Item>
                            )}
                        />

                    </Card>
                </Col>
                <Col xs={24} sm={12}>
                    <Card title="이번주 완결 웹툰" styles={{
                        body: {
                            padding: '0 24px'
                        }
                    }} extra={<Link to={"/webtoons"}>More</Link>}
                    >
                        <List
                            style={{height: "300px", overflow: "scroll"}}
                            dataSource={data.completedWebtoons}
                            renderItem={(webtoon) => (
                                <List.Item key={webtoon.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                size={64}
                                                src={webtoon.thumbnailUrl}
                                            />
                                        }
                                    />
                                    <List.Item.Meta
                                        title={webtoon.title}

                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="알림 등록 순위" extra={<Link to={"/webtoons"}>More</Link>}>
                        <List
                            dataSource={data.topAlarmWebtoons}
                            renderItem={(webtoon) => (
                                <List.Item key={webtoon.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                size={64}
                                                src={webtoon.thumbnailUrl}
                                            />
                                        }
                                        // title={webtoon.title}
                                    />
                                    <List.Item.Meta
                                        title={webtoon.title}
                                    />

                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            {/*<MainBanner/>*/}
            {/*<MainContentsWrapper className="wrapper">*/}
            {/*    /!*<WebtoonListSection />*!/*/}
            {/*</MainContentsWrapper>*/}
        </MainContentsWrapper>

    );
}

const MainContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin: 32px auto 16px;
    max-width: 1200px;
    min-height: calc(100vh - 64px - 70px);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    overflow: initial;
    background-color: #f5f5f5;
`;

export default HomePage;
