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
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: null,
            login: null,
            open: false,
            page: 0,
            id: null,
            pwd: null,
        };
    }

    componentWillMount() {
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        if (!admin) {
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

    login = e => {
        const {login} = this.state;
        let admin = {
            id: login.id,
            token: "1010101010",
        };
        let storage = window.sessionStorage;
        storage.setItem("admin", JSON.stringfy(admin));
        this.setState({
            admin: admin,
            login: null,
            page: 1,
        });
        let date = (new Date()).toUTCString();
        console.log(`Administrator ${login.id} login on ${date}`);
    }

    logout = e => {
        this.setState({
            admin: null,
            page: 0,
        });
        let date = (new Date()).toUTCString();
        console.log("Administrator logout on ", date);
    };

    render() {
        const {classes} = this.props;
        const {admin, open, page, id, pwd} = this.state;

        const sideList = (
            <div className={classes.toolbar}>
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="用户管理" />
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
                    <Typography variant="title" color="primary" gutterBottom>
                        管理员登录
                    </Typography>
                    <TextField id='admin-id' label="管理员ID" className={classes.textField} margin="normal"
                        required value={id || ''} onChange={this.handleChange('id')}
                    />
                    <TextField id='pwd' label="密码" className={classes.textField} margin="normal" required
                        value={pwd || ''} onChange={this.handleChange('pwd')}
                    />
                    <Button onClick={this.login} variant="compact" color="primary">
                        登录
                    </Button>
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
                    { admin || 'Haven\'t login' }
                </Typography>
                <Button color="secondary" variant="outlined">
                    Check
                </Button>
            </div>
        );
        
        let content = signin;
        switch (page) {
            case 0: 
                content = signin;
                break;
            case 1: 
                content = meaningless;
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
