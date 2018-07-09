import React, {Component} from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Welcome from "./Welcome";


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
            light: purple[200],
            main: purple[500],
            dark: purple[700],
            // contrastText: getContrastText(purple[500]),
        },
        secondary: {
            light: cyan[200],
            main: cyan[500],
            dark: cyan[700],
            // contrastText: getContrastText(cyan[500]),
        },
        error: {
            light: red[200],
            main: red[500],
            dark: red[700],
            // contrastText: getContrastText(red[500]),
        },
        accent: lime.A100,
        accent2: lime.A200,
        optional: '#FFC107',
    },

});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div>
                        <Route path='/' exact component={Welcome}/>
                        <Route path='/homepage' component={ResponsiveDrawer}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
