import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Outlet, useLocation } from 'react-router-dom';

function Content() {
    const location = useLocation();
    const scrollbarsRef = useRef<Scrollbars>(null);

    useEffect(() => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollTop(0);
        }
    }, [location.pathname]);

    return (
        <Scrollbars ref={scrollbarsRef}>
            <Box component="main" className="p-3 relative">
                <Outlet />
            </Box>
        </Scrollbars>
    );
}

export default Content;
