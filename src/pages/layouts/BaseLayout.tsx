import { Stack } from '@mui/material';
import Content from './components/Content';
import TopBar from './components/TopBar';
import { grey } from '@mui/material/colors';
import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';

function BaseLayout() {
    const location = useLocation();
    const showSidebar = location.pathname.startsWith('/projects/');

    return (
        <Stack direction="row" className="h-screen" sx={{ backgroundColor: grey[50] }}>
            <Stack flex={1}>
                <TopBar />
                <Stack direction="row" flex={1}>
                    {showSidebar && <Sidebar />}
                    <Content />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default BaseLayout;
