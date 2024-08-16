// 요일을 한글로 변환하는 함수
import {DayOfWeek, Platform} from "../apis/webtoons.ts";

export const getDayInKorean = (day: DayOfWeek): string => {
    const days: { [key in DayOfWeek]: string } = {
        MONDAY: '월', TUESDAY: '화', WEDNESDAY: '수', THURSDAY: '목',
        FRIDAY: '금', SATURDAY: '토', SUNDAY: '일'
    };
    return days[day];
};

export const getDayOfWeek = (day: string): DayOfWeek => {
    const days: { [key: string]: DayOfWeek } = {
        '월': 'MONDAY', '화': 'TUESDAY', '수': 'WEDNESDAY', '목': 'THURSDAY',
        '금': 'FRIDAY', '토': 'SATURDAY', '일': 'SUNDAY'
    };
    return days[day];
}

// 플랫폼에 따른 색상 지정
export const getPlatformColor = (platform: Platform): string => {
    const colors: { [key in Platform]: string } = {
        NAVER: 'green',
        KAKAO: 'yellow',
        OTHER: 'blue'
    };
    return colors[platform];
};