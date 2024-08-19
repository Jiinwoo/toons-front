import {WebtoonDto} from "./webtoons.ts";
import axiosInstance from "./config.ts";

interface AlarmDto {
    id: number
    webtoon: WebtoonDto
}

export const getAlarmsApi = async () => {
    return (await axiosInstance.get<AlarmDto[]>('/api/alarms')).data;
}

export const createAlarmApi = async (webtoonId: number) => {
    return (await axiosInstance.post<AlarmDto>('/api/alarms', {webtoonId})).data;
}

export const deleteAlarmApi = async (id: number) => {
    return (await axiosInstance.delete<void>(`/api/alarms/${id}`)).data;
}