import {WebtoonDto} from "./webtoons.ts";
import axiosInstance from "./config.ts";

interface HomeDto {
    hotPosts: {
        id: number
        title: string
    }[],
    completedWebtoons: WebtoonDto[],
    topAlarmWebtoons: WebtoonDto[],
}

export const queryHomeApi = async () => {
    const response = await axiosInstance.get<HomeDto>('/api/home');
    return response.data;
}