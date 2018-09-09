import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';
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
import {locale, urlEncode} from '../util/utils';

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
        display: 'block',
        maxWidth: '100%',
    },
    info: {
        maxWidth: '100%',
        padding: theme.spacing.unit,
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
        // padding: `0 ${theme.spacing.unit * 2}px`,
    },
    buttonIcon: {
        // flexGrow: 1,
        margin: `${theme.spacing.unit}px ${theme.spacing.unit}px`,
    },
    action: {
        display: 'block',
        // flexGrow: 'row wrap',
        // justifyContent: 'space-between',
    },
    grid: {
        display: 'flex',
    },
    subgrid: {
        flexGrow: 1,
    },
    inline: {
        display: 'inline-block',
    },
});

class DetailModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            like: false,
            delete: false,
            selectedDate: -1,
            seats: new Map([]),
            selectedPrice: -1,
            quantity: 0,
        };
    }

    togglePrice = (key) => {
        console.log(key);
        const {selectedPrice, quantity} = this.state;
        if (key === selectedPrice) {
            this.setState({
                quantity: quantity + 1,
            });
        }
        else {
            this.setState({
                selectedPrice: key,
                quantity: 1,
            });
        }
    };

    toggleCart = () => {
        const {selectedDate, selectedPrice, quantity} = this.state;
        if (selectedDate === -1 || selectedPrice === -1)
        {
            alert("You haven't selected any time or price");
            return;
        }
        const dates = this.props.card.dates.split(" , ");
        const price = selectedPrice === 0 ? this.props.card.lowprice : this.props.card.highprice;
        let storage = window.localStorage;
        let user = JSON.parse(storage.getItem("user"));
        if (user === null)
        {
            alert("请登录");
            this.props.history.push({
                pathname: '/signin',
            });
            return;
        }
        let body = {
            token: user.token,
            ticketid: this.props.card.id,
            date: dates[selectedDate],
            price: price,
            number: quantity,
        };
        const url = "http://pipipan.cn:30007/Cart/SaveInDetailPage";
        fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: urlEncode(body),
            credentials: "include",
        })
            .then(response => response.headers)
            .then(headers => {
                let errornum=headers.get('errornum');
                if(errornum==='0')
                {
                    alert("成功！");
                    return ;
                }
                else if(errornum==='1')
                {
                    alert("尚未登录！");
                }
                else if(errornum==='2')
                {
                    alert("身份不对应！");
                }
                else if(errornum==='3')
                {
                    alert("账户被冻结！");
                }
                this.props.history.push('/signin');
            })
    };

    toggleBuy = (id) => {
        const {selectedDate, selectedPrice, quantity} = this.state;
        if (selectedDate === -1 || selectedPrice === -1) {
            alert("You haven't selected any time or price");
            return;
        }
        let storage = window.localStorage;
        let user = JSON.parse(storage.getItem("user"));
        if (user === null)
        {
            alert("请登录");
            this.props.history.push({
                pathname: '/signin',
            });
            return;
        }

        const dates = this.props.card.dates.split(" , ");
        const price = selectedPrice === 0 ? this.props.card.lowprice : this.props.card.highprice;
        let tickets = [
            {
                id: this.props.card.id,
                date: dates[selectedDate],
                price: price,
                number: quantity
            }
        ];

        storage.setItem("orderConfirmTickets",JSON.stringify(tickets));
        storage.setItem("orderType","orderInDetailPage")
        this.props.history.push({
            pathname: '/orderconfirm',
        });
    };

    toggleMore = () => this.setState({open: ! this.state.open});

    checkTime(stime) {
        let date = new Date(stime);
        let now = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let day = date.getDate();
        let nmonth = now.getMonth();
        let nyear = now.getFullYear();
        let nday = now.getDate();
        if (year > nyear) {
            return false;
        } else if (year === nyear && month > nmonth) {
            return false;
        } else if (month === nmonth && day > nday) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const {classes, card} = this.props;
        const {selectedDate, selectedPrice, quantity} = this.state;

        return (
            <div style={{top: '50%', left: '50%', transform: `translate(-50%, -50%)`}} className={classes.paper}>
                <div className={classes.modal}>
                    <img src={card.image} alt={card.title} className={classes.image}/>
                </div>
                <div className={classes.paper2}>
                    <div className={classes.info}>
                    <Typography variant='title' component='h2' color='primary' gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        <PlaceIcon/>
                        {'['}{card.city}{'] '}{card.venue}
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
                                <Grid item className={classNames(classes.subgrid, classes.inline)}>
                                    <CalendarToday/>
                                </Grid>
                                <Grid item className={classes.subgrid}>
                                    {card.dates.split(" , ").map((s, i) => {
                                        //const {dates} = this.state;
                                        // dates.push(false);
                                        return (
                                            <Button variant={i === selectedDate ? "contained" : "outlined"}
                                                    onClick={() => {
                                                        this.setState({selectedDate: selectedDate === i ? -1 : i});
                                                    }}
                                                    color='primary'
                                                    className={classes.date}
                                                    disabled={this.checkTime(s)}
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
                        <Typography color='primary' variant='subheading' component='h3' className={classes.inline}>
                            {'选择票价: '}
                        </Typography>
                        <Badge badgeContent={selectedPrice === 0 ? quantity : 0}
                               key={0} className={classes.badge} color='primary'
                        >
                            <Button variant='contained' key={0} onClick={() => this.togglePrice(0)}>
                                {card.lowprice}
                            </Button>
                        </Badge>
                        <Badge badgeContent={selectedPrice === 1 ? quantity : 0}
                               key={1} className={classes.badge} color='primary'
                        >
                            <Button variant='contained' key={1} onClick={() => this.togglePrice(1)}>
                                {card.highprice}
                            </Button>
                        </Badge>
                        <Typography variant='subheading' component='h3' gutterBottom color='primary'>
                            {'库存: '}
                            <Typography variant='body1' component='p' color='textSecondary'
                                        className={classes.inline}>
                                { card.stock}
                            </Typography>
                        </Typography>
                    </div>
                    </div>
                    <div className={classes.action}>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={() => this.toggleCart(card.id)}>
                            <CartPlusIcon/>
                            Add
                        </Button>
                        <Button variant='extendedFab' color='primary' className={classes.buttonIcon} onClick={()=>this.toggleBuy(card.id)}>
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

// component={NavLink} to="/order"
export default withRouter(withStyles(styles)(DetailModal));