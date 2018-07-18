import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CalendarToday from 'mdi-material-ui/CalendarToday';
import PlaceIcon from '@material-ui/icons/Place';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import PageBar from '../com/PageBar';
import {data} from '../test-data/data';

const itemStyles = theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            height: 80,
        },
        [theme.breakpoints.up('sm')]: {
            height: 200,
        },
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
    },
    title: {
        margin: theme.spacing.unit,
    },
    image: {
        /*
        [theme.breakpoints.down('sm')]:{
            maxWidth: 60,
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: 240,
        },
        [theme.breakpoints.down('sm')]: {
            maxHeight: 120,
        },
        [theme.breakpoints.up('sm')]: {
            maxHeight: 320,
        },
        */
        maxHeight: '100%',
        maxWidth: '100%',
        padding: 'auto auto',
    },
    pic: {
        display: 'flex',
        width: 'inherit',
        height: 'inherit',
        padding: theme.spacing.unit,
        overflow: 'hidden',
        justifyContent: 'right',
        alignItems: 'center',
    }
});

class ActivityItem extends Component {

    locale(date){
        const pattern = /^(\d+)(-|\/)0?(\d+)(-|\/)0?(\d+)$/;
        let res = date.replace(pattern, (match, year, sep1, month, spe2, day, offset, string) => `${year}年${month}月${day}日`)
        return res;
    }

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
                                        <img src={s.image} className={classes.image} alt={s.title}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div>
                                            <Typography variant='title' component='h2' color='primary' className={classes.title} gutterBottom>
                                                {`${s.city} | ${s.title}`}
                                            </Typography>
                                            <Typography variant='subheading' color='textSecondary' gutterBottom>
                                                {s.intro}
                                            </Typography>
                                            <Typography variant='body1' component='p'>
                                                <CalendarToday/>{s.startDate === s.endDate ? this.locale(s.startDate) : `${this.locale(s.startDate)} - ${this.locale(s.endDate)}`}{' | '}{s.time}
                                            </Typography>
                                            <Typography variant='body1' component='p'>
                                                <PlaceIcon/>{s.venue}{' - '}{s.city}
                                            </Typography>
                                            <Typography variant='subheading' color='primary'>
                                                {s.lowprice === s.highprice ? `¥ ${s.lowprice}` : `¥ ${s.lowprice} - ${s.highprice}`}
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
            background: indigo[400],
        },
    },
    selected: {
        background: blue[500],
    },
    nonselected: {
        background: blue[100],
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
            selected: {
                city: 0,
                type: 0,
            },
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

    handleClick = (e, name, value) => {
        const {selected} = this.state;
        selected[name] = value;
        this.setState({
            selected: selected,
        });
    };

    render() {
        const {classes} = this.props;
        const {value, selected} = this.state;

        const cities = ['All', 'Beijing', 'Shanghai', 'Ningbo', 'Shengzheng', 'New York', 'Manhattan', 'California',
            'Munich', 'Berlin', 'London', 'Hongkong', 'Sydney'
        ];
        const types = ['All', '演唱会', '体育赛事', '亲子', '展览', '动漫', '音乐会'];


        return(
            <div>
                <Grid container spacing={8} className={classes.root}>
                    <Grid item xs={12} className={classes.root}>
                        <Grid item xs={1} className={classes.category}>
                            <Typography variant='headline' component='h3' color='error'>
                                {'City'}
                            </Typography>
                        </Grid>
                        <Grid item xs={11} className={classes.category}>
                            {cities.map((s, i) => {
                                return <Typography variant='button'
                                                   className={classNames(classes.textSelect, i === selected.city ? classes.selected : classes.nonselected)}
                                                   key={i} component={Button} size='small'
                                                    onClick={(e) => this.handleClick(e, 'city', i)}
                                >
                                    {s}
                                </Typography>
                            })}
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} className={classes.root}>
                        <Grid item xs={1} className={classes.category}>
                            <Typography variant='headline' component='h3' color='error'>
                                {'类别'}
                            </Typography>
                        </Grid>
                        <Grid item xs={11} className={classes.category}>
                            {
                                types.map((s, i) => {
                                    return <Typography variant='button' key={i} component={Button} size='small'
                                                       onClick={e => this.handleClick(e, 'type', i)}
                                                       className={classNames(classes.textSelect, i === selected.type ? classes.selected : classes.nonselected)}
                                                       >
                                            {s}
                                    </Typography>
                                })
                            }
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>
                <div>
                    <AppBar position='static' >
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label={'By Relevance'}/>
                            <Tab label={'By heat'}/>
                            <Tab label={'By Date'}/>
                        </Tabs>
                    </AppBar>
                    <ActivityWithStyle data={data.content}/>
                </div>
                <div>
                    <PageBar current={3} max={7} goto={(i) => console.log(i)}/>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
