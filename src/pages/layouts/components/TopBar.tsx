import { useMenu } from '@/hooks';
import { Stack, Tab } from '@mui/material';
import { grey } from '@mui/material/colors';
import { memo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

interface MenuItemProps {
    label: string;
    path: string;
    icon?: JSX.Element;
}

function MenuItem({ label, path, icon }: MenuItemProps) {
    const matched = useMatch(`${path}/*`);
    const isActive = matched !== null;
    const navigate = useNavigate();
    return (
        <Tab
            label={label}
            iconPosition="start"
            icon={icon}
            sx={{
                color: isActive ? 'primary.main' : 'inherit',
                '&:hover': {
                    color: 'primary.main',
                },
            }}
            onClick={() => navigate(path)}
        />
    );
}

function TopBar() {
    const { topMenu } = useMenu();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ borderBottom: `1px solid ${grey[300]}` }}
            className=" min-h-[45px]"
        >
            <Stack direction="row">
                {topMenu.map((item) => (
                    <MenuItem key={item.path} label={item.name} path={item.path} icon={item.icon} />
                ))}
            </Stack>
        </Stack>
    );
}

export default memo(TopBar);
