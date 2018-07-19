import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Email from '@material-ui/icons/Email';

const styles = theme => ({
    reminder: {
        marginTop: theme.spacing.unit * 2,
    },
    email: {
        width: '8%',
        height: '20%',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

class Activating extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography noWrap align='center' color='primary' variant='display3'>Sweet!
                    You're almost ready to go!</Typography>
                <Typography variant='display1' align='center' noWrap color='secondary' className={classes.reminder}>
                    Please check your email to activate your account.
                </Typography>
                <Typography variant='display3' align='center'>
                    <Email  className={classes.email}/>
                </Typography>

            </div>
        )
    }
}

Activating.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activating);