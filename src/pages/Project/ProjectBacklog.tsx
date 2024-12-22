import { useProjectBoardQuery, useBacklogTasksQuery } from '@/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '@/components/Table/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { Stack, Typography, Divider, Chip, Button } from '@mui/material';
import { useMemo } from 'react';
import SearchInput from '@/components/Form/SearchInput';
import { useSearchValue } from '@/hooks';
import { PriorityLabel } from '@/components/Kanban/PriorityLabel';
import UserAvatar from '@/components/Avatar/UserAvatar';

export default function ProjectBacklog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: backlogTasks, isLoading: isBacklogLoading } = useBacklogTasksQuery({ projectId: id as string });
    const { data: projectBoard, isLoading: isBoardLoading } = useProjectBoardQuery({ projectId: id as string });
    const { searchValue, setSearchValue } = useSearchValue();

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'code',
                headerName: 'Kod',
                width: 130,
                renderCell: (params) => <span style={{ fontWeight: 'bold' }}>{params.value}</span>,
            },
            { field: 'name', headerName: 'Nazwa', flex: 1 },
            {
                field: 'status',
                headerName: 'Status',
                width: 130,
                renderCell: (params) => {
                    if (!params.row.isBacklog) {
                        return <Chip label={params.value} size="small" color="primary" variant="outlined" />;
                    }
                    return null;
                },
            },
            {
                field: 'priority',
                headerName: 'Priorytet',
                width: 130,
                renderCell: (params) => <PriorityLabel priority={params.value} />,
            },
            {
                field: 'assignedUser',
                headerName: 'Przypisana osoba',
                width: 180,
                renderCell: (params) => {
                    return (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <UserAvatar firstName={params.value?.name} size="small" />
                            <span>{params.value?.name ? `${params.value.name}` : 'Nie przypisano'}</span>
                        </Stack>
                    );
                },
            },
        ],
        []
    );

    const backlogRows = useMemo(() => {
        if (!backlogTasks) return [];

        return backlogTasks
            .filter((task) => {
                const searchLower = searchValue.toLowerCase();
                return task.name.toLowerCase().includes(searchLower) || task.code.toLowerCase().includes(searchLower);
            })
            .map((task) => ({
                id: task.id,
                code: task.code,
                name: task.name,
                priority: task.priority,
                assignedUser: task.assignedUser,
            }));
    }, [backlogTasks, searchValue]);

    const boardRows = useMemo(() => {
        if (!projectBoard?.columns) return [];

        const allTasks = projectBoard.columns.flatMap((column) =>
            column.tasks.map((task) => ({
                ...task,
                columnName: column.name,
            }))
        );

        return allTasks
            .filter((task) => {
                const searchLower = searchValue.toLowerCase();
                return task.name.toLowerCase().includes(searchLower) || task.code.toLowerCase().includes(searchLower);
            })
            .map((task) => ({
                id: task.id,
                code: task.code,
                name: task.name,
                status: task.columnName,
                priority: task.priority,
                assignedUser: task.assignedUser,
            }));
    }, [projectBoard, searchValue]);

    const handleRowDoubleClick = (taskId: string) => {
        navigate(`/projects/${id}/task/${taskId}/0`);
    };

    const handleCreateTaskNavigate = () => {
        navigate(`/projects/${id}/task/0/1`, { state: { isBacklog: true } });
    };

    return (
        <Stack className="p-4 gap-4">
            <Stack direction="row" alignItems="center" spacing={1}>
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
                <Button variant="contained" color="primary" onClick={() => handleCreateTaskNavigate()}>
                    {' '}
                    Dodaj Zadanie
                </Button>
            </Stack>

            <Stack>
                <Typography variant="h6" className="mb-2">
                    Backlog
                </Typography>
                <DataTable
                    columns={columns}
                    rows={backlogRows}
                    loading={isBacklogLoading}
                    onRowDoubleClick={(params) => handleRowDoubleClick(params.row.id)}
                />
            </Stack>

            <Divider />

            <Stack>
                <Typography variant="h6" className="mb-2">
                    Zadania na tablicy
                </Typography>
                <DataTable
                    columns={columns}
                    rows={boardRows}
                    loading={isBoardLoading}
                    onRowDoubleClick={(params) => handleRowDoubleClick(params.row.id)}
                />
            </Stack>
        </Stack>
    );
}
