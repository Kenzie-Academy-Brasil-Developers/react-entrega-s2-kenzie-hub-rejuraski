import { createTheme } from '@material-ui/core/styles';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#ff577f',
            contrastText: '#fff',
        },

        primaryFocus: {
            main: '#ff427F',
            contrastText: '#fff',
        },

        primaryDisabled: {
            main: '#59323f',
            contrastText: '#fff',

        },

        grey4: {
            main: '#121214',
            contrastText: '#fff',
        },

        secondary: {
            main: '#212529',
            contrastText: '#fff',

        },

        grey2: {
            main: '#343b41',
        },

        grey1: {
            main: '#868e96',
        },

        grey0: {
            main: '#f8f9fa',
        }

    }
});

export default Theme;