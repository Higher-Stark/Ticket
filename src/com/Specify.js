import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {data} from '../test-data/data';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    post: {
        // maxWidth : '100%',
        maxHeight: '100%',
        overflow: 'hidden',
    },
    date: {
        margin: theme.spacing.unit,
    },
    grid: {
        display: 'flex',
        flexGrow: 1,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    container: {
        alignContent: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    imgGrid: {
        flexGrow: 1,
        margin: theme.spacing.unit,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing.unit,
    },
});

class Specify extends Component{
    url = {
        detail: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            detail: null,
            dates: [],
            prices: [],
        };
    }

    componentDidMount() {
        const {id} = this.props.location;
        fetch(this.url.detail + `?id=${id}`, {
            method: 'GET',
            credentials: "include",
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else throw Error("Get detail failed");
            })
            .then(data => this.setState({detail: data}))
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        //const {detail} = this.state;
        const detail = data.content[0];

        return (
            <div className={classes.root}>
                <Grid container spacing={8} className={classes.grid}>
                    <Grid item xs={12} className={classes.grid}>
                        <Grid item xs={3} className={classes.imgGrid}>
                            <Grid container className={classes.container}>
                            <img src={detail.image} alt={detail.title} className={classes.post}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} className={classes.content}>
                            <div>
                                <Typography variant='title' component='h2' gutterBottom color='primary'>
                                    {detail.title}
                                </Typography>
                                <Typography variant='subheading' component='h3' gutterBottom color='secondary'>
                                    {detail.city}{' | '}{detail.venue}
                                </Typography>
                                <Typography variant='body1' component='p' gutterBottom color='secondary'>
                                    {'Date'}
                                </Typography>
                                <div>
                                    {detail.dates.split(',').map((s, i) =>{
                                        const {dates} = this.state;
                                        dates.push(false);
                                        return (
                                            <Button variant={this.state.dates[i] ? "contained" : "outlined"}
                                                    onClick={() => {
                                                        const {dates} = this.state;
                                                        dates[i] = !dates[i];
                                                        this.setState({dates: dates})
                                                    }}
                                                    color='primary'
                                                    className={classes.date}
                                                    key={i}
                                            >
                                                {s}
                                            </Button>
                                        )
                                    })}
                                </div>
                                <div>
                                    <Typography variant='body1' component='p'>{"票价： "}{detail.lowprice}{' - '}{detail.highprice}</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                        <Grid item xs={8} className={classes.content}>
                            <Typography variant='title' component='h2' color='primary'>{'注意事项'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Specify.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Specify);