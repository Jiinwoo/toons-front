import {atom, useRecoilState} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {useCallback} from "react";
import {getMeApi} from "../apis/auth.ts";
import {message} from "antd";
import {queryClient} from "../main.tsx";

const authState = atom<{
    token: string | null;
}>({
    key: 'authState',
    default: {
        token: localStorage.getItem('token'),
    },
    effects: [
        ({onSet}) => {
            onSet((newValue) => {
                if (newValue.token) {
                    localStorage.setItem('token', newValue.token);
                } else {
                    localStorage.removeItem('token');
                }
            });
        },
    ],
});

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const logout = useCallback(async () => {
        localStorage.removeItem('token');
        setAuth({token: null});
        // queryClient.invalidateQueries()
        queryClient.setQueryData(['user'], () => null,);
        queryClient.removeQueries({queryKey: ['user']});
    }, [setAuth]);

    const {data: user, isLoading, error} = useQuery({
        queryKey: ['user'],
        queryFn: () => getMeApi(auth.token!),
        enabled: !!auth.token,
        retry: false,
        throwOnError: () => {
            message.error('로그인이 필요합니다.');
            logout()
            return false
        }
    });

    const login = useCallback(async (token: string) => {
        setAuth({token});
        localStorage.setItem('token', token);
        await queryClient.invalidateQueries({queryKey: ['user']});
        message.success('로그인에 성공했습니다.');

    }, [setAuth])

    return {
        user,
        isLoading,
        error,
        token: auth.token,
        isAuthenticated: !!auth.token && !!user,
        login,
        logout,
    };
};

export default useAuth