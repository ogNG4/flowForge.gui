import { Stack } from '@mui/material';
import Content from './components/Content';
import TopBar from './components/TopBar';
import { grey } from '@mui/material/colors';
import Sidebar from './components/Sidebar';

function BaseLayout() {
    return (
        <Stack direction="row" className="h-screen" sx={{ backgroundColor: grey[50] }}>
            {/* <Sidebar /> */}
            <Stack flex={1}>
                <TopBar />
                <Content />
            </Stack>
        </Stack>
    );
}

export default BaseLayout;
