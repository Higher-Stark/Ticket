import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
        background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(255, 0, 0, 0.15)), url(https://mir-s3-cdn-cf.behance.net/project_modules/fs/37ca1352939141.592593e534024.png)',
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
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
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
                {this.state.user === null ? NavMenuList1 : NavMenuList2}
            </div>
        );

        return (
            <div className={classes.root} >
                <AppBar className={classes.appBar} style={{background:'black'}}>
                    <Toolbar style={{margin:'0 auto'}}>
                        <Typography variant="title" color="inherit"  noWrap>
                            聚票网
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