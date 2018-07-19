import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CalendarToday from 'mdi-material-ui/CalendarToday';
import PlaceIcon from '@material-ui/icons/Place';
import Toolbar from '@material-ui/core/Toolbar';


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
        [theme.breakpoints.down('sm')]: {
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
    },
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
                                    <Grid item xs={2}>
                                        <div>
                                            <Typography variant='title' component='h2' color='primary'
                                                        className={classes.title}>
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
                                    <Grid item xs={2}>
                                        <div>
                                            <Typography variant='headline' align='center' style={{paddingTop: '50%'}}>
                                                ￥{s.price}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div>
                                            <Typography variant='headline' align='center' style={{paddingTop: '50%'}}>
                                                <Button color="inherit" size='large'>-</Button>{s.quantity}<Button
                                                color="inherit" size='large'>+</Button>
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div>
                                            <Typography variant='headline' align='center' style={{paddingTop: '50%'}}>
                                                ￥{s.price * s.quantity}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div>
                                            <Typography variant='headline' align='center' style={{paddingTop: '50%'}}>
                                                <Button color="inherit" size='large'>删除</Button>
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
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});

class Cart extends Component {
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

        let total=0;

        Cards.map(s => {total+=s.price*s.quantity;return null});

        return (
            <div>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Grid item xs={4}>
                                <Typography variant="title" color="inherit" align='center' className={classes.flex}>
                                    商品信息
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit" align='center' className={classes.flex}>
                                    单价
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit" align='center' className={classes.flex}>
                                    数量
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit" align='center' className={classes.flex}>
                                    金额
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit" align='center'
                                            className={classes.menuButton}>
                                    操作
                                </Typography>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <ActivityWithStyle data={Cards}/>
                    <AppBar position="static">
                        <Toolbar>
                            <Grid item xs={8}>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit" className={classes.flex} align='center'>
                                    合计：￥{total}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit" className={classes.flex} align='center'>
                                    <Button color="inherit" size='large'>结算</Button>
                                </Typography>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )
    }
}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
