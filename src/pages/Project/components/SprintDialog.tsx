import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    Divider,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/Form/TextInput';
import LoadingButton from '@/components/Button/LoadingButton';
import { useCreateSprintMutation } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface SprintFormInput {
    name: string;
    startDate: string;
    endDate: string;
    goal: string;
}

interface SprintDialogProps {
    open: boolean;
    onClose: () => void;
    projectId: string;
    currentSprint?: {
        number: number;
        startDate: string;
        endDate: string;
        goal: string;
        moveToNext: string;
    };
}

function SprintDialog({ open, onClose, projectId, currentSprint }: SprintDialogProps) {
    const { mutate: createSprint, isPending } = useCreateSprintMutation();
    const client = useQueryClient();

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nazwa jest wymagana'),
        startDate: yup.string().required('Data rozpoczęcia jest wymagana'),
        endDate: yup.string().required('Data zakończenia jest wymagana'),
        goal: yup.string().required('Cel sprintu jest wymagany'),
    });

    const methods = useForm<SprintFormInput>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().add(2, 'week').format('YYYY-MM-DD'),
            moveToNext: true,
        },
    });

    const onSubmit = useCallback(
        (data: SprintFormInput) => {
            createSprint(
                {
                    ...data,
                    projectId,
                    isActive: true,
                },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.activeSprint, projectId] });
                        onClose();
                        methods.reset();
                    },
                }
            );
        },
        [projectId]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Stack spacing={3}>
                            {currentSprint && (
                                <>
                                    <Stack spacing={1}>
                                        <Typography variant="h6">Aktualny Sprint</Typography>
                                        <Typography>Sprint {currentSprint.number}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {currentSprint.startDate} - {currentSprint.endDate}
                                        </Typography>
                                        <Typography>{currentSprint.goal}</Typography>
                                    </Stack>
                                    <Divider />
                                </>
                            )}
                            <Typography variant="h6">Nowy Sprint</Typography>
                            {/* <TextInput<SprintFormInput> name="name" label="Nazwa" /> */}
                            <Stack direction="row" spacing={2}>
                                <DatePicker
                                    label="Data rozpoczęcia"
                                    onChange={(date) => methods.setValue('startDate', dayjs(date).format('YYYY-MM-DD'))}
                                    defaultValue={dayjs()}
                                />
                                <DatePicker
                                    label="Data zakończenia"
                                    onChange={(date) => methods.setValue('endDate', dayjs(date).format('YYYY-MM-DD'))}
                                    defaultValue={dayjs().add(2, 'week')}
                                />
                            </Stack>
                            <TextInput<SprintFormInput> name="goal" label="Cel sprintu" multiline rows={3} />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        onChange={(e) => methods.setValue('moveToNext', e.target.checked)}
                                    />
                                }
                                label="Przenieś niezakończone zadania do następnego sprintu"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Anuluj</Button>
                        <LoadingButton type="submit" isLoading={isPending}>
                            Utwórz sprint
                        </LoadingButton>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default SprintDialog;
