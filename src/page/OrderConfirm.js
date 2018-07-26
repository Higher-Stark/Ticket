import React, {Component} from 'react';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import {withStyles,} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PaymentIcon from '@material-ui/icons/Payment';
import {withRouter} from 'react-router-dom';

function createData(title, number, price) {
    return {title, number, price};
}


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 800,
    },
    headline: {
        color: pink[300],
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    palette: {
        primary: {
            light: '#6f74dd',
            main: indigo[600],
            dark: '#00227b',
        },
        secondary: {
            light: '#ff844c',
            main: deepOrange[600],
            dark: '#b91400',
        },
        textSecondary: {
            light: '#484848',
            main: grey[900],
            dark: '#000000',
        },
        error: {
            light: red[200],
            main: red[500],
            dark: red[700],
        },
        accent: lime.A100,
        accent2: lime.A200,
        optional: '#FFC107',
    },
});

class OrderConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetail: {},
            items: [],
            data: []
        }
    }

    fetchUserDetail = () => {
        let storage = window.localStorage;
        let user = JSON.parse(storage.getItem("user"));
        let token = user === null ? '' : user.token;
        let s = `token=${token}`;
        fetch('http://pipipan.cn:30009/UserDetail/QueryByUserid', {
            method: 'POST',
            body: s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include"
        })
            .then(response => {
                    let errornum = response.headers.get('errornum');
                    if (errornum === '0') {
                        if (response.status !== 200) throw Error("Error !" + response);
                        return response.text();
                    }
                    else if (errornum === '1') {
                        alert("尚未登录！");
                    }
                    else if (errornum === '2') {
                        alert("身份不对应！");
                    }
                    else if (errornum === '3') {
                        alert("账户被冻结！");
                    }
                    this.props.history.push('/signin');
                }
            )
            // .then(response => {
            //     if (response.status !== 200) throw Error("Error !" + response);
            //     return response.text();
            // })
            .then(text => {
                console.log(text);
                this.setState({
                    userDetail: JSON.parse(text)
                });
                console.log(this.state.userDetail)
            })
            .catch(e => {
                alert(e.message);
                window.location.href = "/signin";

            });
    };

    fetchItems = () => {
        console.log("the state tickets");
        let storage = window.localStorage;
        let orderType = storage.getItem("orderType");
        var tmpItem;
        var tmpArray;
        var i;
        if (orderType === "orderInDetailPage") {
            let orderConfirmTickets = JSON.parse(storage.getItem("orderConfirmTickets"));
            if (orderConfirmTickets == null)
                return;
            orderConfirmTickets.map((n, i) => {
                var eachTicket = orderConfirmTickets[i];
                tmpArray = this.state.items;
                fetch(`http://pipipan.cn:30005/Ticket/QueryById?id=${eachTicket.id}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }),
                    credentials: "include"
                })
                    .then(response => {
                        if (response.status !== 200) throw Error("Error !" + response);
                        return response.text();
                    })
                    .then(text => {
                        tmpItem = JSON.parse(text);
                        delete tmpItem.dates;
                        delete tmpItem.startDate;
                        delete tmpItem.endDate;
                        delete tmpItem.lowprice;
                        delete tmpItem.highprice;
                        tmpItem['date'] = eachTicket.date;
                        tmpItem['price'] = eachTicket.price;
                        tmpItem['number'] = eachTicket.number;

                        tmpArray.push(tmpItem);

                        this.setState({
                            items: tmpArray
                        });

                        var tmpData = this.state.data;
                        tmpData.push(createData(tmpItem.title, tmpItem.number, tmpItem.price));
                        this.setState({
                            data: tmpData
                        })
                    })
                return null;
            })
        }
        else if (orderType === "orderInCart") {
            let cartProducts = JSON.parse(storage.getItem("cartProducts"));
            if (cartProducts == null) {
                return;
            }
            for (i = 0; i < cartProducts.length; i++) {
                tmpArray = this.state.items;
                tmpItem = cartProducts[i];
                var tmpData = this.state.data;
                tmpData.push(createData(tmpItem.title, tmpItem.number, tmpItem.price));
                this.setState({
                    data: tmpData
                })
            }

        }

    };

    addOrderToBackend = () => {
        let storage = window.localStorage;
        let ordertype = storage.getItem("orderType");
        let user = JSON.parse(storage.getItem("user"));
        let token = user === null ? '' : user.token;
        var address = document.getElementById('address').value;
        var username = document.getElementById('username').value;
        var phone = document.getElementById('phone').value;

        if (address === "" || address == null)
            address = document.getElementById('address').placeholder;
        if (username === "" || username == null)
            username = document.getElementById('username').placeholder;
        if (phone === "" || phone == null)
            phone = document.getElementById('phone').placeholder;

        if (ordertype === "orderInDetailPage") {
            console.log("in orderInDetailPage");

            let s = `token=${token}&ticketid=${this.state.items[0].id}&price=${this.state.items[0].price}&date=${this.state.items[0].date}&number=${this.state.items[0].number}&receiver=${username}&phone=${phone}&address=${address}`;
            fetch('http://pipipan.cn:30011/Order/AddInDetailPage', {
                method: "POST",
                body: s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                        let errornum = response.headers.get('errornum');
                        if (errornum === '0') {
                            if (response.status !== 200) throw Error("Error !" + response);
                            return response.text();
                        }
                        else if (errornum === '1') {
                            alert("尚未登录！");
                        }
                        else if (errornum === '2') {
                            alert("身份不对应！");
                        }
                        else if (errornum === '3') {
                            alert("账户被冻结！");
                        }
                        this.props.history.push('/signin');
                    }
                )
                .then(text => {
                    console.log(text);
                    text = JSON.parse(text);
                    storage.setItem("orderid", text.id);
                    this.props.history.push({
                        pathname: '/payconfirm'
                    })
                })
        }
        else if (ordertype === "orderInCart") {
            let cartProducts = JSON.parse(storage.getItem("cartProducts"));
            var cartIds = [];
            for (var i = 0; i < cartProducts.length; i++) {
                cartIds.push(cartProducts[i].id)
            }

            console.log('[' + cartIds.toString() + ']');
            cartIds = '[' + cartIds.toString() + ']';
            let s = `token=${token}&cartids=${cartIds}&receiver=${username}&phone=${phone}&address=${address}`;
            console.log(s)
            fetch('http://pipipan.cn:30011/Order/AddBatchInCart', {
                method: "POST",
                body: s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                        let errornum = response.headers.get('errornum');
                        if (errornum === '0') {
                            if (response.status !== 200) throw Error("Error !" + response);
                            return response.text();
                        }
                        else if (errornum === '1') {
                            alert("尚未登录！");
                        }
                        else if (errornum === '2') {
                            alert("身份不对应！");
                        }
                        else if (errornum === '3') {
                            alert("账户被冻结！");
                        }
                        this.props.history.push('/signin');
                    }
                )
                .then(text => {
                    text = JSON.parse(text)
                    console.log(text)
                    storage.setItem("orderid", text.id);
                    this.props.history.push({
                        pathname: '/payconfirm'
                    })
                })
        }


    }

    routerToPayConfirm() {
        this.addOrderToBackend();
    }

    componentWillMount() {
        this.fetchUserDetail();
        this.fetchItems();
    }

    render() {
        const {classes} = this.props;

        const orderAddressFrom = (
            <div>
                <Typography variant="display1" gutterBottom className={classes.headline}>
                    取票人信息
                </Typography>
                <Divider light={true}/>
                <Card>
                    <CardContent>
                        <Typography variant="headline" color="textSecondary">
                            取货信息
                        </Typography>
                        <Divider style={{marginTop: "1%"}}/>
                        <Grid container spacing={24}>
                            <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                                <Typography style={{fontSize: "125%", fontWeight: "normal"}}>
                                    收货地址
                                </Typography>
                            </Grid>
                            <Grid item xs={5} style={{marginTop: "1.8%"}}>
                                <Input
                                    id="address"
                                    placeholder={this.state.userDetail.address}
                                    fullWidth
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}>
                                </Input>
                            </Grid>
                            <Grid item xs={5} style={{marginTop: "2%"}}>
                            </Grid>
                            <Grid item xs={2} style={{textAlign: 'right', marginTop: "-1%"}}>
                                <Typography style={{fontSize: "125%", fontWeight: "normal"}}>
                                    用户姓名
                                </Typography>
                            </Grid>
                            <Grid item xs={5} style={{marginTop: "-1%"}}>
                                <Input
                                    id="username"
                                    placeholder={this.state.userDetail.username}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}>
                                </Input>
                            </Grid>
                            <Grid item xs={5} style={{marginTop: "-1%"}}>
                            </Grid>
                            <Grid item xs={2} style={{textAlign: 'right', marginTop: "-1%"}}>
                                <Typography style={{fontSize: "125%", fontWeight: "normal"}}>
                                    手机号码
                                </Typography>
                            </Grid>
                            <Grid item xs={5} style={{marginTop: "-1%"}}>
                                <Input
                                    id="phone"
                                    placeholder={this.state.userDetail.phone}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}>
                                </Input>
                            </Grid>
                            <Grid item xs={5} style={{marginTop: "-1%"}}>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop: "2%"}}/>
                        <Typography variant="headline" style={{marginTop: "1.5%"}} className={classes.headline}>
                            票品清单
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12} style={{textAlign: 'right', marginTop: "2%"}}>
                                <Paper className={classes.root} style={{marginLeft: "10%"}}>
                                    {/* 以下显示票品的信息:title number price */}
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{textAlign: 'center'}}>Title</TableCell>
                                                <TableCell style={{textAlign: 'center'}} numeric>Number</TableCell>
                                                <TableCell style={{textAlign: 'center'}} numeric>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.data.map(n => {
                                                return (
                                                    <TableRow key={n.id}>
                                                        <TableCell component="th" scope="row"
                                                                   style={{textAlign: 'center'}}>
                                                            {n.title}
                                                        </TableCell>
                                                        <TableCell style={{textAlign: 'center'}}
                                                                   numeric>{n.number}</TableCell>
                                                        <TableCell style={{textAlign: 'center'}}
                                                                   numeric>{'¥' + n.price}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop: "2%"}}/>
                        <Grid container spacing={24}>
                            <Grid item xs={12} style={{textAlign: 'center', marginTop: "1%"}}>
                                <Button variant="extendedFab"
                                        style={{marginTop: "1%", color: "#FF6699", backgroundColor: "#CCCCCC"}}
                                        onClick={() => this.routerToPayConfirm()}>
                                    <PaymentIcon/>
                                    <Typography variant='body1' style={{paddingLeft: '10px', color: "#FF6699"}}>
                                        {'提交'}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </div>
        )
        return (
            <div>
                {orderAddressFrom}
            </div>
        )
    }
}

OrderConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(OrderConfirm));