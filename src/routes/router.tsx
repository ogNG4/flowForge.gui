import auth from '@/utils/auth';
import React from 'react';
import { RouteObject, createBrowserRouter, redirect } from 'react-router-dom';

async function loginLoader() {
    const token = auth.getDecodedToken();
    if (token && !auth.isTokenExpired()) return redirect('/');
    return null;
}

async function protectedLoader() {
    const token = auth.getDecodedToken();
    const isExpired = auth.isTokenExpired();
    if (!token || isExpired) return redirect('/auth/login');
    return token;
}

export const BaseLayout = React.lazy(() => import('@/pages/layouts/BaseLayout'));
export const AuthLayout = React.lazy(() => import('@/pages/layouts/AuthLayout'));

export const LoginPage = React.lazy(() => import('@/pages/(Auth)/Login/Page'));
export const CreateAccountPage = React.lazy(() => import('@/pages/(Auth)/CreateAccount/Page'));

export const OrganizationsPage = React.lazy(() => import('@/pages/Organizations/Organizations'));
export const OrganizationDetailsPage = React.lazy(() => import('@/pages/Organizations/OrganizationDetails'));
export const ProjectsPage = React.lazy(() => import('@/pages/Project/Projects'));
export const ProjectDetailsPage = React.lazy(() => import('@/pages/Project/ProjectDetails'));
export const DetailTaskDialog = React.lazy(() => import('@/pages/Project/components/TaskDialog'));
export const ProjectBacklogPage = React.lazy(() => import('@/pages/Project/ProjectBacklog'));

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
        children: [
            { ...routeProps, path: '/', element: <OrganizationsPage /> },
            { ...routeProps, path: 'organizations/:id', element: <OrganizationDetailsPage /> },
            { ...routeProps, path: 'projects', element: <ProjectsPage /> },
            {
                ...routeProps,
                path: 'projects/:id',
                element: <ProjectDetailsPage />,
                children: [
                    { ...routeProps, path: 'task/:taskId/:edit', element: <DetailTaskDialog /> },
                    { ...routeProps, path: 'backlog', element: <ProjectBacklogPage /> },
                ],
            },
            // { ...routeProps, path: 'projects/:projectId/task/:taskId', element: <DetailTaskDialog /> },
        ],
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
