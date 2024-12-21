import { Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { TaskPriority } from '@/constants/domain';

interface PriorityLabelProps {
    priority: TaskPriority;
    showLabel?: boolean;
}

const priorityConfig = {
    [TaskPriority.LOW]: {
        color: 'success.main',
        label: 'Niski',
    },
    [TaskPriority.MEDIUM]: {
        color: 'warning.main',
        label: 'Średni',
    },
    [TaskPriority.HIGH]: {
        color: 'error.main',
        label: 'Wysoki',
    },
};

export const PriorityLabel = ({ priority, showLabel = true }: PriorityLabelProps) => {
    const config = priorityConfig[priority];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircleIcon sx={{ color: config.color }} fontSize="small" />
            {showLabel && config.label}
        </Box>
    );
};
