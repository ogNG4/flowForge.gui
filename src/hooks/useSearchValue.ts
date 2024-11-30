import { useState } from "react";

function useSearchValue() {
    const [searchValue, setSearchValue] = useState('');
    return { searchValue, setSearchValue };
}

export default useSearchValue;
