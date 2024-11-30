import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
    columns: GridColDef[];
    rows: any[];
}
function DataTable({ columns, rows, ...props }: DataTableProps & DataGridProps) {
    return (
        <DataGrid
            columns={columns}
            rows={rows}
            {...props}
            sx={{
                '&, [class^=MuiDataGrid]': { border: 'none' },
                '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                },
                '& .MuiDataGrid-cell:hover': {
                    cursor: 'default',
                },
            }}
            isRowSelectable={() => false}
            disableColumnMenu
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            disableColumnResize
            columnVisibilityModel={{
                id: false,
            }}
        />
    );
}

export default DataTable;
