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

export interface MemberDto {
    id: number
    name: string
    provider: string
    verifiedEmail: string | null
    subscribe: boolean
}

export const getMeApi = async (token: string) => {
    return (await axiosInstance.get<MemberDto>("/api/members/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}

export const subscribeApi = async () => {
    const response = await axiosInstance.post("/api/members/subscribe")
    return response.data
}

export const unsubscribeApi = async () => {
    const response = await axiosInstance.post("/api/members/unsubscribe")
    return response.data
}

export const requestVerificationApi = async (email: string) => {
    return (await axiosInstance.post("/api/members/verify", {
        email
    })).data
}