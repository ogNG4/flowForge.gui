import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    LinearProgress,
    MenuItem,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { FormProvider, useForm, Controller, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    useCreateTaskMutation,
    useGetProjectColumnsQuery,
    useModal,
    useOrganizationMembersQuery,
    useProjectDetailsQuery,
} from '@/hooks';
import TextInput from '@/components/Form/TextInput';
import SelectInput from '@/components/Form/SelectInput';
import Editor from '@/components/Editor/Editor';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { TaskPriority } from '@/constants/domain';
import { PriorityLabel } from '@/components/Kanban/PriorityLabel';
import useTaskDetailsQuery from '@/hooks/queries/useTaskDetailsQuery';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateTaskMutation from '@/hooks/mutations/useUpdateTaskMutation';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { Else, If, Then } from 'react-if';
import { isValidTimeFormat, minutesToTimeString, timeStringToMinutes } from '@/utils/common';
import TimeLogDialog from './TimeLogDialog';

interface FormInput {
    name: string;
    columnId: string;
    content: string;
    priority: TaskPriority;
    organizationId: string;
    assignedUserId: string;
    assignedUserName: string;
    code: string;
    estimatedTime: number;
    totalTimeSpent: number;
}

function EditForm() {
    const { id: projectId } = useParams();
    const { data: columns } = useGetProjectColumnsQuery({ projectId: projectId as string });
    const methods = useFormContext<FormInput>();
    const { getValues } = methods;
    const organizationId = getValues('organizationId');
    const { data: members } = useOrganizationMembersQuery({ organizationId: organizationId });

    const sortedColumns = useMemo(() => {
        return columns ? [...columns].sort((a, b) => a.order - b.order) : [];
    }, [columns]);

    return (
        <Stack direction="row" spacing={4}>
            <Stack spacing={2} flex={2}>
                <Box flex={3}>
                    <TextInput<FormInput> name="name" label="Nazwa" sx={{ width: '100%' }} />
                </Box>
                <Stack>
                    <Controller<FormInput>
                        name="content"
                        control={methods.control}
                        render={({ field }) => (
                            <Editor defaultValue={field.value || ''} onTextChange={field.onChange} />
                        )}
                    />
                </Stack>
            </Stack>
            <Stack spacing={2} flex={1}>
                <SelectInput<FormInput> name="columnId" label="Status">
                    {sortedColumns.map((column) => (
                        <MenuItem key={column.id} value={column.id}>
                            {column.name}
                        </MenuItem>
                    ))}
                </SelectInput>
                <SelectInput<FormInput> name="priority" label="Priorytet">
                    <MenuItem value={TaskPriority.LOW}>
                        <PriorityLabel priority={TaskPriority.LOW} />
                    </MenuItem>
                    <MenuItem value={TaskPriority.MEDIUM}>
                        <PriorityLabel priority={TaskPriority.MEDIUM} />
                    </MenuItem>
                    <MenuItem value={TaskPriority.HIGH}>
                        <PriorityLabel priority={TaskPriority.HIGH} />
                    </MenuItem>
                </SelectInput>
                <SelectInput<FormInput> name="assignedUserId" label="Przydzielony do" defaultValue="">
                    <MenuItem value="">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <UserAvatar size="small" />
                            <Typography>Brak</Typography>
                        </Stack>
                    </MenuItem>
                    {members?.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <UserAvatar firstName={member.firstName} size="small" />
                                <Typography>
                                    {member.firstName} {member.lastName}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </SelectInput>
                <TextInput<FormInput> name="estimatedTime" label="Czas estymowany" />
            </Stack>
        </Stack>
    );
}

function DisplayTask() {
    const methods = useFormContext<FormInput>();
    const { id: projectId, taskId } = useParams();
    const { data: columns } = useGetProjectColumnsQuery({ projectId: projectId as string });
    const { getValues } = methods;
    const taskColumn = columns?.find((column) => column.id === getValues('columnId'));
    const { handleOpen, open, handleClose } = useModal();

    return (
        <>
            <TimeLogDialog open={open} onClose={handleClose} taskId={taskId as string} />
            <Stack px={2}>
                <Typography>{getValues('code')}</Typography>
                <Typography variant="h5">{getValues('name')}</Typography>
            </Stack>
            <Stack direction="row" p={2} spacing={2} sx={{ height: '100%', minHeight: '40vh' }}>
                <Stack flex={5}>
                    <Paper sx={{ p: 2, height: '100%' }} elevation={0} variant="outlined">
                        <Stack spacing={2}>
                            <Typography
                                dangerouslySetInnerHTML={{ __html: getValues('content') }}
                                sx={{
                                    '& img': { maxWidth: '100%', height: 'auto' },
                                    '& a': { color: 'primary.main' },
                                    '& ul, & ol': { paddingLeft: 4 },
                                    '& ul': { listStyleType: 'disc' },
                                    '& ol': { listStyleType: 'decimal' },
                                }}
                            />
                        </Stack>
                    </Paper>
                </Stack>
                <Stack flex={2}>
                    <Paper sx={{ p: 2, height: '100%' }} elevation={0} variant="outlined">
                        <Stack spacing={2}>
                            <Stack>
                                <Typography fontWeight={500} variant="caption">
                                    Przydzielony do
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <UserAvatar firstName={getValues('assignedUserName')} size="small" />
                                    {getValues('assignedUserName') ? (
                                        <Typography>{getValues('assignedUserName')}</Typography>
                                    ) : (
                                        <Typography>Nie przypisano</Typography>
                                    )}
                                </Stack>
                            </Stack>

                            <Stack>
                                <Typography variant="caption" fontWeight={500}>
                                    Priorytet
                                </Typography>
                                <PriorityLabel priority={getValues('priority')} />
                            </Stack>

                            <Stack>
                                <Typography variant="caption" fontWeight={500}>
                                    Status
                                </Typography>
                                <Chip label={taskColumn?.name || ''} color="primary" sx={{ width: 'max-content' }} />
                            </Stack>
                            <Stack>
                                <Typography variant="caption" fontWeight={500}>
                                    Czas pracy
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={Math.min(
                                        (getValues('totalTimeSpent') / getValues('estimatedTime')) * 100,
                                        100
                                    )}
                                    sx={{ height: 10, borderRadius: 10 }}
                                />
                                <Typography variant="caption">
                                    {minutesToTimeString(getValues('totalTimeSpent'))} /{' '}
                                    {minutesToTimeString(getValues('estimatedTime'))}
                                </Typography>
                            </Stack>
                            <Button variant="outlined" onClick={handleOpen}>
                                Zaloguj czas
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>
        </>
    );
}

function TaskDialog() {
    const navigate = useNavigate();
    const { taskId, id: projectId, edit } = useParams();
    const isNew = taskId === '0';
    const isEditMode = edit === '1';
    const { data: columns } = useGetProjectColumnsQuery({ projectId: projectId as string });
    const { data: task } = useTaskDetailsQuery({ taskId: taskId as string }, { enabled: !isNew });
    const { data: projectDetails } = useProjectDetailsQuery({ projectId: projectId as string });
    const { mutate: createTask } = useCreateTaskMutation();
    const { mutate: updateTask } = useUpdateTaskMutation();
    const client = useQueryClient();
    const validationSchema = useMemo(() => {
        const schema = {
            name: yup
                .string()
                .required('Nazwa jest wymagana.')
                .min(3, 'Nazwa musi mieć co najmniej 3 znaki.')
                .max(50, 'Nazwa nie może mieć więcej niż 50 znaków.'),
            columnId: yup.string().required('Status jest wymagany'),
            estimatedTime: yup.string().test('format', 'Nieprawidłowy format czasu (np. 2h 30m)', (value) => {
                if (!value) return true;
                return isValidTimeFormat(value);
            }),
        };

        return yup.object().shape(schema);
    }, []);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema as yup.ObjectSchema<FormInput>),
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
        reset({
            priority: (task?.priority as TaskPriority) || TaskPriority.MEDIUM,
            columnId: task?.columnId || columns?.[0]?.id || '',
            name: task?.name || '',
            content: task?.content || '',
            organizationId: projectDetails?.organizationId || task?.organizationId || '',
            assignedUserId: task?.assignedUser?.id || '',
            assignedUserName: (task?.assignedUser?.name as string) || '',
            code: task?.code || '',
            estimatedTime: task?.estimatedTime || 0,
            totalTimeSpent: task?.totalTimeSpent,
        });
    }, [task, columns]);

    const onSubmit = useCallback(
        async (data: FormInput) => {
            const commonData = {
                columnId: data.columnId,
                name: data.name,
                content: data.content,
                priority: data.priority,
                assignedUserId: data.assignedUserId,
                estimatedTime: timeStringToMinutes(String(data.estimatedTime)),
            };

            if (isNew) {
                createTask(
                    { ...commonData, projectId: projectId || '' },
                    {
                        onSuccess: () => {
                            navigate(`/projects/${projectId}`);
                            client.invalidateQueries({ queryKey: [queryKeys.projectBoard, projectId] });
                        },
                    }
                );
            } else {
                updateTask(
                    { ...commonData, taskId: taskId as string },
                    {
                        onSuccess: () => {
                            navigate(`/projects/${projectId}/task/${taskId}/0`);
                            client.invalidateQueries({ queryKey: [queryKeys.taskDetails, taskId] });
                            client.invalidateQueries({ queryKey: [queryKeys.projectBoard, projectId] });
                        },
                    }
                );
            }
        },
        [isNew, isEditMode, taskId, projectId]
    );

    return (
        <>
            <Dialog open onClose={() => navigate(-1)} fullWidth maxWidth="md">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent sx={{ minHeight: '40vh' }}>
                            {isEditMode ? <EditForm /> : <DisplayTask />}
                        </DialogContent>
                        <DialogActions sx={{ py: 2, px: 5 }}>
                            <Box sx={{ width: '100%' }}>
                                <If condition={isEditMode}>
                                    <Then>
                                        <Button type="submit" variant="contained">
                                            Zapisz
                                        </Button>
                                    </Then>
                                    <Else>
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate(`/projects/${projectId}/task/${taskId}/1`)}
                                        >
                                            Edytuj
                                        </Button>
                                    </Else>
                                </If>
                                <Button type="submit" variant="text" onClick={() => navigate(-1)}>
                                    Anuluj
                                </Button>
                            </Box>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
}

export default TaskDialog;
