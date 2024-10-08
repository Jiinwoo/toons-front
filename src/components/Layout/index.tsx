import {Drawer, Layout as AntLayout, Menu} from "antd";
import {Outlet} from "react-router-dom";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import CustomFooter from "./FooterContent.tsx";
import Header from "./Header.tsx";
import LoginModal from "../LoginModal.tsx";
import styled from "@emotion/styled";

const {Content} = AntLayout;

const Layout = () => {

    const [siderVisible, setSiderVisible] = useState(false);

    const showSider = () => {
        setSiderVisible(true);
    };

    const onClose = () => {
        setSiderVisible(false);
    };

    const SideContent = () => (
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
              style={{height: '100%', borderRight: 0}}>
            <Menu.SubMenu key="sub1" icon={<UserOutlined/>} title="인기 웹툰">
                <Menu.Item key="1">웹툰 1</Menu.Item>
                <Menu.Item key="2">웹툰 2</Menu.Item>
                <Menu.Item key="3">웹툰 3</Menu.Item>
                <Menu.Item key="4">웹툰 4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" icon={<LaptopOutlined/>} title="장르별 웹툰">
                <Menu.Item key="5">액션</Menu.Item>
                <Menu.Item key="6">로맨스</Menu.Item>
                <Menu.Item key="7">코미디</Menu.Item>
                <Menu.Item key="8">스릴러</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub3" icon={<NotificationOutlined/>} title="완결 알람">
                <Menu.Item key="9">알람 설정</Menu.Item>
                <Menu.Item key="10">알람 목록</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
    return (
        <>
            <AntLayout>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    open={siderVisible}
                >
                    <SideContent/>
                </Drawer>
                <Header showSider={showSider}/>
                <Content>
                    <MainContentsWrapper>
                        <Outlet/>
                    </MainContentsWrapper>
                </Content>
                <CustomFooter/>
            </AntLayout>
            <LoginModal/>
        </>
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


export default Layout;
