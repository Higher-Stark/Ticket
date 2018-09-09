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
import Report from './statistics.js';
import ManagerUser from './ManageUser';
import Report from './statistics.js';
import ManageTicket from './ManageTicket.js';

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
    textField: {
        padding: theme.spacing.unit,
    },
    verifyImg: {
        maxWidth: '22%',
        height: '14%',
    },
});

class App extends Component {
    verifyUrl='http://120.79.58.85:30001/Code/Generate';

    constructor(props) {
        super(props);
        this.state = {
            admin: null,
            open: false,
            page: 0,
            id: null,
            pwd: null,
            verify: null,
            verifyUrl: this.verifyUrl,
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
                page: 3,
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

    login = e => {
        const {id, pwd, verify} = this.state;

        if (!id) {
            alert("管理员ID不能为空");
            return -1;
        }
        if (pwd.length === 0) {
            alert("密码不能为空");
            return;
        }
        if (!verify) {
            alert("验证码不能为空");
            return -1;
        }
        
        let form = {
            answer: verify,
            username: id,
            password: pwd,
        };
        let params = "";
        let attr = null;
        for (attr in form) {
            params += attr + "=" + form[attr] + "&";
        }
        console.log(params);
        params = params.substring(0, params.length - 1);

        const url = "http://pipipan.cn:30004/Sign/In";
        console.log(url + "?" + params);
        fetch (url + "?" + params, {
            method: 'POST',
            "content-type": "application/x-www-form-urlencoded",
        })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                switch(text) {
                    case "code" :
                        alert("验证码错误");
                        break;
                    case "fail":
                        alert("用户名或密码错误");
                        break;
                    case "UnActive":
                        alert("用户未激活，无需重新发送邮件");
                        break;
                    default:
                        let admin = {
                            id: id,
                            token: text,
                        };
                        let storage = window.sessionStorage;
                        storage.setItem("admin", JSON.stringify(admin));
                        this.setState({
                            admin: admin,
                            page: 1,
                        });
                }
                this.setState({
                    id: null,
                    pwd: null,
                    verify: null,
                    verifyUrl: this.verifyUrl + "?d=" + (new Date()).getTime(),
                });
            })
            .catch(e => console.log(e))
    }

    logout = e => {
        const {admin} = this.state;
        fetch (`http://pipipan.cn:30004/Sign/Out?token=${admin.token}`)
            .then(response => console.log(response))
            .catch(e => console.log(e));

        this.setState({
            admin: null,
            page: 0,
        });
        let storage = window.sessionStorage;
        storage.removeItem("admin");
        let date = (new Date()).toUTCString();
        console.log("Administrator logout on ", date);
    };

    changeVerifyImg = () => {
        let date = new Date();
        this.setState({
            verifyUrl: this.verifyUrl + `?d=${date.toUTCString()}`,
        });
    }

    render() {
        const {classes} = this.props;
        const {admin, open, page, id, pwd, verify} = this.state;

        /*
         * Drawer List Item
         */
        const sideList = (
            <div className={classes.toolbar}>
                <List component="nav">
                    <ListItem button onClick = {() => this.setState({page: 1})}>
                        <ListItemText primary="用户管理" />
                    </ListItem>
                    <ListItem button onClick={() => this.setState({page: 3})}>
                        <ListItemText primary="票品管理"/>
                    </ListItem>
                    <ListItem button onClick={() => this.setState({page: 2})}>
                        <ListItemText primary="销量统计" />
                    </ListItem>
                    <ListItem button onClick={() => this.setState({page: 3})}>
                        <ListItemText primary="票品管理" />
                    </ListItem>
                    <Divider/>
                    <ListItem button onClick={this.logout}>
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
                    <TextField id='verify' label="验证码" className={classes.textField} margin="normal" required
                        value={verify || ''} onChange={this.handleChange('verify')}
                    />
                    <img src={this.state.verifyUrl} alt="验证码" onClick={this.changeVerifyImg} 
                        className={classes.verifyImg}
                    />
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
            case 2:
                content = <Report/>;
                break;
            case 3:
                content = <ManageTicket/>;
                break;
            default: 
                content = signin;
        }
        if (!admin) content = signin;

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
