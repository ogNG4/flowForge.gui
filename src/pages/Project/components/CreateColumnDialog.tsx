import { Dialog, DialogContent, DialogActions, Button, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/Form/TextInput';
import LoadingButton from '@/components/Button/LoadingButton';
import { useCreateColumnMutation } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ColumnFormInput {
    name: string;
}

interface CreateColumnDialogProps {
    open: boolean;
    onClose: () => void;
    projectId: string;
}

function CreateColumnDialog({ open, onClose, projectId }: CreateColumnDialogProps) {
    const { mutate: createColumn, isPending } = useCreateColumnMutation();
    const client = useQueryClient();

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nazwa jest wymagana'),
    });

    const methods = useForm<ColumnFormInput>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = useCallback(
        (data: ColumnFormInput) => {
            createColumn(
                {
                    ...data,
                    projectId,
                },
                {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: [queryKeys.projectBoard, projectId] });
                        onClose();
                        methods.reset();
                    },
                }
            );
        },
        [projectId]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Stack spacing={2}>
                            <TextInput<ColumnFormInput> name="name" label="Nazwa kolumny" />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Anuluj</Button>
                        <LoadingButton type="submit" variant="contained" isLoading={isPending}>
                            Utwórz
                        </LoadingButton>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default CreateColumnDialog;
