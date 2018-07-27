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
import black from './pic/black.jpeg'

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

    constructor(props) {
        super(props);
        let storage = window.sessionStorage;
        let flash = storage.getItem('flash');
        this.state = {
            flash: flash,
        };
        this.slideshow = this.slideshow.bind(this);
        this.cancelFlash = this.cancelFlash.bind(this)
    }

    componentDidMount() {
        this.slideshow();
        setTimeout(this.cancelFlash, 6000)

    }

    cancelFlash(){
        if(this.state.flash)
            return;
        console.log(this.state.flash+"1")
        let storage = window.sessionStorage;
        storage.setItem("flash",true);
        this.setState({
            flash:true
        })
        console.log(this.state.flash)
    }

    slideshow() {
        if(this.state.flash)
            return;
        console.log(document.getElementById("background"))
        if(document.getElementById("background")==null)
            return;
        var imgs=document.getElementById("background").getElementsByTagName("img"), //得到图片们
        
        current=0; //current为当前活跃的图片编号
      
        function slideOff() {
            imgs[current].className = ""; //图片淡出
        }

        function slideOn() {
            imgs[current].className = "active"; //图片淡入
        }

        function changeSlide() { //切换图片的函数
            slideOff();
            current++; //自增1
            slideOn();
        }

        //每2s调用changeSlide函数进行图片轮播
        setTimeout(changeSlide, 2000);
        setTimeout(changeSlide, 4000);
    }

    render() {
        const Welcome = (
            <div id="background" className='background' onClick={this.cancelFlash}>
                <img className="active" src={black} alt={''}/>
                <img src={"https://images.unsplash.com/photo-1532604681419-9be438708684?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0d2432f51467a4c6c402cb78d15265&auto=format&fit=crop&w=1466&q=80"}  alt={''}/>
                <img src={"https://images.unsplash.com/photo-1532604681419-9be438708684?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0d2432f51467a4c6c402cb78d15265&auto=format&fit=crop&w=1466&q=80"}  alt={''}/>

                <div className="content">
                    <h2 className="greeting-word">Fashion passes,</h2>
                    <h2 className="greeting-word">style remains.</h2>
                </div>
            </div>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    {this.state.flash ?  <ResponsiveDrawer/>:Welcome}
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;