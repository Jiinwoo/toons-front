import axiosInstance from "./config.ts";

export const kakaoLoginApi = async (idToken: string, nickname: string) => {
    return (await axiosInstance.post<{ token: string }>("/api/auth/kakao", {
        idToken: idToken,
        nickname: nickname
    })).data
}

export const googleLoginApi = async (idToken: string) => {
    return (await axiosInstance.post<{ token: string }>("/api/auth/google", {
        idToken: idToken
    })).data
}

export const getMeApi = async (token: string) => {
    return (await axiosInstance.get<{ name: string, id: number, provider: string }>("/api/members/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}

export const requestVerificationApi = async (method: 'phone' | 'email') => {
    return (await axiosInstance.post("/api/members/verification", {
        method: method
    })).data
}