import type {ThemeConfig} from 'antd';
import {green,} from '@ant-design/colors';

const keyColor = green.primary!;

export const generateTheme = (primaryColor: string): ThemeConfig => {
    return {
        // hashed: false,
        token: {
            colorPrimary: primaryColor,
        },
        components: {
            Layout: {
                colorPrimary: primaryColor,
            },
            Button: {
                colorPrimary: primaryColor,
            }
        }
    };
};


const myTheme = generateTheme(keyColor);


export default myTheme;