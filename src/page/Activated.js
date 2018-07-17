import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

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

class Activated extends Component {

    componentDidMount() {
        let uuid= this.props.match.params.uuid;
        fetch(`http://120.79.58.85:30003/Email/Active?code=${uuid}`, {
            method: 'GET',
            credentials: "include",
        })
            .then(response => response.text())
            .then(text => {
                if (text === "true") {
                    alert("激活成功");
                }
                 else if (text === "false") {
                    alert("激活失败，未知错误");
                }
            });
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography noWrap align='center' color='primary' variant='display3'>Activate successfully!</Typography>
                <Typography variant='display1' align='center' noWrap color='secondary' className={classes.reminder}>
                    Now you have an account. Go => <a href='/signin'>Sign in</a>
                </Typography>
            </div>
        )
    }
}

Activated.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activated);