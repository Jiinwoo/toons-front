import {MenuOutlined} from "@ant-design/icons";
import {Button, Layout as AntLayout, Menu, MenuProps, Tooltip} from "antd";
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
    const {isAuthenticated, logout} = useAuth()
    const menuItems: MenuProps["items"] = [
        {
            key: "home",
            label: <Link to={"/posts"}>자유 게시판</Link>,
        },
        {
            key: "2",
            label: <Link to={"/webtoons"}>웹툰</Link>,
        },
        ...(isAuthenticated ?
            [{
                key: "3",
                label: <Link to={"/profile"}>프로필</Link>
            }, {
                key: "4",
                label: "로그아웃",
                onClick: logout
            }] :
            [{
                key: "3",
                label: "로그인",
                onClick: () => setLoginModal(true)
            }])
    ];

    return <AntdHeader style={{padding: 0}}>
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
            <Menu mode="horizontal"
                  defaultSelectedKeys={['1']}
                  items={menuItems}
            />
        </div>
    </AntdHeader>
}

export default Header;