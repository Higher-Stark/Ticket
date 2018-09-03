import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = {
    list : {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: null,
            login: null,
            open: false,
            page: 0,
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

    toggleDrawer = () => {
        this.setState({open: true});
    }

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
        let date = (new Date).toUTCString();
        console.log(`Administrator ${login.id} login on ${date}`);
    }

    logout = e => {
        this.setState({
            admin: null,
            page: 0,
        });
        let date = (new Date).toUTCString();
        console.log("Administrator logout on ", date);
    }

    render() {
        const {admin, open} = this.state;

        const sideList = (
            <div className={classes.list}>
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
        )

        return (
            <div>
                <h2>Administrator</h2>
            </div>
        );
    }
}

export default App;
