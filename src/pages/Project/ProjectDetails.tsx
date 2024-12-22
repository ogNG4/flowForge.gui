import { Button, Stack, Select, MenuItem, Typography } from '@mui/material';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import Column from './components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useMemo } from 'react';
import {
    useOrganizationMembersQuery,
    useProjectBoardQuery,
    useSearchValue,
    useUpdateTaskColumnMutation,
} from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import SearchInput from '@/components/Form/SearchInput';
import UserAvatar from '@/components/Avatar/UserAvatar';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { data: projectBoard } = useProjectBoardQuery({ projectId: id as string });
    const client = useQueryClient();
    const columns = projectBoard?.columns.sort((a, b) => a.order - b.order);
    const { mutate: updateTaskColumn } = useUpdateTaskColumnMutation();
    const { searchValue: tasksSearchValue, setSearchValue: setTasksSearchValue } = useSearchValue();
    const { searchValue: assigneeSearchValue, setSearchValue: setAssigneeSearchValue } = useSearchValue('');
    const { data: organizationMembers } = useOrganizationMembersQuery(
        {
            organizationId: projectBoard?.organizationId as string,
        },
        {
            enabled: !!projectBoard?.organizationId,
        }
    );

    const filteredColumns = useMemo(() => {
        if (!columns) return [];

        return columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => {
                const searchLower = tasksSearchValue.toLowerCase();
                const nameMatch =
                    task.name.toLowerCase().includes(searchLower) || task.code.toLowerCase().includes(searchLower);

                if (!nameMatch) return false;

                if (!assigneeSearchValue) return true;

                if (assigneeSearchValue === 'unassigned') {
                    return task.assignedUser.id === '';
                }

                return task.assignedUser?.id === assigneeSearchValue;
            }),
        }));
    }, [columns, tasksSearchValue, assigneeSearchValue]);

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

    const showBoard = location.pathname.split('/').length <= 3;

    return (
        <>
            <Outlet />
            {showBoard && (
                <Stack className="gap-2 h-screen">
                    <Stack direction="row" className="gap-2">
                        <SearchInput searchValue={tasksSearchValue} setSearchValue={setTasksSearchValue} />
                        <Select
                            size="small"
                            value={assigneeSearchValue}
                            onChange={(e) => setAssigneeSearchValue(e.target.value)}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="">Wszyscy</MenuItem>
                            <MenuItem value="unassigned">
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <UserAvatar size="small" />
                                    <Typography>Nie przypisano</Typography>
                                </Stack>
                            </MenuItem>
                            {organizationMembers?.map((member) => (
                                <MenuItem key={member.id} value={member.id}>
                                    <Stack direction="row" alignItems="center" gap={1}>
                                        <UserAvatar firstName={member.firstName} size="small" />
                                        <Typography>
                                            {member.firstName} {member.lastName}
                                        </Typography>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Select>
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
            )}
        </>
    );
}
