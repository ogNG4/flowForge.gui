import { Box, Button, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Column from './components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useMemo, useState } from 'react';
import { useModal, useProjectBoardQuery, useSearchValue, useUpdateTaskColumnMutation } from '@/hooks';
import TaskDialog from './components/TaskDialog';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import SearchInput from '@/components/Form/SearchInput';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: projectBoard } = useProjectBoardQuery({ projectId: id as string });
    const client = useQueryClient();
    const columns = projectBoard?.columns.sort((a, b) => a.order - b.order);
    const { mutate: updateTaskColumn } = useUpdateTaskColumnMutation();
    const { searchValue: tasksSearchValue, setSearchValue: setTasksSearchValue } = useSearchValue();

    const filteredColumns = useMemo(() => {
        if (!columns) return [];

        return columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => {
                const searchLower = tasksSearchValue.toLowerCase();
                return task.name.toLowerCase().includes(searchLower) || task.code.toLowerCase().includes(searchLower);
            }),
        }));
    }, [columns, tasksSearchValue]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const overColumn = columns?.find((column) => column.id === over.id);
            const overTasks = overColumn?.tasks || [];
            const activeIndex = overTasks.findIndex((task) => task.id === active.id);
            const aboveTaskId = activeIndex === 0 ? null : overTasks[activeIndex - 1]?.id;

            updateTaskColumn(
                {
                    taskId: active.id as string,
                    columnId: over.id as string,
                    aboveTaskId: aboveTaskId || (null as any),
                },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.projectBoard, id] });
                    },
                }
            );
        }
    };

    return (
        <>
            <Outlet />
            <Stack className="gap-2 h-screen">
                <Stack direction="row" className="gap-2">
                    <SearchInput searchValue={tasksSearchValue} setSearchValue={setTasksSearchValue} />
                    <Button onClick={() => navigate(`/projects/${id}/task/0/1`)} variant="contained">
                        Dodaj zadanie
                    </Button>
                </Stack>
                <DndContext onDragEnd={handleDragEnd}>
                    <Stack direction="row" className="gap-3 flex-1">
                        {filteredColumns?.map((column) => (
                            <Column key={column.id} id={column.id} name={column.name} tasks={column.tasks} />
                        ))}
                    </Stack>
                </DndContext>
            </Stack>
        </>
    );
}
