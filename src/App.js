import React, { Component } from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import {BrowserRouter as Router} from 'react-router-dom';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Roboto',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Segoe UI Emoji"',
            '"Segoe UI System"',
        ].join(','),
        fontWeightMedium: 500,
        body1: {
            fontWeight: 500,
        },
        subheading: {
            fontSize: 12,
        },
        button: {
            fontStyle: 'bold',
        },
    },
    palette: {
        primary: {
            light: pink[100],
            main: pink[300],
            dark: pink[500],
        },
        secondary: {
            light: purple[200],
            main: grey[900],
            dark: purple[400],
        },
        error: {
            light: red[200],
            main: red[500],
            dark: red[700],
        },
        accent: lime.A100,
        accent2: lime.A200,
        optional: '#FFC107',
    },
    shadow: [
        '#f5f5f5',
        '#e0e0e0',
        '#9e9e9e',
        '#757575',
        '#616161',
        '#424242'
    ],
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <ResponsiveDrawer/>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
