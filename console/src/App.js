import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import Routes from './Routes'
import configureStore from "./store";
import {Provider} from "react-redux";

const theme = createMuiTheme({
    // Theme styles to apply across the entire product
});

class App extends Component {
    render () {
        return (
            <Provider store={configureStore()}>
                <ThemeProvider theme={theme} >
                    <Routes />
                </ThemeProvider>
            </Provider>
        )
    }
}

export default App;
