import { Avatar, AvatarProps } from '@mui/material';
import { memo } from 'react';
import { toUpper } from 'lodash';
import clsx from 'clsx';

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

    return (
        <Avatar
            {...props}
            sx={{
                bgcolor: hasName ? colors[colorIndex] : '#9e9e9e',
                ...props.sx,
            }}
            className={clsx(props.className, size === 'small' && 'w-[24px] h-[24px] text-xs')}
            children={hasName ? `${firstLetter}${lastLetter}` : undefined}
        />
    );
}

export default memo(UserAvatar);
