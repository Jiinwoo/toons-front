import '@emotion/react';
import {ThemeConfig} from 'antd/es/config-provider/context';

declare module '@emotion/react' {
    export interface Theme extends ThemeConfig {
        // 필요한 경우 여기에 추가 속성을 정의할 수 있습니다.
    }
}