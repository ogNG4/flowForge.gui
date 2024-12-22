import { TextField } from '@mui/material';

interface SearchInputProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

function SearchInput({ searchValue, setSearchValue }: SearchInputProps) {
    return (
        <TextField size="small" label="Szukaj" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
    );
}

export default SearchInput;
