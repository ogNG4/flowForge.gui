import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
    return (
        <Stack className="h-screen xy-center">
            <Outlet />
        </Stack>
    );
}

export default AuthLayout;
