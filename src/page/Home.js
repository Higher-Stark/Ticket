import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from '../com/Activity';
import {Cards} from '../test-data/Cards';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        overflow: 'hidden',
        width: 'inherit',
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        [theme.breakpoints.up('xl')]: {
            width: 1760,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1056,
        },
        [theme.breakpoints.up('md')]: {
            width: 704,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        margin: '0 auto',
    },
    card: {
        flexGrow: 1,
    }
});

class Home extends Component {
    /*
    constructor(props) {
        super(props);
    }
    */

    componentDidMount() {
        console.log(this.props.width);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div id='content' className={classes.content}>
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