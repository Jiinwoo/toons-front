import styled from "@emotion/styled";
import {Avatar, Card, Col, List, Row} from "antd";
import {useQuery} from "@tanstack/react-query";
import {queryHomeApi} from "../apis/home.ts";
import {Link} from "react-router-dom";

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
                <Col span={12}>
                    <Card
                        title="자유 게시판"
                        extra={<Link to={"/posts"}>More</Link>}
                        style={{height: "300px"}}
                    >
                        {data.hotPosts.map((post) => (
                            <p key={post.id}>{post.title}</p>
                        ))}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="완결 웹툰 목록" extra={<Link to={"/webtoons"}>More</Link>}
                          style={{height: "300px"}}
                    >
                        {data.completedWebtoons.map((webtoon) => (
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <p key={webtoon.id}>{webtoon.title}</p>
                                <img style={{width: 64, height: 64}} alt={""} src={webtoon.thumbnailUrl}/>
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="완결 대기 순위" extra={<Link to={"/webtoons"}>More</Link>}>
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