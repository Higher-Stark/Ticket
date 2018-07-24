import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import ChevronLeft from 'mdi-material-ui/ChevronLeft';

const styles = theme => ({
    root: {
        display: 'block',
        width: 'inherit',
        justifyContent: 'center',
        margin: theme.spacing.unit,
    },
    icon: {
        display: 'inline-block',
        margin: theme.spacing.unit,
    },
    digit: {
        display: 'inline-block',
        margin: theme.spacing.unit,
        '&:hover': {
            background: '#9575CD',
        },
        '&:active': {
            color: '#FF1744',
        },
    },
    active: {
        display: 'inline-block',
        margin: theme.spacing.unit,
        background: '#FF1744',
    },
    numbers: {
        display: 'inline-block',
        overflow: 'ellipsis',
    },
});

class PageBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
        }
    }

    sequence = (current, max) => {
        let floor = current - 2;
        let ceil = current + 2;
        if (floor < 1) {
            floor = 1;
            ceil = floor + 4;
        }
        if (ceil > max) {
            ceil = max;
            floor = max - 4 > 0 ? max - 4 :1;
        }
        if (floor === 2) floor = 1;
        if (ceil + 1 === max) ceil = max;
        const sequence = Array.from(new Array(ceil - floor + 1), (val, index) => index + floor);
        if (floor > 1) sequence.unshift(1, '...');
        if (ceil < max) sequence.push('...', max);
        return sequence;
    };

    render() {
        const {classes, max, current, goto} = this.props;
        const array = this.sequence(current, max);

        return (
            <div className={classes.root}>
                <div className={classes.icon}>
                    <IconButton color='primary' onClick={() => goto(current - 1)} disabled={current === 1}>
                        <ChevronLeft/>
                    </IconButton>
                </div>
                <div className={classes.numbers}>
                    {
                        array.map((s, i) => {
                            return (
                                Number.isInteger(s) ?
                                    <Typography variant='button' component={IconButton}
                                                className={s === current ? classes.active : classes.digit}
                                                onClick={() => (s === current ? null : goto(s))}
                                                key={i}
                                    >
                                        {s}
                                    </Typography>
                                    :
                                    <Typography variant='body1' component='p' className={classes.icon} key={i}>
                                        {s}
                                    </Typography>
                            )
                        })
                    }
                </div>
                <div className={classes.icon}>
                    <IconButton color='primary' onClick={() => goto(current + 1)} disabled={current === max}>
                        <ChevronRight/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

PageBar.propTypes = {
    classes : PropTypes.object.isRequired,
    max: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    goto: PropTypes.func.isRequired,
};

export default withStyles(styles)(PageBar);