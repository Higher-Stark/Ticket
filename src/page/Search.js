import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CalendarToday from 'mdi-material-ui/CalendarToday';
import PlaceIcon from '@material-ui/icons/Place';
import KeyBoardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyBoardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import {Cards} from '../test-data/Cards';

const itemStyles = theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            height: 120,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 320,
        },
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        display: 'flex',
    },
    title: {
        margin: theme.spacing.unit,
    },
    image: {
        [theme.breakpoints.down('sm')]:{
            maxWidth: 60,
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: 240,
        },
        height: 'inherit',
    },
    pic: {
        width: '15%',
        padding: theme.spacing.unit,
        overflow: 'hidden',
    }
});

class ActivityItem extends Component {
    render() {
        const {classes, data} = this.props;

        return (
            <div>
                <Grid spacing={8} container>
                    {
                        data.map(s => {
                            return (
                                <Grid container spacing={8} className={classes.root} key={s.id}>
                                    <Grid item xs={2} className={classes.pic}>
                                        <img src={s.images.s3_4} className={classes.image} alt={s.title}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div>
                                            <Typography variant='title' component='h2' color='primary' className={classes.title}>
                                                {`[${s.city}] ${s.title}`}
                                            </Typography>
                                            <Typography variant='subheading' color='secondary'>
                                                {s.brief}
                                            </Typography>
                                            <Typography variant='body1' component='p'>
                                                <CalendarToday/>{s.dates.length === 1 ? s.dates[0] : `${s.dates[0]} - ${s.dates[s.dates.length - 1]}`}
                                            </Typography>
                                            <Typography variant='body1' component='p'>
                                                <PlaceIcon/>{s.location}{' - '}{s.city}
                                            </Typography>
                                            <Typography variant='headline' color='primary'>
                                                {s.price}{' '}{s.status}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }
}

ActivityItem.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

const ActivityWithStyle = withStyles(itemStyles)(ActivityItem);

const styles = theme => ({
    root: {
        display: 'flex',
    },
    category: {
        display: 'inline-block',
        flexGrow: 1,
    },
    textSelect : {
        display: 'inline-block',
        flexGrow: 1,
        margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        '&:hover': {
            background: '#3e072e',
        },
        '&:active': {
            background: '#cccc44',
        },
    },
    content: {
        display: 'flex',
    },
    appBar: {
        marginBottom: theme.spacing.unit,
    },
});

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 0,
            value: 0,
            data: [],
            filter: [],
        };
    };

    componentDidMount() {
        const {search} = this.props.location;
        console.log(search);
        /*
        fetch (`/search?q=${search}`, {
            method: 'GET',
        })
            .then(response => {
                if (response.status !== 200) throw Error("Error encountered");
                return response.json();
            })
            .then(data => {
                this.setState({data: data});
            })
            .catch(e => alert(e.message));
        */
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        const cities = ['All', 'Beijing', 'Shanghai', 'Ningbo', 'Shengzheng', 'New York', 'Manhattan', 'California',
            'Munich', 'Berlin', 'London', 'Hongkong', 'Sydney'
        ];


        return(
            <div>
                <Grid container spacing={8} className={classes.root}>
                    <Grid item xs={12} className={classes.root}>
                        <Grid item xs={1} className={classes.category}>
                            <Typography variant='headline' component='h3'>
                                {'City'}
                            </Typography>
                        </Grid>
                        <Grid item xs={11} className={classes.category}>
                            {cities.map((s, i) => {
                                return <Typography variant='button' className={classes.textSelect} key={i}>{s}</Typography>
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                <div>
                    <AppBar position='static' >
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label={'By Relevance'}/>
                            <Tab label={'By heat'}/>
                            <Tab label={'By Date'}/>
                        </Tabs>
                    </AppBar>
                    <ActivityWithStyle data={Cards}/>
                </div>
                <div>
                    <IconButton>
                    <KeyBoardArrowLeft/>
                    </IconButton>
                    {'1 2 3 4'}
                    <IconButton>
                    <KeyBoardArrowRight/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
