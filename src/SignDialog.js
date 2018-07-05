import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import emitter from "./ev"

export default class SignDialog extends React.Component {
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



    signup = (e) => {
        let username = document.getElementById("Username").value;
        if (username.length === 0) {
            alert("Username empty, please input");
            return;
        }
        let email = document.getElementById("Email").value;
        if (email.length === 0) {
            alert("Email empty, please input");
            return;
        }
        let password = document.getElementById("Password").value;
        if (password.length === 0) {
            alert("Password empty, please input");
            return;
        }
        for (let user of this.state.users) {
            if (user[0] === username) {
                alert("Username used , please change");
                return;
            }
        }
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

        if (!reg.test(email)) {
            alert("Email invalid, please change");
        }

        else if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
            alert("Password must contain both numbers and letters");
        }
        else {
            //pretend to add into the database
            let newuser = [];
            newuser.push(username);
            newuser.push(email);
            newuser.push(password);
            this.state.users.push(newuser);

            alert("Sign up successfully");
            this.handleClose();
            emitter.emit("showLog");
        }
    };

    render() {
        return (
            <div  class="animated fadeIn" >
                <Button onClick={this.handleClickOpen} >Sign up</Button>
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
                            id="Email"
                            label="Email"
                            type="email"
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
                        <Button onClick={this.signup} color="primary">
                            Sign up for Ticket
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}