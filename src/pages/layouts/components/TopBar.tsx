import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { memo } from 'react';

function TopBar() {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: `1px solid ${grey[300]}` }}
            className="px-3  min-h-[56px]"
        ></Stack>
    );
}

export default memo(TopBar);
