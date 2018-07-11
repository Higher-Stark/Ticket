import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarToday from 'mdi-material-ui/CalendarToday';
import Collapse from '@material-ui/core/Collapse';
import MoreVert from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import CartPlusIcon from 'mdi-material-ui/CartPlus';
import ShoppingIcon from 'mdi-material-ui/Shopping';

const styles = theme => ({
    paper: {
        position: 'absolute',
        minWidth: 360,
        maxWidth: 720,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadow[5],
    },
    paper2: {
        padding: theme.spacing.unit * 3,
    },
    modal: {
        overflow: 'hidden',
    },
    image: {
        width: '100%',
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
        margin: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    },
    action: {
        display: 'flex',
        flexGrow: 'row wrap',
        justifyContent: 'end',
    },
    section3: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
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
                if (response.status !== 200) throw {msg: "Add to Cart failed!"};
                else alert("Add to cart succeed");
            })
            .catch(e => console.log(e));
    };

    toggleBuy = (id) => {
        fetch("/buy?id="+id, {method: "GET", credentials: "include"})
            .then(response => {
                if (response.status !== 200) throw {msg: "Buy failed"};
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
                    <img src={card.src} alt={card.title} className={classes.image}/>
                </div>
                <div className={classes.paper2}>
                    <Typography variant='title' component='h2' color='primary' gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        {card.subtitle}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        <PlaceIcon/>
                        {card.location}
                    </Typography>
                    <Typography variant='title' component='h2'>
                        Introduction
                        <IconButton onClick={this.toggleMore}>
                            <MoreVert/>
                        </IconButton>
                    </Typography>
                    <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                        <Typography variant='body1' component='p'>
                            {card.brief}
                        </Typography>
                    </Collapse>
                    <div>
                        <CalendarToday/>{'Date: '}
                            {card.dates.map((s, i) => {
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
                                        {s}
                                    </Button>
                                )
                            })}
                    </div>
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