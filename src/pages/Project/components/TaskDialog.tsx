import TextEditor from '@/components/Editor/TextEditor';
import { Box, Button, Dialog, DialogContent, DialogProps, MenuItem, Paper, Stack } from '@mui/material';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetProjectColumnsQuery } from '@/hooks';
import TextInput from '@/components/Form/TextInput';
import SelectInput from '@/components/Form/SelectInput';
import Editor from '@/components/Editor/Editor';

interface TaskDialogProps extends DialogProps {
    isEdit?: boolean;
    projectId: string;
}

interface FormInput {
    name: string;
    priority: string;
    columnId: string;
    content: string;
}

function EditForm({ projectId }: { projectId: string }) {
    const { data: columns } = useGetProjectColumnsQuery({ projectId: projectId as string });

    const methods = useForm<FormInput>();

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
                        render={({ field }) => <Editor defaultValue={field.value} onTextChange={field.onChange} />}
                    />
                </Stack>
                <Button type="submit" variant="contained" className="w-[10px]">
                    {' '}
                    dupa
                </Button>
            </Stack>
            <Stack spacing={2} flex={1}>
                <SelectInput<FormInput> name="columnId" label="Status">
                    {sortedColumns.map((column) => (
                        <MenuItem key={column.id} value={column.id}>
                            {column.name}
                        </MenuItem>
                    ))}
                </SelectInput>
            </Stack>
        </Stack>
    );
}

function TaskDialog({ open, onClose, isEdit, projectId }: TaskDialogProps) {
    const [isEditMode, setIsEditMode] = useState(true);
    const { data: columns } = useGetProjectColumnsQuery({ projectId });

    const validationSchema = useMemo(() => {
        const schema = {
            name: yup
                .string()
                .required('Nazwa jest wymagana.')
                .min(3, 'Nazwa musi mieć co najmniej 3 znaki.')
                .max(50, 'Nazwa nie może mieć więcej niż 50 znaków.'),
            columnId: yup.string().required('Status jest wymagany'),
        };

        return yup.object().shape(schema);
    }, []);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema as yup.ObjectSchema<FormInput>),
        defaultValues: {
            columnId: columns?.[0]?.id || '',
            name: '',
            priority: '',
            content: '',
        },
    });
    const { handleSubmit, reset, setValue, getValues } = methods;

    const onSubmit = async (data: FormInput) => {
        try {
            // TODO: Dodaj tutaj wywołanie API do zapisywania zadania
            console.log('Submitted data:', data);
            // onClose?.({}, 'backdropClick'); // zamknij dialog po udanym zapisie
            // reset(); // zresetuj formularz
        } catch (error) {
            console.error('Error submitting task:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ height: '80vh' }}>
                        <EditForm projectId={projectId} />
                    </DialogContent>
                </form>
            </FormProvider>
        </Dialog>
    );
}

export default TaskDialog;
