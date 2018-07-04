import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import emitter from "./ev";

export default class LogDialog extends React.Component {
    state = {
        attributes: ["Username", "Email", "Password"],
        users: [["xtq", "xtq@sjtu.edu.cn", "xtq@password"],
            ["pzy", "pzy@sjtu.edu.cn", "pzy@password"],
            ["qpz", "qpz@sjtu.edu.cn", "qpz@password"],
            ["ybh", "ybh@sjtu.edu.cn", "ybh@password"]],
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount(){
        this.eventEmitter = emitter.addListener("showLog",()=>{
            this.handleClickOpen();
        });
    }

    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

    login = (e) => {
        let username = document.getElementById("Username").value;
        if (username.length === 0) {
            alert("Username empty, please input");
            return;
        }
        let password = document.getElementById("Password").value;
        if (password.length === 0) {
            alert("Password empty, please input");
            return;
        }
        for (let user of this.state.users) {
            if (user[0] === username && user[2] === password) {
                alert("Log in successfully");
                this.handleClose();
                document.getElementById('not').style.display='none';
                document.getElementById('login').style.display='block';
                document.getElementById('welcome').style.display='none';
                document.getElementById('ticket').style.display='block';
                document.getElementById('recipe').style.display='block';
                return;
            }
        }
        alert("Wrong username or password");
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Sign in</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Username"
                            label="Username"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="Password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.login} color="primary">
                            Sign in for Ticket
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}