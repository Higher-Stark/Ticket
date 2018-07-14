import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {NavMenuList1, NavMenuList2} from "./com/NavMenu";
import SignUp from './page/SignUp';
import Login from './page/Login';
import Account from './Account';
import Home from './page/Home';
import Category from './page/Category';
import Search from './page/Search';

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
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        display: 'flex',
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
        background: 'url(https://images.unsplash.com/photo-1510792047925-c55a452bbad7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7eac342268ea9f12545a354d683d009d&auto=format&fit=crop&w=2052&q=80)',
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
    search: {
        margin: `0 ${theme.spacing.unit}px`,
        position: 'absolute',
        right: '0px',
    },
});

class ResponsiveDrawer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
            user: null,
            search: null,
        };
    }

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    toggleLogin = (user) => {
        this.setState({
            user: user,
        });
    };

    handleChange = (e) => {
        this.setState({search: e.target.value});
    };

    toggleSearch = () => {
        this.props.history.push({
            pathname: '/search',
            search: `s=${this.state.search}`,
        });
    };

    render() {
        const {classes, theme} = this.props;

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
                        <Hidden smDown implementation='css'>
                        <Typography variant="title" color="inherit" noWrap>
                            {
                                '聚票网'
                            }
                        </Typography>
                        </Hidden>
                        <TextField className={classes.search} id='search_input'
                                   label="Search"
                                   InputProps={{startAdornment: (
                                       <InputAdornment position="end">
                                           <SearchIcon onClick={this.toggleSearch}/>
                                       </InputAdornment>
                                       ),
                                   }}
                                   onChange={this.handleChange}
                        />
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route path='/' exact component={Home}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/signin' render={props => (<Login {...props} toggleLogin={user => this.toggleLogin(user)}/>)} />
                    <Route path='/account' render={props => (this.state.user === null ? (
                        <Redirect to='/signin'/>) : (<Account {...props} user={this.state.user}/>)
                        )}/>
                    <Route path='/category/:sort' component={Category}/>
                    <Route path='/search' component={Search}/>
                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(withRouter(ResponsiveDrawer));