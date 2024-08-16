import axiosInstance from './config';
import {Page} from "./common.ts";

// DayOfWeek enum
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type Platform = 'NAVER' | 'KAKAO' | 'OTHER';

interface WebtoonDto {
    id: number;
    title: string;
    thumbnailUrl: string;
    dayOfWeek: DayOfWeek;
    platform: Platform;
    link: string;
}

export type WebtoonPage = Page<WebtoonDto>;

export const getWebtoonsApi = async (
    page: number,
    size: number,
    title?: string,
    days?: string[],
    platforms?: string[]
) => {
    const response = await axiosInstance.get<WebtoonPage>('/api/webtoons', {
        params: {
            page,
            size,
            title,
            days: days?.join(','),
            platforms: platforms?.join(',')
        },
    });
    return response.data;
};

