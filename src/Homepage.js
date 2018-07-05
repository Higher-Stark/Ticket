import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';


class Homepage extends Component {
    render() {
        return (
                <Typography noWrap id="ticket">{'Welcome to Ticket, here are the tickets.'}</Typography>
        )
    }
}

export default Homepage;