import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './Routes';
import configureStore from './store';
import { Provider } from 'react-redux';

const theme = createMuiTheme({
    spacing: 8,
    palette: {
        primary: {
            main: '#232f3e', // AWS-inspired dark blue
        },
        secondary: {
            main: '#ff9900', // AWS orange
        },
    },
});

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
