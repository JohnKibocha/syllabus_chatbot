import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6750A4',
        },
        secondary: {
            main: '#625B71',
        },
        background: {
            default: '#fef7ff',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});

export default theme;
