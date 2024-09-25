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
    const [collapsed, setCollapsed] = useLocalStorage<boolean>('isSideBarCollapsed', false, {
        raw: false,
        deserializer: (value) => value === 'true',
        serializer: (value) => `${value}`,
    });

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Stack
            justifyContent="space-between"
            className={clsx('overflow-y-auto overflow-x-hidden', 'transition-width duration-300 ease-in-out', {
                'w-[292px]': !collapsed,
                'w-[74px]': collapsed,
            })}
            sx={{ borderRight: `1px solid ${grey[300]}` }}
        >
            <List>
                <ListItemButton
                    className={clsx('h-[58px]', collapsed ? 'p-0' : '[&_.MuiListItemIcon-root]:min-w-[35px]')}
                    onClick={toggleCollapsed}
                >
                    <ListItemIcon className={clsx(collapsed && 'w-full x-center')}>
                        <If condition={collapsed}>
                            <Then>
                                <MenuIcon />
                            </Then>
                            <Else>
                                <MenuOpenIcon />
                            </Else>
                        </If>
                    </ListItemIcon>
                    <When condition={!collapsed}>
                        <ListItemText
                            primary={t('Hide Menu')}
                            primaryTypographyProps={{
                                className: 'font-fontWeightMedium',
                                color: 'textSecondary',
                            }}
                        />
                    </When>
                </ListItemButton>
            </List>
        </Stack>
    );
}

export default memo(Sidebar);
