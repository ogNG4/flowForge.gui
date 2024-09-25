import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { lightTheme } from '.';

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <MuiThemeProvider theme={lightTheme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
