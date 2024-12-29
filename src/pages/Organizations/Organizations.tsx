import { useCreateOrganizationMutation, useModal, useSearchValue, useToast, useUserOrganizationsQuery } from '@/hooks';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/Form/TextInput';
import LoadingButton from '@/components/Button/LoadingButton';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '@/components/Table/DataTable';
import { formatDate } from '@/utils/common';
import UserAvatar from '@/components/Avatar/UserAvatar';
import SearchInput from '@/components/Form/SearchInput';
import { useNavigate } from 'react-router-dom';

interface FormInput {
    name: string;
    description: string;
}

function Organizations() {
    const { open, handleOpen, handleClose } = useModal();
    const { mutate, isPending } = useCreateOrganizationMutation();
    const { data, isLoading } = useUserOrganizationsQuery();
    const { searchValue, setSearchValue } = useSearchValue();
    const { showError, showSuccess } = useToast();
    const navigate = useNavigate();
    const validationSchema = useMemo(() => {
        const schema = {
            name: yup
                .string()
                .required('Nazwa jest wymagana.')
                .min(3, 'Nazwa musi mieć co najmniej 3 znaki.')
                .max(50, 'Nazwa nie może mieć więcej niż 50 znaków.'),
            description: yup.string().max(255, 'Opis nie może mieć więcej niż 255 znaków.'),
        };

        return yup.object().shape(schema);
    }, []);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema as yup.ObjectSchema<FormInput>),
    });
    const { handleSubmit, reset } = methods;

    const onSubmit = useCallback(
        ({ name, description }: FormInput) => {
            mutate(
                { name },
                {
                    onSuccess: () => {
                        showSuccess('Organizacja utworzona!');
                        handleClose();
                    },
                    onError: () => showError('Błąd podczas tworzenia organizacji'),
                }
            );
        },
        [mutate, showSuccess, showError, handleClose]
    );

    const handleSave = handleSubmit(onSubmit);

    useEffect(() => {
        reset();
    }, [open]);

    const filteredData = useMemo(() => {
        return data?.filter((organization) => organization.name.includes(searchValue));
    }, [data, searchValue]);
    const columns: GridColDef[] = useMemo(() => {
        return [
            { field: 'id' },
            {
                field: 'name',
                headerName: 'Nazwa',
                renderCell: (params) => (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <UserAvatar firstName={params.row.name} size="small" />
                        <span>{params.row.name}</span>
                    </Stack>
                ),
                width: 200,
            },

            { field: 'joinedAt', headerName: 'Dołączono', width: 400 },
            { field: 'owner', headerName: 'Lider', flex: 1 },
        ];
    }, []);

    const rows = useMemo(() => {
        return filteredData?.map((organization) => ({
            id: organization.id,
            name: organization.name,
            joinedAt: formatDate(organization.joinedAt, 'll'),
            owner: organization.owner.name,
        }));
    }, [filteredData]) as any[];

    return (
        <>
            {open && (
                <FormProvider {...methods}>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        maxWidth="xs"
                        component="form"
                        onSubmit={handleSave}
                    >
                        <DialogContent>
                            <Stack spacing={2}>
                                <TextInput<FormInput> name="name" label="Nazwa" />
                                <TextInput<FormInput> name="description" label="Opis" multiline rows={4} />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Anuluj</Button>
                            <LoadingButton type="submit" isLoading={isPending}>
                                Utwórz
                            </LoadingButton>
                        </DialogActions>
                    </Dialog>
                </FormProvider>
            )}
            <Stack direction="row" className="justify-between mb-2">
                <Typography variant="h5">Organizacje</Typography>
                <Button variant="contained" onClick={handleOpen}>
                    Utwórz organizację
                </Button>
            </Stack>
            <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
            <DataTable
                columns={columns}
                loading={isLoading}
                rows={rows}
                className="mt-4"
                onRowDoubleClick={(params) => {
                    navigate(`/organizations/${params.row.id}`);
                }}
            />
        </>
    );
}

export default Organizations;
