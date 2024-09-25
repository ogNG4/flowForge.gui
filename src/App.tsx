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

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ThemeProvider>
                        <Suspense fallback={<div>Loading...</div>}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </ThemeProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
