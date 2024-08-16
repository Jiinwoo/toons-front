import {MenuOutlined} from "@ant-design/icons";
import {Button, Layout as AntLayout, Menu, Tooltip} from "antd";
import Logo from "../../assets/main-bg.svg?react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import {loginModalState} from "../../state/loginState.ts";
import {useSetRecoilState} from "recoil";

const {Header: AntdHeader} = AntLayout;

interface HeaderProps {
    showSider: () => void;
}


const Header = ({showSider}: HeaderProps) => {
    const setLoginModal = useSetRecoilState(loginModalState);
    const {isAuthenticated} = useAuth()
    return <AntdHeader>
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px'
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip title={"drawer"}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<MenuOutlined/>}
                        onClick={showSider}
                    />
                </Tooltip>

                <Link to={"/"} style={{display: 'flex', alignItems: 'center'}}>
                    <Logo style={{width: 100, height: 64, paddingLeft: 8}}/>
                </Link>

            </div>
            <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">자유 게시판</Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/webtoons"}>
                        웹툰
                    </Link>
                </Menu.Item>
                {isAuthenticated ?
                    <Menu.Item key="3">
                        <Link to={"/profile"}>
                            프로필
                        </Link>
                    </Menu.Item>
                    :
                    <Menu.Item key="3" onClick={() => setLoginModal(true)}>
                        로그인
                    </Menu.Item>
                }
            </Menu>
        </div>
    </AntdHeader>
}

export default Header;