import { Divider, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
    id: string;
    name: string;
    tasks: any;
}

export default function Column({ id, name, tasks }: ColumnProps) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <Stack ref={setNodeRef} bgcolor={grey[200]} className="rounded-sm min-w-[350px] h-full">
            <Typography fontWeight={500} color={grey[700]} className="p-2">
                {name.toUpperCase()}
            </Typography>
            <Divider className="mb-1 " />
            <Stack className="gap-2 p-1">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} id={task.id} name={task.name} />
                ))}
            </Stack>
        </Stack>
    );
}
