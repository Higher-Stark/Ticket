import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {Route, Redirect} from 'react-router-dom';
import {NavMenuList1, NavMenuList2} from "./NavMenu";
import SignUp from './SignUp';
import Login from './Login';
import Account from './Account';
import Home from './Home';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundAttachment: 'fixed',
        background: 'linear-gradient(to bottom right, rgba(255, 255, 240, .5), rgba(244, 81, 30, .1))',
        // backgroundImage: 'url(http://www.seekgif.com/download/fire-background-template-3135)',
        padding: theme.spacing.unit * 3,
    },
    avatar: {
        margin: 10,
        background: 'rgba(255, 255, 240, 0.2)',
        color: '#ff9320',
    },
    icon: {
        color: 'rgba(255,255, 0, 1)',
        width: 50,
        height: 50,
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
        user: null,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    toggleLogin = (user) => {
        this.setState({
            user: user,
        });
    };

    render() {
        const {classes} = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <Avatar className={classes.avatar}>
                        <IconButton>
                            <ReceiptIcon/>
                        </IconButton>
                    </Avatar>
                </div>
                {this.state.user === null ? NavMenuList1 : NavMenuList2 }
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            {
                                this.props.location ? this.props.location.pathname : 'Ticket'
                            }
                        </Typography>
                        {drawer}
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path='/homepage' exact component={Home}/>
                    <Route path='/homepage/signup' component={SignUp}/>
                    <Route path='/homepage/signin'
                           render={props => (<Login {...props} toggleLogin={user => this.toggleLogin(user)}/>)}/>
                    <Route path='/homepage/account' render={props => (this.state.user === null ? (
                            <Redirect to='/signin'/>) : (<Account {...props} user={this.state.user}/>)
                    )}/>
                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ResponsiveDrawer);