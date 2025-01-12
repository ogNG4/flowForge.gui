import { Divider, Stack, Typography, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import TaskCard from './TaskCard';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface ColumnProps {
    id: string;
    name: string;
    tasks: any;
}

export default function Column({ id, name, tasks }: ColumnProps) {
    const { setNodeRef: setDroppableRef } = useDroppable({
        id: id,
    });

    const {
        attributes,
        listeners,
        setNodeRef: setDraggableRef,
        transform,
    } = useDraggable({
        id: `column-${id}`,
        data: {
            type: 'column',
            id: id,
        },
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 1,
          }
        : undefined;

    return (
        <Stack
            ref={(node) => {
                setDroppableRef(node);
                setDraggableRef(node);
            }}
            bgcolor={grey[100]}
            className="rounded-md min-w-[350px] h-full border border-gray-200"
            borderColor={grey[300]}
            style={style}
            {...attributes}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" className="p-2">
                <Typography fontWeight={500} color={grey[700]}>
                    {name.toUpperCase()}
                </Typography>
                <IconButton size="small" {...listeners}>
                    <DragIndicatorIcon />
                </IconButton>
            </Stack>
            <Divider className="mb-1" />
            <Stack className="gap-2 p-1">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </Stack>
        </Stack>
    );
}
