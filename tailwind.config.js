import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    important: '#root',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {},
        fontWeight: {
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
        spacing: {
            0: '0rem', // 0px
            '1/2': '0.25rem', // 4px
            1: '0.5rem', // 8px
            2: '1rem', // 16px
            3: '1.5rem', // 24px
            4: '2rem', // 32px
            5: '2.5rem', // 40px
            6: '3rem', // 48px
            7: '3.5rem', // 56px
            8: '4rem', // 64px
            9: '4.5rem', // 72px
            10: '5rem', // 80px
            11: '5.5rem', // 88px
            12: '6rem', // 96px
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '1650px',
        },
        borderRadius: {
            none: '0',
            sm: '0.125rem',
            default: '0.25rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            full: '9999px',
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.y-center': {
                    display: 'flex',
                    alignItems: 'center',
                },
                '.x-center': {
                    display: 'flex',
                    justifyContent: 'center',
                },
                '.xy-center': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '.m-auto': {
                    margin: 'auto',
                },
                '.mx-auto': {
                    margin: 'auto 0',
                },
                '.my-auto': {
                    margin: '0 auto',
                },
                '.ellipsis': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                '.first-letter-uppercase': {
                    textTransform: 'lowercase',
                },
                '.first-letter-uppercase::first-letter': {
                    textTransform: 'uppercase',
                },
            };

            addUtilities(newUtilities);
        }),
    ],
};
