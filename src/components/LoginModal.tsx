import React from 'react';
import {Button, Modal, Space} from 'antd';
import {useRecoilState} from 'recoil';

import {loginModalState} from "../state/loginState.ts";
import useAuth from "../hooks/useAuth.ts";
import {googleLoginApi, kakaoLoginApi} from "../apis/auth.ts";
import {GoogleLogin} from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 16px;
`;

const StyledSpace = styled(Space)`
    display: flex;
    width: 220px;
    text-align: center;

    iframe {
        margin: 0 !important;

        div#container {
            padding: 0 !important;
        }
    }
`

const KakaoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#000000"
              d="M9 1C4.59 1 1 3.72 1 7.09c0 2.15 1.21 4.01 3.01 5.08l-.75 2.79a.4.4 0 00.62.45l3.13-2.1c.62.1 1.27.15 1.93.15 4.41 0 8-2.72 8-6.09S13.41 1 9 1z"/>
    </svg>
);


const LoginModal: React.FC = () => {
    const [isOpen, setIsOpen] = useRecoilState(loginModalState);
    const {login} = useAuth();
    return (
        <Modal
            title="로그인"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
            styles={{body: {display: "flex", justifyContent: "center", alignItems: "center"}}}
        >
            <StyledSpace direction="vertical" size="large" style={{display: 'flex'}}>

                <GoogleLogin
                    logo_alignment={"center"}
                    shape={"rectangular"}
                    width={"100%"}
                    onSuccess={async credentialResponse => {
                        const {token} = await googleLoginApi(credentialResponse.credential!)
                        await login(token)
                        setIsOpen(false);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                >
                </GoogleLogin>
                <KakaoLogin
                    style={{
                        padding: '2px 10px'
                    }}

                    token={import.meta.env.VITE_KAKAO_JS_KEY}
                    onSuccess={async (res) => {
                        const idToken = (res.response as never as { ['id_token']: string }).id_token
                        const nickname = res.profile!.properties.nickname
                        const {token} = await kakaoLoginApi(idToken, nickname)
                        await login(token)
                        setIsOpen(false);
                    }}
                    onFail={console.error}
                    onLogout={console.info}
                    render={({onClick}) => {
                        return <StyledButton
                            style={{backgroundColor: '#FEE500', borderColor: '#FEE500'}}
                            icon={<KakaoIcon/>}
                            onClick={onClick}
                        >
                            <span style={{color: '#000000'}}>카카오로 로그인</span>
                        </StyledButton>
                    }}
                >
                    카카오로 로그인하기
                </KakaoLogin>
            </StyledSpace>
        </Modal>
    );
};

export default LoginModal;