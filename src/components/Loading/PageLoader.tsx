import { Box, CircularProgress } from '@mui/material';
import { memo } from 'react';

interface PageLoaderProps {
    size?: number;
}

function PageLoader({ size = 40 }: PageLoaderProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                minHeight: '200px',
            }}
        >
            <CircularProgress size={size} />
        </Box>
    );
}

export default memo(PageLoader);
