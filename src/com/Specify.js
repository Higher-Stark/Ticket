import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CartPlusIcon from 'mdi-material-ui/CartPlus';
import ShoppingIcon from 'mdi-material-ui/Shopping';
import {urlEncode} from '../util/utils';
import {locale} from '../util/utils';

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
    selectButton: {
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
    inline: {
        display: 'inline-block',
    },
    textField: {
        margin: `0 ${theme.spacing.unit}px`,
        width: 60,
    },
    action: {
        display: 'block',
        margin: theme.spacing.unit,
        justifyContent: 'center',
    },
    buttonIcon: {
        margin: `0 ${theme.spacing.unit}px`,
        padding: `0 ${theme.spacing.unit}px`,
    },
    loading: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    loadingBar: {
        flexGrow: 1,
        width: 'inherit',
    },
});

class Specify extends Component {
    url = {
        detail: 'http://pipipan.cn:30005/Ticket/QueryById',
    };

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            detail: null,
            dates: [],
            prices: [],
            price: 0,
            date: null,
            quantity: 0,
        };
    }

    componentDidMount() {
        const {match} = this.props;
        const id = match.params.id;
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

    selectPrice = (selectedPrice) => {
        const {price} = this.state;
        this.setState({
            price: price === selectedPrice ? 0 : selectedPrice,
        });
    };

    selectDate = (selectedDate) => {
        const {date} = this.state;
        if (selectedDate === date)
            this.setState({
                date: null,
                quantity: 1,
            });
        else
            this.setState({
                date: selectedDate,
                quantity: 1
            })
    };

    toggleCart = () => {
        const {detail, price, date, quantity} = this.state;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let body = {
            token: user===null?'':user.token,
            ticketid: detail.id,
            price: price,
            date: date,
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

    handleChange = (e) => {
        if (e.target.value < 1)
            return;
        this.setState({
            quantity: e.target.value,
        });
    };

    render() {
        const {classes} = this.props;
        const {detail, price, date, quantity} = this.state;

        return (
            detail === null ? (
                    <div className={classes.loading}>
                        <LinearProgress color='secondary' className={classes.loadingBar}/>
                    </div>
                ) :
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
                                    <Typography variant='subheading' component='h3' gutterBottom color='textSecondary'>
                                        {detail.city}{' | '}{detail.venue}
                                    </Typography>
                                    <Typography variant='subheading' component='h3' gutterBottom color='secondary'>
                                        {'日期 '}
                                        <Typography variant='body1' component='p' color='textSecondary'
                                                    className={classes.inline}>
                                            {`${locale(detail.startDate)} - ${locale(detail.endDate)}  ${detail.time}`}
                                        </Typography>
                                    </Typography>
                                    <div>
                                        <Typography component='h3' variant='subheading' color='primary'
                                                    className={classes.inline}>{'演出时间: '}</Typography>
                                        {
                                            detail.dates.split(' , ').map((s, i) => {
                                                return (
                                                    <Button variant={s === date ? "contained" : "outlined"}
                                                            onClick={() => this.selectDate(s)}
                                                            color='primary'
                                                            className={classes.selectButton}
                                                            key={i}
                                                    >
                                                        {locale(s)}{' '}{detail.time}
                                                    </Button>
                                                )
                                            })}
                                    </div>
                                    <div>
                                        <Typography variant='subheading' component='h3' color='primary'
                                                    className={classes.inline}>{"票价选择： "}</Typography>
                                        <Button variant={price === detail.lowprice ? "contained" : "outlined"}
                                                onClick={() => this.selectPrice(detail.lowprice)}
                                                color='primary'
                                                className={classes.selectButton}
                                        >
                                            {detail.lowprice}
                                        </Button>
                                        <Button variant={price === detail.highprice ? "contained" : "outlined"}
                                                onClick={() => this.selectPrice(detail.highprice)}
                                                color='primary'
                                                className={classes.selectButton}
                                        >
                                            {detail.highprice}
                                        </Button>
                                    </div>
                                    {
                                        date === null || price === 0 ? null : (
                                            <div>
                                                <TextField id='quantity' type='number' label='数量' margin='normal'
                                                           value={quantity} onChange={this.handleChange}/>
                                            </div>
                                        )
                                    }
                                    <div className={classes.action}>
                                        <Button variant='extendedFab'
                                                color='secondary'
                                                className={classes.buttonIcon}
                                                onClick={() => this.toggleCart()}
                                                disabled={date === null || price === 0}
                                        >
                                            <CartPlusIcon/>
                                            Add
                                        </Button>
                                        <Button variant='extendedFab'
                                                color='primary'
                                                className={classes.buttonIcon}
                                                onClick={() => this.toggleBuy()}
                                                disabled={date === null || price === 0}
                                        >
                                            <ShoppingIcon/>
                                            Pay
                                        </Button>
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