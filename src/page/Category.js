import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import Activity from '../com/Activity';
import {Cards} from '../test-data/Cards';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        width: 'inherit',
        padding: theme.spacing.unit,
    },
    text: {
        color: '#ef33ef',
        margin: theme.spacing.unit,
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
    cards: {
        margin: `${theme.spacing.unit}px 0`,
        flexWrap: 'wrap',
        display: 'flex'
    },
    card: {
        flexGrow: 1,
    }
});

class Category extends Component {
    constructor(props) {
        super(props);
        this.state ={
            data: [],
        }
    }

    render() {
        const {classes, match} = this.props;

        const data = Cards.filter(x => x.icon === match.params.sort);
        console.log(data);
        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.cards}>
                        {data.map(x => {
                            return (<Activity card={x} key={x.id} className={classes.card}/>)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

Category.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
