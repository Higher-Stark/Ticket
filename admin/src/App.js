import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ManagerUser from './ManageUser';

const styles = theme => ({
    root: {
        flexGrow: 1, 
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appbar: {
        position: 'absolute',
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    list : {
        width: 250,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    signin: {
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        background: 'rgba(255, 255, 240, 0.2)',
    },
    form: {
        flexGrow: 1,
        justifyContent: 'center',
        maxWidth: 300,
        padding: theme.spacing.unit,
        borderRadius: theme.spacing.unit,
    },
    buttonSec: {
        flexGrow: 1,
        justifyContent: 'center',
        display: 'flex',
    },
});

class App extends Component {
    verification = {
        verifyUrl: 'http://120.79.58.85:30001/Code/Generate',
        uuid: ''
    };
    changeVerifyImg = () => {
        let date = new Date();
        this.setState({
            verifyUrl : this.verification.verifyUrl + `?timestamp=${date.toUTCString()}`,
        });
    };
    /*
 * check username
 */
    check_name = () => {
        let pattern = /^[\w-]{5,25}$/;
        return pattern.test(this.state.id);
    };
    /*
     * Password must contains digits and characters
     */
    check_pwd = () => {
        let pattern = /^[\w-$%#]{6,25}$/;
        let test = pattern.test(this.state.pwd);
        test = test && (this.state.pwd.match(/\d/) !== null);
        test = test && (this.state.pwd.match(/\D/) !== null);
        return test;
    };
    constructor(props) {
        super(props);
        this.state = {
            admin: null,
            open: false,
            page: 0,
            id: null,
            pwd: null,
            email: '',
            authCode: '',
        };
    }

    componentWillMount() {
        this.changeVerifyImg();
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        if (admin) {
            console.log(admin);
            this.setState({
                admin: admin,
                page: 1,
            })
        }   
    }

    toggleDrawer = (v) => {
        this.setState({open: v});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    login = () => {
        const {id, pwd, authCode} = this.state;
        if (id.length === 0) {
            alert("管理员id不能为空");
            return;
        }
        if (pwd.length === 0) {
            alert("密码不能为空");
            return;
        }
        if (authCode.length === 0) {
            alert("验证码不能为空");
            return;
        }
        if(!this.check_name()){
            alert("Wrong username format");
            return;
        }
        if(!this.check_pwd()){
            alert("Wrong password format");
            return;
        }
        let s = `username=${id}&password=${pwd}&answer=${authCode}`;
        fetch('http://120.79.58.85:30004/Sign/In', {
            method: 'POST',
            body: s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include",
        })
            .then(response => {
                if (response.status !== 200) throw Error("Error !" + response);
                return response.text();
            })
            .then(text => {
                if (text === "code"){
                    alert("验证码错误");
                    this.changeVerifyImg();
                    return;
                }
                else if (text === "fail") {
                    alert("用户名或密码错误");
                    this.changeVerifyImg();
                    return;
                }
                else if (text === "UnActive") {
                    alert("邮箱未激活");
                    this.changeVerifyImg();
                    return;
                }
                else
                {
                    alert("登录成功");
                }
                let date = new Date();
                let utcTime = date.toUTCString();
                let admin = {
                    name: id,
                    time: utcTime,
                    token: text,
                };
                let storage = window.localStorage;
                storage.setItem("admin", JSON.stringify(admin));
                this.setState({
                    admin: admin,
                    page: 1,
                });
            })
    };

    logout = e => {
        this.setState({
            admin: null,
            page: 0,
        });
        let date = (new Date()).toUTCString();
        console.log("Administrator logout on ", date);
    };

    manageUser = () => {
        console.log("hello from the out side")
        this.setState({
            page: 1
        })
    }

    render() {
        const {classes} = this.props;
        const {admin, open, page, id, pwd} = this.state;

        /*
         * Drawer List Item
         */
        const sideList = (
            <div className={classes.toolbar}>
                <List component="nav">
                    <ListItem button onClick = {this.manageUser}>
                        <ListItemText primary="用户管理" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="票品管理" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="销量统计" />
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="退出" />
                    </ListItem>
                </List>
            </div>
        );

        const signin = (
            <div className={classes.signin}>
                <div className={classes.form}>
                    <Typography variant="title" color="primary" align='center' gutterBottom>
                        管理员登录
                    </Typography>
                    <TextField id='admin-id' label="管理员ID" className={classes.textField} margin="normal"
                        required value={id || ''} onChange={this.handleChange('id')} fullWidth
                    />
                    <TextField id='pwd' label="密码" className={classes.textField} margin="normal" required
                        value={pwd || ''} onChange={this.handleChange('pwd')} fullWidth type="password"
                    />
                    <TextField id='AuthCode' name='authCode'
                               value={this.state.authCode} label='Verification Code'
                               className={classes.authInput}
                               margin='normal'
                               onChange={this.handleChange('authCode')} />
                    <img src={this.state.verifyUrl}
                         alt=""
                         onClick={this.changeVerifyImg}
                         className={classes.verifyImg} />
                    <div className={classes.buttonSec}>
                    <Button onClick={this.login} variant="raised" color="primary">
                        登录
                    </Button>
                    </div>
                </div>
            </div>
        );

        const meaningless = (
            <div id="content">
                <Typography variant="subheading" color="primary">
                    This is administration section
                </Typography>
                <Typography variant="caption" color="default">
                    {"Page : "}{page}
                </Typography>
                <Typography variant="caption" color="default" gutterBottom>
                    { JSON.stringify(admin) || 'Haven\'t login' }
                </Typography>
                <Button color="secondary" variant="outlined">
                    Check
                </Button>
            </div>
        );

        const manageUserPage = (
            <ManagerUser/>
        )

        /*
         * control page with content
         */
        let content = signin;
        switch (page) {
            case 0: 
                content = signin;
                break;
            case 1: 
                content = manageUserPage;
                break;
            default: 
                content = signin;
        };

        return (
            <div>
                <AppBar className={classes.appbar}>
                    <Toolbar className={classes.toolbar} disableGutters={true}>
                        <IconButton color="inherit" aria-label="Open" onClick={() => this.toggleDrawer(true)} className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            Administrator
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer anchor="left" open={open} onClose={() => this.toggleDrawer(false)} onOpen={() => this.toggleDrawer(true)}>
                    <div className={classes.list} tabIndex={0} role="button" onKeyDown={() => this.toggleDrawer(false)}>
                        {sideList}
                    </div>
                </SwipeableDrawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {content}
                </main>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
