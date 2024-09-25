import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

function BaseLayout() {
    return (
        <Stack className="h-screen">
            <Outlet />
        </Stack>
    );
}

export default BaseLayout;
