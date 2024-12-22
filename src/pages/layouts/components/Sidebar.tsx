import { List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import clsx from 'clsx';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useMenu from '@/hooks/useMenu';

function Sidebar() {
    const navigate = useNavigate();
    const { projectMenu, activeProjectMenu } = useMenu();

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
            <List>
                {projectMenu.map((item) => (
                    <ListItemButton
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        selected={activeProjectMenu?.path === item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                ))}
            </List>
        </Stack>
    );
}

export default memo(Sidebar);
