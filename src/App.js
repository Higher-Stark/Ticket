import React, {Component} from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Login from './Login';

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
            // contrastText: getContrastText(purple[500]),
        },
        secondary: {
            light: cyan[200],
            main: grey[900],
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
    shadow: [
        '#f5f5f5',
        '#e0e0e0',
        '#9e9e9e',
        '#757575',
        '#616161',
        '#424242'
    ],
});


function getCookie(cname)
{
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
        let c = ca[i].trim();
        if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname,cvalue)
{
    let expires = "expires=null; path=/";
    document.cookie = cname + "=" + cvalue + "; " + expires;
}



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flash: parseInt(getCookie("flash"),0),
            user:null,
        };
    }

    componentDidMount() {
        setTimeout(() => {setCookie("flash","1");this.setState({flash: true});}, 5000);
    }

    componentWillUnmount(){
        setCookie("flash","0");
    }

    render() {
        const Welcome = (
            <div onClick={() => {setCookie("flash","1");this.setState({flash: true})}} id='background'>
                <div className="bg"/>
                <div className="bg bg2"/>
                <div className="bg bg3"/>
                <div className="content">
                    <h1 className="animated bounce">Ticket Website</h1>
                </div>
            </div>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    {this.state.flash ? <ResponsiveDrawer/>: Welcome}
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
