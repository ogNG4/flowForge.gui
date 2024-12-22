import { ReactElement, useMemo } from 'react';
import { compact, find } from 'lodash';
import CorporateFareOutlined from '@mui/icons-material/CorporateFareOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import BacklogIcon from '@mui/icons-material/FormatListBulleted';
import { useParams, useLocation } from 'react-router-dom';

interface Route {
    name: string;
    path: string;
    icon?: ReactElement;
}

function useMenu() {
    const { id } = useParams();
    const location = useLocation();

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

    const projectMenu: Route[] = useMemo(
        () =>
            compact([
                {
                    name: 'Tablica',
                    path: `/projects/${id}`,
                    icon: <AccountTreeOutlinedIcon />,
                },
                {
                    name: 'Backlog',
                    path: `/projects/${id}/backlog`,
                    icon: <BacklogIcon />,
                },
            ]),
        [id]
    );

    const activeTopMenu = useMemo(() => {
        return find(topMenu, (item) => location.pathname.startsWith(item.path));
    }, [location.pathname, topMenu]);

    const activeProjectMenu = useMemo(() => {
        return find(projectMenu, { path: location.pathname });
    }, [location.pathname, projectMenu]);

    return { topMenu, projectMenu, activeTopMenu, activeProjectMenu };
}

export default useMenu;
