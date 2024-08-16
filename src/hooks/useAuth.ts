import {atom, useRecoilState} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {useCallback, useEffect} from "react";
import {getMeApi} from "../apis/auth.ts";
import {message} from "antd";
import {queryClient} from "../main.tsx";
import axiosInstance from "../apis/config.ts";

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
        setAuth({token: null});
        queryClient.setQueryData(['user'], () => null,);
        queryClient.removeQueries({queryKey: ['user']});
    }, [setAuth]);

    const {data: user, isLoading, error} = useQuery({
        queryKey: ['user'],
        queryFn: () => getMeApi(auth.token!),
        enabled: !!auth.token,
        retry: false,
    });

    const login = useCallback(async (token: string) => {
        setAuth({token});
        await queryClient.invalidateQueries({queryKey: ['user']});
        message.success('로그인에 성공했습니다.');

    }, [setAuth])

    useEffect(() => {
        axiosInstance.interceptors.request.use(
            (config) => {
                if (auth.token !== null) {
                    config.headers['Authorization'] = `Bearer ${auth.token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    }, [auth.token]);


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