import {Col, Layout, Row, Space} from 'antd';
import {GithubOutlined, InstagramOutlined, TwitterOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';

const {Footer} = Layout;

const StyledFooter = styled(Footer)`
    background-color: #001529;
    padding: 24px 50px;
    color: rgba(255, 255, 255, 0.65);
`;

const FooterContent = styled.div`
    text-align: center;
`;

const SocialIcon = styled.a`
    color: rgba(255, 255, 255, 0.65);
    font-size: 24px;
    margin: 0 8px;
    transition: color 0.3s;

    &:hover {
        color: #fff;
    }
`;

const CustomFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <StyledFooter>
            <Row justify="center">
                <Col xs={24} sm={24} md={12} lg={8}>
                    <FooterContent>
                        <Space direction="vertical" size="large">
                            <Space>
                                <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    <GithubOutlined/>
                                </SocialIcon>
                                <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <TwitterOutlined/>
                                </SocialIcon>
                                <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <InstagramOutlined/>
                                </SocialIcon>
                            </Space>
                            <p>© {currentYear} 웹툰 완결 알리미. All Rights Reserved.</p>
                        </Space>
                    </FooterContent>
                </Col>
            </Row>
        </StyledFooter>
    );
};

export default CustomFooter;