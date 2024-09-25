import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { PropsWithChildren, memo } from 'react';

interface LoadingButtonProps {
    isLoading?: boolean;
}

function LoadingButton({ isLoading, children, ...props }: LoadingButtonProps & ButtonProps & PropsWithChildren<{}>) {
    return (
        <Button {...props} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : children}
        </Button>
    );
}

export default memo(LoadingButton);
