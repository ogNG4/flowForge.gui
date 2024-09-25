import auth from '@/utils/auth';
import React from 'react';
import { RouteObject, createBrowserRouter, redirect } from 'react-router-dom';

async function loginLoader() {
    const token = auth.getDecodedToken();
    if (token) return redirect('/');
    return null;
}

async function protectedLoader() {
    const token = auth.getDecodedToken();
    if (!token) return redirect('/auth/login');
    return token;
}

export const BaseLayout = React.lazy(() => import('@/pages/layouts/BaseLayout'));
export const AuthLayout = React.lazy(() => import('@/pages/layouts/AuthLayout'));

export const LoginPage = React.lazy(() => import('@/pages/(Auth)/Login/Page'));
export const CreateAccountPage = React.lazy(() => import('@/pages/(Auth)/CreateAccount/Page'));

export const HomePage = React.lazy(() => import('@/pages/Page'));

const routeProps = {
    loader: protectedLoader,
};

const authRouteProps = {
    loader: loginLoader,
};
export const routeList: RouteObject[] = [
    {
        id: 'root',
        path: '/',
        element: <BaseLayout />,
        children: [{ ...routeProps, path: '/', element: <HomePage /> }],
    },
    {
        id: 'auth',
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { ...authRouteProps, path: 'login', element: <LoginPage /> },
            { ...authRouteProps, path: 'create-account', element: <CreateAccountPage /> },
        ],
    },
];
export const router = createBrowserRouter(routeList);
