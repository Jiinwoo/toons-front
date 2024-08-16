import styled from "@emotion/styled";
import {Card, Col, Row} from "antd";

function HomePage() {



    return (
        <MainContentsWrapper>
            <Row>
                <Col span={12}>
                    <Card
                        title="자유 게시판"
                        extra={<a href="#">More</a>}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="완결 웹툰 목록" extra={<a href="#">More</a>}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="완결 대기 순위" extra={<a href="#">More</a>}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
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