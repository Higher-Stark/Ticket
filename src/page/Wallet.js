import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Recharge from '../pic/recharge.jpg';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
    },
    block: {
        display: 'block',
        padding: theme.spacing.unit,
    },
    inline: {
        display: 'inline-block',
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    paper: {
        position: 'absolute',
        width: '90%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadow[5],
        padding: theme.spacing.unit * 4,
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        margin: 'auto auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Wallet extends Component {
    serviceUrl = 'http://pipipan.cn:30009';

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            recharge: 0,
            open: false,
        }
    }

    componentWillMount() {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        fetch(`${this.serviceUrl}/UserDetail/QueryByUserid?token=${token}`, {
            method: 'GET',
            credentials: "include",
        }).then(response => {
            let headers = response.headers;
            switch (headers.get("errornum")) {
                case '0' :
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '2' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(data => {
                this.setState({balance: data.account || 0})
            })
            .catch (e => {
                console.log(e);
                this.props.history.push("/");
            })
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            recharge: e.target.value,
        })
    };

    toggleClick = () => {
        this.setState({
            open: true,
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Paper elevation={10} className={classes.paper}>
                    <div className={classes.block}>
                    <Typography variant='title' component='h2' color='primary' className={classes.inline}>
                        {"账户余额: "}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary' className={classes.inline}>
                        {this.state.balance}
                    </Typography>
                    </div>
                    <Button variant='contained' color='primary' onClick={this.toggleClick}>
                        {"充值"}
                    </Button>
                    <Modal open={this.state.open} aria-labelledby="recharge-modal" aria-describedby="recharge-modal-description"
                           onClose={this.handleClose}
                           >
                        <div style={{ top: '50%', left: '50%', transform: "translate(-50%, -50%)"}} className={classes.paper}>
                            <div className={classes.block}>
                                <img src={Recharge} alt="收款码" className={classes.image}/>
                            </div>
                            <TextField value={this.state.recharge} onChange={this.handleChange}
                                       label={"充值"} id="recharge" placeholder={"充值金额"}
                                       type='number' className={classes.block}
                                       />
                            <Button variant='contained' color='primary' disableRipple className={classes.button} onClick={this.recharge}>
                                {"充值"}
                            </Button>
                        </div>
                    </Modal>
                </Paper>
            </div>
        )
    }
}

Wallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wallet);