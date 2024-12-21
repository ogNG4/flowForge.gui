import { Avatar, AvatarProps } from '@mui/material';
import { memo } from 'react';
import { toUpper } from 'lodash';

export interface UserAvatarProps extends AvatarProps {
    firstName?: string;
    lastName?: string;
    size?: 'small' | 'medium';
}

function UserAvatar({ firstName, lastName, size = 'medium', ...props }: UserAvatarProps) {
    const firstLetter = firstName ? toUpper(firstName[0]) : '';
    const lastLetter = lastName ? toUpper(lastName[0]) : '';
    const firstAscii = firstLetter.charCodeAt(0) || 0;
    const lastAscii = lastLetter.charCodeAt(0) || 0;

    const colors = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEEAD',
        '#D4A5A5',
        '#9B59B6',
        '#3498DB',
        '#E67E22',
        '#1ABC9C',
    ];

    const colorIndex = (firstAscii + lastAscii) % colors.length;
    const hasName = Boolean(firstLetter || lastLetter);

    const sizeStyles = size === 'small' ? { width: 24, height: 24, fontSize: '0.75rem' } : {};

    return (
        <Avatar
            {...props}
            sx={{
                bgcolor: hasName ? colors[colorIndex] : '#9e9e9e',
                ...sizeStyles,
                ...props.sx,
            }}
            children={hasName ? `${firstLetter}${lastLetter}` : undefined}
        />
    );
}

export default memo(UserAvatar);
