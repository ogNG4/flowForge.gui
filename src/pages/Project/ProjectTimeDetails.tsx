import { Stack, Typography, Paper, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useProjectTimeDetailsQuery } from '@/hooks';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { minutesToTimeString } from '@/utils/common';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { grey } from '@mui/material/colors';

function ProjectTimeDetails() {
    const { id } = useParams();
    const { data: timeDetails, isLoading } = useProjectTimeDetailsQuery({ projectId: id as string });

    const userChartData = timeDetails?.userStats.map((stat) => ({
        name: stat.user.name,
        czas: stat.totalTimeSpent,
        czasFormatted: minutesToTimeString(stat.totalTimeSpent),
    }));

    const taskChartData = timeDetails?.taskStats.map((stat) => ({
        name: stat.taskCode,
        czas: stat.totalTimeSpent,
        czasFormatted: minutesToTimeString(stat.totalTimeSpent),
    }));

    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <Stack spacing={3} className="p-4">
            <Typography variant="h5">Szczegóły czasu pracy</Typography>

            {/* Karty podsumowujące */}
            <Stack direction="row" spacing={2}>
                <Paper className="p-4 flex-1">
                    <Typography variant="subtitle1" color="text.secondary">
                        Całkowity czas projektu
                    </Typography>
                    <Typography variant="h4">{minutesToTimeString(timeDetails?.totalTimeSpent || 0)}</Typography>
                </Paper>
            </Stack>

            {/* Karty użytkowników */}
            <Typography variant="h6" className="mt-4">
                Czas według użytkowników
            </Typography>
            <Stack direction="row" spacing={2} className="overflow-x-auto">
                {timeDetails?.userStats.map((userStat) => (
                    <Card key={userStat.user.id} sx={{ minWidth: 250 }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <UserAvatar firstName={userStat.user.name} size="medium" />
                                <Stack>
                                    <Typography variant="h6">{userStat.user.name}</Typography>
                                    <Typography color="text.secondary">
                                        {minutesToTimeString(userStat.totalTimeSpent)}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack className="mt-2">
                                {userStat.taskTimes.map((task) => (
                                    <Stack
                                        key={task.taskId}
                                        direction="row"
                                        justifyContent="space-between"
                                        className="text-sm"
                                    >
                                        <Typography variant="caption" color={grey[600]}>
                                            {task.taskCode}
                                        </Typography>
                                        <Typography variant="caption" fontWeight={500}>
                                            {minutesToTimeString(task.timeSpent)}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            {/* Wykresy */}
            <Stack direction="row" spacing={2} className="mt-4">
                <Paper className="p-4 flex-1">
                    <Typography variant="h6" className="mb-4">
                        Czas według użytkowników
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userChartData}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => minutesToTimeString(value)} />
                            <Tooltip
                                formatter={(value: number, name: string, props: any) => [
                                    props.payload.czasFormatted,
                                    'Czas pracy',
                                ]}
                                labelStyle={{ color: grey[900] }}
                            />
                            <Bar dataKey="czas" fill="#1976d2" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper className="p-4 flex-1">
                    <Typography variant="h6" className="mb-4">
                        Czas według zadań
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskChartData}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => minutesToTimeString(value)} />
                            <Tooltip
                                formatter={(value: number, name: string, props: any) => [
                                    props.payload.czasFormatted,
                                    'Czas pracy',
                                ]}
                                labelStyle={{ color: grey[900] }}
                            />
                            <Bar dataKey="czas" fill="#2e7d32" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Stack>
        </Stack>
    );
}

export default ProjectTimeDetails;
