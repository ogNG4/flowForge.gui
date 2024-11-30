import { List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import clsx from 'clsx';
import { memo } from 'react';
import { useLocalStorage } from 'react-use';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useTranslation } from 'react-i18next';
import { Else, If, Then, When } from 'react-if';

function Sidebar() {
    const { t } = useTranslation();

    return (
        <Stack
            justifyContent="space-between"
            className={clsx(
                'overflow-y-auto overflow-x-hidden',
                'transition-width duration-300 ease-in-out',
                'w-[292px]'
            )}
            sx={{ borderRight: `1px solid ${grey[300]}` }}
        >
            <List></List>
        </Stack>
    );
}

export default memo(Sidebar);
