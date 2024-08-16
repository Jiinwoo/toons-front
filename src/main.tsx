import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import appRoutes from "./AppRoutes.tsx";
import {ThemeProvider} from "@emotion/react";
import myTheme from "./styles/theme.ts";
import {ConfigProvider} from "antd";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {RecoilRoot} from "recoil";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <ConfigProvider theme={myTheme}>
                        <ThemeProvider theme={myTheme}>
                            {/*<Global styles={globalStyles}/>*/}
                            <RouterProvider router={appRoutes}/>
                        </ThemeProvider>
                    </ConfigProvider>
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
)
