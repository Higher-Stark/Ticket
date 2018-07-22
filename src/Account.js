import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 500,
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    verifyImg: {
        width: '30%',
        height: '85%',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    authInput: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '65%',
    },
    button: {
        width: '50%',
        textAlign: 'center',
        padding: '0 auto',
        marginTop: theme.spacing.unit,
        alignItems: 'center',
        margin: 'auto',
    },
    root: {
        margin: '0 auto',
        maxWidth: 510,
        padding: `0 ${theme.spacing.unit}px`,
    },
    header: {
        paddingBottom: theme.spacing.unit,
    },
    reminder: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            authCode: '',
            verifyUrl: '',
            formError: false,
        }
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <Typography noWrap className={classes.header} align='center' color='primary'
                                variant='display2'>Account</Typography>
                    <Paper>
                        <Typography variant='body2'>
                            <Grid item xs={6}><TableCell>photo:</TableCell></Grid><TableCell><Avatar
                            alt='avatar' src='favicon.ico'/></TableCell></Typography>
                        <Typography
                            variant='body2'><TableCell>username:</TableCell><TableCell>{this.props.user.name.toString()}</TableCell></Typography>
                    </Paper>
                </div>
            </div>
        )
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);