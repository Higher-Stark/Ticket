import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import AccountBox from '@material-ui/icons/AccountBox';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import ListIcon from '@material-ui/icons/List';
import Collections from '@material-ui/icons/Collections';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import BasketballIcon from 'mdi-material-ui/Basketball';
import MusicCircle from 'mdi-material-ui/MusicCircle';
import {Route, Redirect, withRouter, NavLink} from 'react-router-dom';
import SignUp from '../page/SignUp';
import Login from '../page/Login';
import User from '../page/User';
import Homepage from '../Homepage';
import Category from '../page/Category';
import Search from '../page/Search';
import Specify from '../com/Specify';
import Wallet from '../page/Wallet';
import Activating from "../page/Activating";
import Activated from "../page/Activated";
import Comments from '../page/Comments';
import Cart from "../page/Cart";
import OrderConfirm from '../page/OrderConfirm';
import PayConfirm from '../page/PayConfirm';
import Order from '../page/Order'
import AfterPay from '../page/AfterPay'
import Ballet from '../svg/ballet3.svg';
import Vocal from '../svg/ic-vocal.svg';
import Mask from '../svg/mask.svg';
import Parent from '../svg/parent-child.svg';
import Acrobatics from '../svg/acrobatics.svg';

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

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        minHeight: '100%',
        background: 'rgba(230, 230, 100, 0.3)',
    },
    appBar: {
        position: 'absolute',
        display: 'flex',
    },
    navText: {
        padding: `0 ${theme.spacing.unit}px`,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    viceAppBar: {
        position: 'absolute',
        marginTop: '64px',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    toolbar: theme.mixins.toolbar,
    classifyBar: {
        display: 'flex',
        flexGrow: 1,
    },
    classify: {
        display: 'flex',
        flexGrow: 1,
        padding: theme.spacing.unit,
        width: 50,
        height: 50,
        textDecoration: 'none',
    },
    classifyText: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    avatar: {
        margin: theme.spacing.unit,
        background: 'rgba(255, 255, 240, 0.2)',
        color: '#ff9320',
        position: 'absolute',
        right: theme.spacing.unit,
    },
    search: {
        margin: `0 ${theme.spacing.unit}px`,
        position: 'absolute',
        right: '64px',
    },
    content: {
        flexGrow: 1,
        backgroundAttachment: 'fixed',
        background: 'url(https://images.unsplash.com/photo-1532528457466-cdf44fdc0312?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b6d164661ebb899e537c052f4869fbe3&auto=format&fit=crop&w=2022&q=80)',
        padding: theme.spacing.unit,
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
    },
});

class PageRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            search: null,
            classifyOpen: false,
            userOpen: false,
        };
    }

    componentWillMount() {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        if (user !== null) this.setState({user});
    }

    toggleUser = () => {
        this.setState({
            userOpen: true,
        })
    };

    toggleClassify = () => {
        this.setState({
            classifyOpen: !this.state.classifyOpen,
        })
    };

    mouseOverUser() {
        console.log("Your Mouse is over User Icon Now");
    }

    handleClose = () => {
        this.setState({
            userOpen: false,
        })
    };

    render() {
       const {theme, classes} = this.props;
       const {user, search, classifyOpen, userOpen} = this.state;

       const classify = [
           {label: '音乐会', icon: <MusicCircle style={listStyles.music}/>, to: '/category/concert'},
           {label: '演唱会', icon: <img src={Vocal} alt='vocal' style={listStyles.svg}/>, to: '/category/vocal concert'},
           {label: '舞蹈', icon: <img src={Ballet} alt='dance' style={listStyles.svg}/>, to: '/category/dancing'},
           {label: '亲子', icon: <img src={Parent} alt='parent' style={listStyles.svg}/>, to: '/category/parenting'},
           {label: '戏剧', icon: <img src={Mask} alt='opera' style={listStyles.svg}/>, to: '/category/opera'},
           {label: '体育赛事', icon: <BasketballIcon style={listStyles.sports}/>, to: '/category/sports'},
           {label: '杂技', icon: <img src={Acrobatics} alt='Acrobatics' style={listStyles.svg}/>, to: '/category/acrobatics'},
       ];

       const userIcon = (user) => {
           if (user) {
               return (
                   <div>
                       <Avatar alt={user.username} src={user.avatar} className={classes.avatar}
                               onClick={this.toggleUser} onMouseOver={this.mouseOverUser}
                       />
                           <Menu open={userOpen} onClose={this.handleClose}
                                 anchorEl={null}
                                 anchorOrigin={{
                                     vertical: 'top',
                                     horizontal: 'right',
                                 }}
                                 transformOrigin={{
                                     vertical: 'top',
                                     horizontal: 'right',
                                 }}
                           >
                               <MenuItem button component={NavLink} to='/user/account'>
                                   <ListItemIcon>
                                       <AccountBox/>
                                   </ListItemIcon>
                                   <ListItemText inset primary="个人信息"/>
                               </MenuItem>
                               <MenuItem button component={NavLink} to='/user/wallet'>
                                   <ListItemIcon>
                                       <AccountBalanceWallet/>
                                   </ListItemIcon>
                                   <ListItemText inset primary="钱包"/>
                               </MenuItem>
                               <MenuItem button component={NavLink} to='/user/orders'>
                                   <ListItemIcon>
                                       <ListIcon/>
                                   </ListItemIcon>
                                   <ListItemText inset primary="订单管理"/>
                               </MenuItem>
                               <Divider/>
                               <MenuItem button component={NavLink} to='/cart'>
                                   <ListItemIcon><ShoppingCart/></ListItemIcon>
                                   <ListItemText inset primary='购物车'/>
                               </MenuItem>
                               <MenuItem button component={NavLink} to='/collection'>
                                   <ListItemIcon><Collections/></ListItemIcon>
                                   <ListItemText inset primary='我的收藏'/>
                               </MenuItem>
                               <Divider/>
                               <MenuItem button onClick={this.toggleLogout}>
                                   <ListItemIcon><LogoutVariant/></ListItemIcon>
                                   <ListItemText inset primary='Logout'/>
                               </MenuItem>
                           </Menu>
                   </div>
               )
           }
           else
               return (
                   <Avatar className={classes.avatar} component={NavLink} to='/signin'>
                       <AccountCircle/>
                   </Avatar>
               )
       }

        const LoginWrapper = (props) => (
            <Login {...props} toggleLogin={user => this.toggleLogin(user)}/>
        );

        const redirectTo = () => (
            <Redirect to='/signin'/>
        );
       return(
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color='inherit' noWrap component={NavLink} to='/' className={classes.navText}>
                            首页
                        </Typography>
                        <Typography variant="title" color='inherit' noWrap onClick={this.toggleClassify} className={classes.navText}>
                            分类
                        </Typography>
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
                        {userIcon(user)}
                    </Toolbar>
                </AppBar>
                <Collapse in={classifyOpen} timeout='auto' unmountOnExit>
                    <div className={classes.toolbar}/>
                    <AppBar color={"default"} className={classes.viceAppBar}>
                        <div className={classes.classifyBar}>
                        {
                            classify.map((s, i) => {
                                return (
                                    <div key={i} className={classes.classify}>
                                        <Typography variant='body1' color='primary' 
                                            className={classes.classifyText}
                                            component={NavLink} to={s.to}
                                        >
                                            {s.icon}
                                            <br/>
                                            {s.label}
                                        </Typography>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </AppBar>
                </Collapse>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path='/' exact component={Homepage}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/activating' component={Activating}/>
                    <Route path='/activated/:uuid' component={Activated}/>
                    <Route path='/signin' component={LoginWrapper}/>
                    <Route path='/user/account' component={this.state.user === null ? redirectTo : User }/>
                    <Route path='/user/wallet' component={this.state.user === null ? redirectTo : Wallet }/>
                    {
                        /*
                    <Route path='/user/orders' component={this.state.user === null ? redirectTo : User }/>
                         */
                    }
                    <Route path='/category/:category' component={Category}/>
                    <Route path='/search/:search' component={Search}/>
                    <Route path='/detail/:id' component={Specify}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/comments' component={Comments}/>
                    <Route path="empty" component={null} key="empty"/>
                    <Route path="/orderconfirm" component={OrderConfirm}/>
                    <Route path="/payconfirm" component={PayConfirm}/>
                    <Route path="/user/orders" component={Order}/>
                    <Route path="/afterpay" component={AfterPay}/>
                    <div id='footer' className={classes.footer}>
                        <Typography variant='subheading' color={"primary"} noWrap>
                            CopyRight Team pipipan - SJTU
                        </Typography>
                    </div>
                </main>
            </div>
       )
    }
}

PageRouter.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(withRouter(PageRouter));
