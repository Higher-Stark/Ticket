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
import {locale} from '../util/utils';

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


    detail = (id) => {
        this.props.history.push("/detail/"+id)
    };

    render() {
        const {classes, data} = this.props;
        return (
            <div>
                <Grid spacing={8} container>
                    {
                        data.map(s => {
                            return (
                                <Grid container spacing={8} className={classes.root} key={s.id} onClick={() => this.detail(s.id)}>
                                    <Grid item xs={2} className={classes.pic}>
                                        <img src={s.image} className={classes.image} alt={s.title}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div>
                                            <Typography variant='title' component='h2' color='primary'
                                                        className={classes.title} gutterBottom>
                                                {`${s.city} | ${s.title}`}
                                            </Typography>
                                            <Typography variant='subheading' color='textSecondary' gutterBottom>
                                                {s.intro}
                                            </Typography>
                                            <Typography variant='body1' component='p'>
                                                <CalendarToday/>{s.startDate === s.endDate ? locale(s.startDate) : `${locale(s.startDate)} - ${locale(s.endDate)}`}{' | '}{s.time}
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
    textSelect: {
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
    url = "http://pipipan.cn:30005/Ticket/QueryByCityAndTypePage";

    cities = ['all','上海', '北京', '厦门','天津','广州','成都','杭州','武汉','深圳','福州','苏州','重庆','宁波', '深圳', '香港','温州','长沙',
    ];

    types = ['all','concert','vocal concert', 'opera', 'sports','dancing', 'parenting', 'acrobatics'];

    constructor(props) {
        super(props);
        this.state = {
            search: null,
            page: 1,
            totalPages : 0,
            value: 0,
            data: [],
            selected: {
                city: 0,
                type: 0,
            },
        };
    };

    componentWillMount() {
        const {page, selected} = this.state;
        let city = this.cities[selected['city']];
        let type = this.types[selected['type']];
        fetch(this.url + `?pagenumber=${page}&city=${city}&type=${type}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: data.content,
                    totalPages:data.totalPages
                });
            })
            .catch(e => console.log(e));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {match} = nextProps;
        this.setState({
            search: match.params.search,
            page: 1,
        })
    }

    viewPage = (idx) => {
        const {selected} = this.state;
        let city = this.cities[selected['city']];
        let type = this.types[selected['type']];
        fetch(this.url + `?pagenumber=${idx}&city=${city}&type=${type}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error");
                this.setState({
                    data: data.content,
                    page: idx,
                    totalPages:data.totalPages
                });
            })
            .catch(e => console.log(e));
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleClick = (e, name, value) => {
        const {page, selected} = this.state;
        selected[name] = value;
        this.setState({
            selected: selected,
            page:1,
        });
        let city = this.cities[selected['city']];
        let type = this.types[selected['type']];
        fetch(this.url + `?pagenumber=${page}&city=${city}&type=${type}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: data.content,
                    totalPages:data.totalPages
                });
            })
            .catch(e => console.log(e));
    };

    render() {
        const {classes} = this.props;
        const {value, selected, page, data} = this.state;

        return (
            <div>
                <Grid container spacing={8} className={classes.root}>
                    <Grid item xs={12} className={classes.root}>
                        <Grid item xs={1} className={classes.category}>
                            <Typography variant='headline' component='h3' color='error'>
                                {'City'}
                            </Typography>
                        </Grid>
                        <Grid item xs={11} className={classes.category}>
                            {this.cities.map((s, i) => {
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
                                this.types.map((s, i) => {
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
                    <AppBar position='static'>
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label={'By Relevance'}/>
                            <Tab label={'By heat'}/>
                            <Tab label={'By Date'}/>
                        </Tabs>
                    </AppBar>
                    <ActivityWithStyle data={data} history={this.props.history}/>
                </div>
                <div>
                    <PageBar current={page} max={this.state.totalPages} goto={this.viewPage}/>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);