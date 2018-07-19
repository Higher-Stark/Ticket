import React, {Component} from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import {BrowserRouter as Router} from 'react-router-dom';
import 'animate.css/animate.css';
import './css/index.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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
            fontSize: 16,
        },
        button: {
            fontStyle: 'bold',
        },
    },
    palette: {
        primary: {
            light: '#6f74dd',
            main: indigo[600],
            dark: '#00227b',
        },
        secondary: {
            light: '#ff844c',
            main: deepOrange[600],
            dark: '#b91400',
        },
        textSecondary: {
            light: '#484848',
            main: grey[900],
            dark: '#000000',
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
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            flash: cookies.get('flash')||false,
            user:null,
        };
    }

    componentDidMount() {
        const { cookies } = this.props;
        setTimeout(() => {cookies.set('flash', 1);this.setState({flash: true});}, 5000);
    }


    render() {
        const Welcome = (
            <div onClick={() => {const { cookies } = this.props;cookies.set('flash', 1);this.setState({flash: true})}} id='background'>
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

export default withCookies(App);
