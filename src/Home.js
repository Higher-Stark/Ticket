import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from './Activity';
import {Cards} from './test-data/Cards';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
});

class Home extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography noWrap>Welcome to Ticket, here are the tickets.</Typography>
                <div className={classes.root}>
                    {
                        Cards.map((s, i) => {
                            return (
                                <Activity card={s} key={i}/>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);