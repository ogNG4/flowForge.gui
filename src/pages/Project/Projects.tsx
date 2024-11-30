import SearchInput from '@/components/Form/SearchInput';
import DataTable from '@/components/Table/DataTable';
import { useSearchValue, useUserProjectsQuery } from '@/hooks';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
    const { data, isLoading } = useUserProjectsQuery();
    const navigate = useNavigate();
    const { searchValue, setSearchValue } = useSearchValue();

    const filteredData = useMemo(() => {
        return data?.filter((project) => project.name.includes(searchValue));
    }, [data, searchValue]);

    const projectsRows = useMemo(() => {
        return filteredData?.map((project) => ({
            id: project.id,
            name: project.name,
            code: project.code,
        }));
    }, [filteredData]) as any[];

    const columns: GridColDef[] = useMemo(() => {
        return [
            { field: 'id' },
            { field: 'name', headerName: 'Nazwa', flex: 1 },
            { field: 'code', headerName: 'Kod', flex: 1 },
        ];
    }, []);

    return (
        <>
            <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
            <DataTable
                columns={columns}
                rows={projectsRows}
                loading={isLoading}
                className="mt-4"
                onRowDoubleClick={(params) => navigate(`/projects/${params.row.id}`)}
            />
        </>
    );
}
