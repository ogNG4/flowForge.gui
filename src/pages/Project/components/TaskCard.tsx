import { Stack, Typography } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
    id: string;
    name: string;
}

export default function TaskCard({ id, name }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <Stack
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            bgcolor={'white'}
            className="p-2 rounded-sm min-h-[100px] w-full cursor-grab"
        >
            <Typography>{name}</Typography>
            <Typography>{id}</Typography>
        </Stack>
    );
}
