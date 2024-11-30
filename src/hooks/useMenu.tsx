import { ReactElement, useMemo } from 'react';
import { compact, find } from 'lodash';
import CorporateFareOutlined from '@mui/icons-material/CorporateFareOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

interface Route {
    name: string;
    path: string;
    icon?: ReactElement;
}

function useMenu() {
    const topMenu: Route[] = useMemo(
        () =>
            compact([
                {
                    name: 'Organizacje',
                    path: '/',
                    icon: <CorporateFareOutlined />,
                },
                {
                    name: 'Projekty',
                    path: '/projects',
                    icon: <AccountTreeOutlinedIcon />,
                },
            ]),
        []
    );

    const activeTopMenu = useMemo(() => {
        return find(topMenu, { path: window.location.pathname });
    }, []);

    return { topMenu, activeTopMenu };
}

export default useMenu;
