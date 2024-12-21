import { Dialog, DialogContent, DialogActions, Button, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useAddTimeLogMutation } from '@/hooks';
import TextInput from '@/components/Form/TextInput';
import LoadingButton from '@/components/Button/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { useCallback } from 'react';
import { isValidTimeFormat, timeStringToMinutes } from '@/utils/common';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface TimeLogFormInput {
    timeSpent: string;
    description?: string;
}

interface TimeLogDialogProps {
    open: boolean;
    onClose: () => void;
    taskId: string;
}

function TimeLogDialog({ open, onClose, taskId }: TimeLogDialogProps) {
    const { mutate: addTimeLog, isPending } = useAddTimeLogMutation();
    const client = useQueryClient();

    const validationSchema = yup.object().shape({
        timeSpent: yup
            .string()
            .required('Czas jest wymagany')
            .test('format', 'Nieprawidłowy format czasu (np. 2h 30m)', (value) => {
                if (!value) return true;
                return isValidTimeFormat(value);
            }),
        description: yup.string(),
    });

    const methods = useForm<TimeLogFormInput>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = useCallback(
        (data: TimeLogFormInput) => {
            addTimeLog(
                {
                    taskId,
                    timeSpent: timeStringToMinutes(data.timeSpent),
                    description: data.description,
                },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.taskDetails, taskId] });
                        onClose();
                        methods.reset();
                    },
                }
            );
        },
        [taskId]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Stack spacing={2}>
                            <TextInput<TimeLogFormInput>
                                name="timeSpent"
                                label="Spędzony czas"
                                helperText="Format: 2h 30m"
                            />

                            <TextInput<TimeLogFormInput> name="description" label="Opis" multiline rows={3} />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Anuluj</Button>
                        <LoadingButton type="submit" variant="contained" isLoading={isPending}>
                            Zapisz
                        </LoadingButton>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default TimeLogDialog;
