import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from './Activity';
import {Cards} from './test-data/Cards';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
});

class Home extends Component {
    /*
    constructor(props) {
        super(props);
    }
    */

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {
                    Cards.map((s, i) => {
                        return (
                            <Activity card={s} key={i}/>
                        );
                    })
                }
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);