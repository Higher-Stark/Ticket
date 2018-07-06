import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Account extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div>
                <Avatar alt='avatar' src='favicon.ico'/>
                <Typography variant='body2'>{this.props.user.toString()}</Typography>
            </div>
        )
    }
}

export default Account;