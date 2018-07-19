import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarToday from 'mdi-material-ui/CalendarToday';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import MoreVert from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CartPlusIcon from 'mdi-material-ui/CartPlus';
import ShoppingIcon from 'mdi-material-ui/Shopping';
import locale from '../util/locale';

const styles = theme => ({
    paper: {
        position: 'absolute',
        [theme.breakpoints.up('lg')]: {
            width: 480,
        },
        [theme.breakpoints.down('lg')]: {
            maxWidth: '60%',
        },
        maxHeight: '90%',
        display: 'block',
        overflow: 'scroll',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadow[5],
    },
    paper2: {
        width: 'inherit',
        padding: theme.spacing.unit * 3,
    },
    modal: {
        // height: 0,
        // paddingTop: '56.25%',    // 16:9
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        width: 'inherit',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        margin: 'auto auto',
    },
    table: {
        width: '100%',
    },
    date: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    badge: {
        margin: theme.spacing.unit,
    },
    buttonIcon: {
        flexGrow: 1,
        margin: `${theme.spacing.unit}px ${theme.spacing.unit}px`,
    },
    action: {
        display: 'flex',
        // flexGrow: 'row wrap',
        // justifyContent: 'space-between',
    },
    grid: {
        display: 'flex',
    },
    subgrid: {
        flexGrow: 1,
    },
});

class DetailModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            like: false,
            delete: false,
            dates: [],
            seats: new Map([]),
        };
    }

    toggleCart = (id) => {
        /*
         * fetch ("/add_to_cart?id="+id
         */
        fetch ('/add_to_cart?id='+id, {method: "GET", credentials: "include"})
            .then(response => {
                if (response.status !== 200) throw new Error("Add to Cart failed!");
                else alert("Add to cart succeed");
            })
            .catch(e => console.log(e));
    };

    toggleBuy = (id) => {
        fetch("/buy?id="+id, {method: "GET", credentials: "include"})
            .then(response => {
                if (response.status !== 200) throw new Error("Buy failed");
                else alert("Add to cart succeed");
            })
            .catch(e => console.log(e));
    };

    toggleMore = () => this.setState({open: ! this.state.open});

    render() {
        const {classes, card} = this.props;
        return (
            <div style={{top: '50%', left: '50%', transform: `translate(-50%, -50%)`}} className={classes.paper}>
                <div className={classes.modal}>
                    <img src={card.image} alt={card.title} className={classes.image}/>
                </div>
                <div className={classes.paper2}>
                    <Typography variant='title' component='h2' color='primary' gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        {card.city}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        <PlaceIcon/>
                        {card.venue}
                    </Typography>
                    <Typography variant='body1' component='p' color='textSecondary'>
                        Introduction
                        <IconButton onClick={this.toggleMore}>
                            <MoreVert/>
                        </IconButton>
                    </Typography>
                    <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                        <Typography variant='body1' component='p'>
                            {card.intro}
                        </Typography>
                    </Collapse>
                    <div>
                        <Grid container>
                            <Grid item xs={12} className={classes.grid}>
                                <Grid item className={classes.subgrid}>
                                    <CalendarToday/>{'Date: '}
                                </Grid>
                                <Grid item className={classes.subgrid}>
                                    {card.dates.split(" , ").map((s, i) => {
                                        const {dates} = this.state;
                                        dates.push(false);
                                        return (
                                            <Button variant={dates[i] ? "contained" : "outlined"}
                                                    onClick={() => {
                                                        dates[i] = !dates[i];
                                                        this.setState({dates: dates});
                                                    }}
                                                    color='primary'
                                                    className={classes.date}
                                                    key={i}
                                                    disableRipple
                                            >
                                                {locale(s) + ' | ' + card.time}
                                            </Button>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Badge badgeContent={0} key={card.lowprice} className={classes.badge}>
                            <Typography variant='body1'>{card.lowprice}</Typography>
                        </Badge>
                        <Badge badgeContent={0} key={card.highprice} className={classes.badge}>
                            <Typography variant='body1'>{card.highprice}</Typography>
                        </Badge>
                    </div>
                    <div className={classes.action}>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={() => this.toggleCart(card.id)}>
                            <CartPlusIcon/>
                            Add
                        </Button>
                        <Button variant='extendedFab' color='primary' className={classes.buttonIcon} onClick={() => this.toggleBuy(card.id)}>
                            <ShoppingIcon/>
                            Pay
                        </Button>
                    </div>
                    {
                        /*
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seat</TableCell>
                                {card.seats.map(s => {
                                    return (
                                        <TableCell key={s.class} numeric>
                                            {s.class}{' '}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Seat Remain</TableCell>
                                {card.seats.map((s, i) => {
                                    return (<TableCell key={i} numeric>{s.remain}</TableCell>);
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell>Price</TableCell>
                                {card.seats.map((s, i) => {
                                    return (
                                        <TableCell key={i} numeric>{s.price}</TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className={classes.section3}>
                        {'Selected Seats: '}
                        {
                            card.seats.map((s, i)=> {
                                const {seats} = this.state;
                                return (
                                    <Badge key={i} badgeContent={seats.get(s.class) || 0 } className={classes.badge} color='secondary'>
                                        <Button variant='contained' onClick={() => {
                                            seats.set(s.class, seats.get(s.class) + 1 || 1);
                                            this.setState({seats: seats});
                                        }}>
                                            {s.class}
                                            </Button>
                                    </Badge>
                                );
                            })
                        }
                    </div>
                    <div>
                        {
                            this.state.seats.length > 0 ? (
                                <div>
                                    <Typography variant='body1' > Selected Seats: </Typography>
                                    {
                                        this.state.seats.forEach((value, key) => {
                                            return (
                                                <Badge badgeContent={value} key={key} className={classes.badge}>
                                                    <Typography variant='body1'>{key}</Typography>
                                                </Badge>
                                            )
                                        })
                                    }
                                </div>
                            ) : null
                        }
                    </div>
                    <div className={classes.action}>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={() => this.toggleCart(card.id)}>
                            <CartPlusIcon/>
                            Add
                        </Button>
                        <Button variant='extendedFab' color='primary' className={classes.buttonIcon} onClick={() => this.toggleBuy(card.id)}>
                            <ShoppingIcon/>
                            Pay
                        </Button>
                    </div>

                         */
                    }
                </div>
            </div>
        )
    }
}

DetailModal.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailModal);