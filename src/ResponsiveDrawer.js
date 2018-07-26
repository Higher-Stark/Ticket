import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import Collections from '@material-ui/icons/Collections';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import BasketballIcon from 'mdi-material-ui/Basketball';
import MusicCircle from 'mdi-material-ui/MusicCircle';
import {Route, Redirect, withRouter, NavLink} from 'react-router-dom';
import SignUp from './page/SignUp';
import Login from './page/Login';
import User from './page/User';
import Homepage from './Homepage';
import Category from './page/Category';
import Search from './page/Search';
import Specify from './com/Specify';
import Activating from "./page/Activating";
import Activated from "./page/Activated";
import Cart from "./page/Cart";
import Ballet from './svg/ballet3.svg';
import Vocal from './svg/ic-vocal.svg';
import Mask from './svg/mask.svg';
import Parent from './svg/parenting.svg';
import Curtain from './svg/curtain.svg'
import Exhibition from './svg/exhibition.svg'
import Acrobatics from './svg/acrobatics.svg';
import OrderConfirm from './page/OrderConfirm';
import PayConfirm from './page/PayConfirm';
import Order from './page/Order'
import AfterPay from './page/AfterPay'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import BulletIcon from '@material-ui/icons/Tab'
import OrderIcon from '@material-ui/icons/List'
import UserInfoIcon from '@material-ui/icons/PermIdentity'

const listStyles = {
    home: {
        color: '#2196f3',
    },
    music: {
        color: red['A400'],
    },
    sports: {
        color: lightGreen['A400'],
    },
    svg: {
        width: 24,
        height : 24,
    },
    parenting: {
        color: '#547491',
    },
};

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
class NavMenuList2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false
        };
        this.handleClick = this.handleClick.bind()
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };


    render(){
        const { classes } = this.props;

        return(
            <div>
                <ListItem button onClick={this.handleClick} >
                    <ListItemIcon><Person/></ListItemIcon>
                    <ListItemText inset primary="Account" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={NavLink} to='/account'>
                            <ListItemIcon>
                                <UserInfoIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="UserInfo" />
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <BulletIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Bullet" />
                        </ListItem>
                        <ListItem button component={NavLink} to='/order'>
                            <ListItemIcon>
                                <OrderIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Order" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button component={NavLink} to='/cart'>
                    <ListItemIcon><ShoppingCart/></ListItemIcon>
                    <ListItemText inset primary='Cart'/>
                </ListItem>
                <ListItem button component={NavLink} to='/collection'>
                    <ListItemIcon><Collections/></ListItemIcon>
                    <ListItemText inset primary='Collection'/>
                </ListItem>
                <Divider/>
                <ListItem button component={NavLink} to='/'>
                    <ListItemIcon><HomeIcon style={listStyles.home}/></ListItemIcon>
                    <ListItemText inset primary='Home'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/vocal concert'>
                    <ListItemIcon><img src={Vocal} alt='vocal' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Vocal Concert'/>
                </ListItem>
                {/*<ListItem button component={NavLink} to='/category/show'>*/}
                    {/*<ListItemIcon><img src={Curtain} alt='show' style={listStyles.svg}/></ListItemIcon>*/}
                    {/*<ListItemText inset primary='Show'/>*/}
                {/*</ListItem>*/}
                {/*<ListItem button component={NavLink} to='/category/exhibition'>*/}
                    {/*<ListItemIcon><img src={Exhibition} alt='exhibition' style={listStyles.svg}/></ListItemIcon>*/}
                    {/*<ListItemText inset primary='Exhibition'/>*/}
                {/*</ListItem>*/}
                <ListItem button component={NavLink} to='/category/opera'>
                    <ListItemIcon><img src={Mask} alt='opera' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Opera'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/sports'>
                    <ListItemIcon><BasketballIcon style={listStyles.sports}/></ListItemIcon>
                    <ListItemText inset primary='Sports'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/dancing'>
                    <ListItemIcon><img src={Ballet} alt='dance' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Dance'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/parenting'>
                    <ListItemIcon><img src={Parent} alt='parent' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Parent-child'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/acrobatics'>
                    <ListItemIcon><img src={Acrobatics} alt='Acrobatics' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Acrobatics'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={this.props.toggleLogout}>
                    <ListItemIcon><LogoutVariant/></ListItemIcon>
                    <ListItemText inset primary='Logout'/>
                </ListItem>
            </div>
        )
    }
}

class ResponsiveDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            user: null,
            search: null,
        };
    }

    componentWillMount() {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        if (user !== null) this.setState({user});
    }

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    toggleLogin = (user) => {
        this.setState({
            user: user,
        });

    };

    toggleLogout = () => {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        console.log(user);
        user = JSON.parse(user);
        let token = user.token;
        fetch(`http://pipipan.cn:30004/Sign/Out?token=${token}`, {
            method: 'POST',
            credentials: "include",
        })
            .then(response => response.status)
            .then(status => {
                if (status === 200) {
                    storage.removeItem("user");
                    this.setState({user: null});
                }
                else throw Error("Connection failed");
            })
            .catch(e => console.log(e));
    };

    handleChange = (e) => {
        this.setState({search: e.target.value});
    };

    toggleSearch = () => {
        this.props.history.push({
            pathname: '/search/'+this.state.search,
        });
    };

    render() {
        const {classes, theme} = this.props;

// not login
        const NavMenuList1 = (
            <div>
                <ListItem button component={NavLink} to='/signin'>
                    <ListItemIcon><AccountCircle/></ListItemIcon>
                    <ListItemText inset primary='Sign in/up'/>
                </ListItem>
                <Divider/>
                <ListItem button component={NavLink} to='/'>
                    <ListItemIcon><HomeIcon style={listStyles.home}/></ListItemIcon>
                    <ListItemText inset primary='Home'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/concert'>
                    <ListItemIcon><MusicCircle style={listStyles.music}/></ListItemIcon>
                    <ListItemText inset primary='Concert'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/vocal concert'>
                    <ListItemIcon><img src={Vocal} alt='vocal' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Vocal Concert'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/opera'>
                    <ListItemIcon><img src={Mask} alt='opera' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Opera'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/sports'>
                    <ListItemIcon><BasketballIcon style={listStyles.sports}/></ListItemIcon>
                    <ListItemText inset primary='Sports'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/dancing'>
                    <ListItemIcon><img src={Ballet} alt='dance' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Dance'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/parenting'>
                    <ListItemIcon><img src={Parent} alt='parent' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Parent-child'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/acrobatics'>
                    <ListItemIcon><img src={Acrobatics} alt='Acrobatics' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Acrobatics'/>
                </ListItem>
            </div>
        );

// login

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <Avatar className={classes.avatar}>
                        <IconButton>
                            <ReceiptIcon/>
                        </IconButton>
                    </Avatar>
                </div>
                {this.state.user === null ? NavMenuList1 : <NavMenuList2 toggleLogout = {this.toggleLogout}/>}
            </div>
        );

        const LoginWrapper = (props) => (
                <Login {...props} toggleLogin={user => this.toggleLogin(user)}/>
        );

        const redirectTo = () => (
            <Redirect to='/signin'/>
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
                            <MenuIcon/>
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
                                   InputProps={{
                                       endAdornment: (
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
                    <div className={classes.toolbar}/>
                    <Route path='/' exact component={Homepage}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/activating' component={Activating}/>
                    <Route path='/activated/:uuid' component={Activated}/>
                    <Route path='/signin' component={LoginWrapper}/>
                    <Route path='/account' component={this.state.user === null ? redirectTo : User }/>
                    <Route path='/category/:category' component={Category}/>
                    <Route path='/search/:search' component={Search}/>
                    <Route path='/detail/:id' component={Specify}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path="empty" component={null} key="empty"/>
                    <Route path="/orderconfirm" component={OrderConfirm}/>
                    <Route path="/payconfirm" component={PayConfirm}/>
                    <Route path="/order" component={Order}/>
                    <Route path="/afterpay" component={AfterPay}/>
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