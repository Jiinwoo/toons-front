import {createBrowserRouter, Navigate, Outlet, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth.ts";
import WebtoonListPage from "./pages/WebtoonListPage.tsx";
import BoardList from "./pages/BoardList.tsx";


const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return <Outlet/>;
}


const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/boards",
                element: <BoardList/>
            },
            {
                path: "/webtoons",
                element: <WebtoonListPage/>
            },
            {
                path: "/profile",
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: "/profile",
                        element: <div>Profile</div>
                    }
                ]
            }

        ]
    }
])


export default appRoutes
