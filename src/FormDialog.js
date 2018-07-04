import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default class FormDialog extends React.Component {
    state = {
        attributes:[],
        users:[],
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    login = (e) => {
        let username = document.getElementById("Username").value;
        let email = document.getElementById("Email").value;
        let password = document.getElementById("Password").value;

    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Sign up</Button>
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
                        <Button onClick={this.login} color="primary">
                            Sign up for Ticket
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}