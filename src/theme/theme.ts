import { ThemeOptions, createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { merge } from 'lodash';

const commonTheme: ThemeOptions = {
    palette: {
        primary: {
            main: indigo[500],
        },
    },
};

export const lightTheme = createTheme(
    merge(commonTheme, {
        palette: {
            mode: 'light',
        },
    })
);
