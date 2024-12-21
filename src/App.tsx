import '@/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { theme } from './utils/theme';
import { ThemeProvider } from './theme';
import PageLoader from '@/components/Loading/PageLoader';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

// Konfiguracja dayjs
dayjs.locale('pl');

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ThemeProvider>
                        <Suspense fallback={<PageLoader />}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                <RouterProvider router={router} />
                            </LocalizationProvider>
                        </Suspense>
                    </ThemeProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
