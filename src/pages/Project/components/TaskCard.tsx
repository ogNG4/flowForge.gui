import { Paper, Stack, Typography } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import { components } from '@/types/apiSchema';
import { grey } from '@mui/material/colors';
import { PriorityLabel } from '@/components/Kanban/PriorityLabel';
import { TaskPriority } from '@/constants/domain';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { useNavigate, useParams } from 'react-router-dom';

interface TaskCardProps {
    task: components['schemas']['BoardTaskDto'];
}

export default function TaskCard({ task }: TaskCardProps) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
    });

    const handleClick = (e: React.MouseEvent) => {
        if (isDragging) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        navigate(`/projects/${id}/task/${task.id}/0`);
    };

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              cursor: 'grab',
          }
        : {
              cursor: 'pointer',
          };

    return (
        <Paper
            variant="outlined"
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="p-2 rounded-sm h-fit w-full relative"
            onMouseUp={(e) => {
                if (!isDragging) {
                    handleClick(e as React.MouseEvent);
                }
            }}
        >
            <Stack className="gap-2">
                <Typography color={grey[700]}>{task.name}</Typography>
                <Stack direction="row" className="justify-between">
                    <Typography fontWeight={500} color={grey[700]}>
                        {task.code}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <PriorityLabel priority={task.priority as TaskPriority} showLabel={false} />
                        <UserAvatar firstName={task.assignedUser.name as string} size="small" />
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}
