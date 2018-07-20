import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Account extends Component {
    render() {
        return (
            <div>
                <Avatar alt='avatar' src='favicon.ico'/>
                <Typography variant='body2'>{this.props.user.name.toString()}</Typography>
            </div>
        )
    }
}

export default Account;