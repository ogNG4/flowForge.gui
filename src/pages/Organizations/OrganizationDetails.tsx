import {
    useAddOrganizationMemberMutation,
    useCreateProjectMutation,
    useModal,
    useOrganizationMembersQuery,
    useOrganizationProjectsQuery,
    useSearchValue,
} from '@/hooks';
import { Stack, Typography, Button, Dialog, DialogContent, Select, MenuItem, DialogActions } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrganizationMemberRole, userRoles } from '@/constants/domain';
import TextInput from '@/components/Form/TextInput';
import SelectInput from '@/components/Form/SelectInput';
import LoadingButton from '@/components/Button/LoadingButton';
import SearchInput from '@/components/Form/SearchInput';
import { formatDate } from '@/utils/common';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '@/components/Table/DataTable';

interface MemberFormInput {
    email: string;
    role: string;
}

interface ProjectFormInput {
    name: string;
    code: string;
}

interface MemberFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MemberFormInput) => void;
    isLoading: boolean;
}

interface ProjectFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormInput) => void;
    isLoading: boolean;
}

function MemberForm({ open, onClose, onSubmit, isLoading }: MemberFormProps) {
    const memberValidationSchema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().required('Email jest wymagany.'),
            role: yup.string().required('Rola jest wymagana.'),
        });
    }, []);

    const methods = useForm<MemberFormInput>({
        resolver: yupResolver(memberValidationSchema),
    });

    useEffect(() => {
        methods.reset();
    }, [open]);

    const handleSubmit = (data: MemberFormInput) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
                component="form"
                onSubmit={methods.handleSubmit(handleSubmit)}
            >
                <DialogContent>
                    <Stack spacing={2}>
                        <TextInput<MemberFormInput> name="email" label="Email" />
                        <SelectInput<MemberFormInput> name="role" label="Rola">
                            {userRoles.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </SelectInput>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Anuluj</Button>
                    <LoadingButton type="submit" isLoading={isLoading}>
                        Dodaj
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </FormProvider>
    );
}

function ProjectForm({ open, onClose, onSubmit, isLoading }: ProjectFormProps) {
    const projectValidationSchema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required('Nazwa jest wymagana.'),
            code: yup.string().required('Kod jest wymagany'),
        });
    }, []);

    const methods = useForm<ProjectFormInput>({
        resolver: yupResolver(projectValidationSchema),
    });

    useEffect(() => {
        methods.reset();
    }, [open]);

    const generateProjectCode = (name: string) => {
        return name.split(' ')[0].slice(0, 4).toUpperCase();
    };

    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === 'name' && value.name) {
                const suggestedCode = generateProjectCode(value.name);
                methods.setValue('code', suggestedCode);
            }
        });

        return () => subscription.unsubscribe();
    }, [methods]);

    const handleSubmit = (data: ProjectFormInput) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
                component="form"
                onSubmit={methods.handleSubmit(handleSubmit)}
            >
                <DialogContent>
                    <Stack spacing={2}>
                        <TextInput<ProjectFormInput> name="name" label="Nazwa" />
                        <TextInput<ProjectFormInput> name="code" label="Kod" />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Anuluj</Button>
                    <LoadingButton type="submit" isLoading={isLoading}>
                        Utwórz
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </FormProvider>
    );
}

function OrganizationDetails() {
    const { id } = useParams();
    const { searchValue: membersSearchValue, setSearchValue: setMembersSearchValue } = useSearchValue();
    const { searchValue: projectsSearchValue, setSearchValue: setProjectsSearchValue } = useSearchValue();
    const { data: members, isLoading: isMembersLoading } = useOrganizationMembersQuery({ organizationId: id || '' });
    const { data: projects, isLoading: isProjectsLoading } = useOrganizationProjectsQuery({ organizationId: id || '' });
    const { mutate, isPending: isAddingMember } = useAddOrganizationMemberMutation();
    const { mutate: createProject, isPending: isCreatingProject } = useCreateProjectMutation();
    const { open, handleOpen, handleClose } = useModal();
    const {
        open: openProjectDialog,
        handleOpen: handleOpenProjectDialog,
        handleClose: handleCloseProjectDialog,
    } = useModal();

    const handleMemberSubmit = useCallback(
        (data: MemberFormInput) => {
            mutate(
                { organizationId: id || '', ...data },
                {
                    onSuccess: () => {
                        handleClose();
                    },
                }
            );
        },
        [mutate, id, handleClose]
    );

    const handleProjectSubmit = useCallback(
        (data: ProjectFormInput) => {
            createProject(
                { organizationId: id || '', ...data },
                {
                    onSuccess: () => {
                        handleCloseProjectDialog();
                    },
                }
            );
        },
        [createProject, id, handleCloseProjectDialog]
    );

    const filteredMembers = useMemo(() => {
        if (members) return members?.filter((member) => member.email.includes(membersSearchValue));
    }, [members, membersSearchValue]);

    const filteredProjects = useMemo(() => {
        if (projects) return projects?.filter((project) => project.name.includes(projectsSearchValue));
    }, [projects, projectsSearchValue]);

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
            { field: 'role', headerName: 'Rola', flex: 1 },
        ];
    }, []);

    const projectsColumns: GridColDef[] = useMemo(() => {
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
                flex: 1,
            },
            { field: 'code', headerName: 'Kod', flex: 1 },
        ];
    }, []);

    const rows = useMemo(() => {
        return filteredMembers?.map((member) => ({
            id: member.id,
            name: member.firstName + ' ' + member.lastName,
            email: member.email,
            joinedAt: formatDate(member.joinedAt, 'll'),
            role: member.role,
        }));
    }, [filteredMembers]) as any[];

    const projectsRows = useMemo(() => {
        return filteredProjects?.map((project) => ({
            id: project.id,
            name: project.name,
            code: project.code,
        }));
    }, [filteredProjects]) as any[];

    return (
        <>
            <MemberForm open={open} onClose={handleClose} onSubmit={handleMemberSubmit} isLoading={isAddingMember} />
            <ProjectForm
                open={openProjectDialog}
                onClose={handleCloseProjectDialog}
                onSubmit={handleProjectSubmit}
                isLoading={isCreatingProject}
            />
            <Stack direction="row" className="justify-between mb-2">
                <Typography variant="h5">Członkowie</Typography>
                <Button variant="contained" onClick={handleOpen}>
                    Dodaj członka
                </Button>
            </Stack>
            <SearchInput searchValue={membersSearchValue} setSearchValue={setMembersSearchValue} />
            <DataTable columns={columns} rows={rows} loading={isMembersLoading} className="mt-4" />
            <Stack direction="row" className="justify-between my-2">
                <Typography variant="h5">Projekty</Typography>
                <Button variant="contained" onClick={handleOpenProjectDialog}>
                    Utwórz projekt
                </Button>
            </Stack>
            <SearchInput searchValue={projectsSearchValue} setSearchValue={setProjectsSearchValue} />
            <DataTable columns={projectsColumns} rows={projectsRows} loading={isProjectsLoading} className="mt-4" />
        </>
    );
}

export default OrganizationDetails;
