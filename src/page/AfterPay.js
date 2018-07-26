import React, {Component} from 'react';
import PropTypes from 'prop-types';
import pink from '@material-ui/core/colors/pink';
import { withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = ()=>({
    headline:{
        color: pink[300],
    }
})

let id = 0;
function createData(name, number, eachPrice, succOrNot) {
  id += 1;
  return { id, name, number, eachPrice, succOrNot};
}

class AfterPay extends Component{
    constructor(props){
        super(props);
        this.state= {
            afterPayTitle: "",
            order: {},
            items: [],
            data: [],
            success: [],
        }
    }

    componentWillMount(){
        this.drawPayTitle(this.props.classes);
    }

    drawPayTitle=(classes)=>{
        let storage = window.localStorage;
        let succOrNot = storage.getItem("message");
        console.log(succOrNot)
        if(succOrNot === "expired"){
            this.setState({
                afterPayTitle:"订单已过期,支付失败"
            })
        }
        else if(succOrNot === "Insufficient balance"){
            this.setState({
                afterPayTitle:"账户余额不足，请充值"
            })
        }
        else{
            console.log("hello1")
            this.setState({
                afterPayTitle:"支付成功"
            })
        }

        console.log("hello")

        if(succOrNot == "success"){
            this.fetchOrder()
        }
    };

    fetchOrder = ()=>{
        let storage = window.localStorage;
        let token = JSON.parse(storage.getItem("user")).token;
        let orderid = storage.getItem("orderid");

        let s = `token=${token}&orderid=${orderid}`;
        fetch('http://pipipan.cn:30011/Order/QueryByOrderid',{
            method:'POST',
            body:s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include"
        })
            .then(response => {
                if (response.status !== 200) throw Error("Error !" + response);
                return response.text();
            })
            .then(text =>{
                text = JSON.parse(text);
                console.log("in text");
                console.log(text);
                this.setState({
                    items : text.items,
                    order : text
                });
                var tmpArray = this.state.data;

                for(var i = 0; i < text.items.length ; i++){
                    var tmpItem = text.items[i];
                    tmpArray.push(createData(tmpItem.title,tmpItem.number,tmpItem.price,tmpItem.status))
                }

                this.setState({
                    data:tmpArray
                })

                this.drawSuccess(this.props.classes)

                storage.removeItem("Inventory shortage");
                storage.removeItem("message");
                storage.removeItem("orderid");
                storage.removeItem("orderType");
                storage.removeItem("orderConfirmTickets")
            });
    }

    drawSuccess = (classes)=>{
        this.setState({
            success : (<div>
                <Grid container spacing={24}>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            订单编号
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {this.state.order.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            用户姓名
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {this.state.order.receiver}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            手机号码
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {this.state.order.phone}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider style={{marginTop: "1.5%"}}/>
                <Grid container spacing={24}>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "1.5%"}}>
                        <Typography>
                            收获地址
                        </Typography>
                    </Grid>
                    <Grid item xs={10} style={{textAlign: 'left', marginTop: "1.5%"}}>
                        <Typography>
                            {this.state.order.address}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider style={{marginTop: "1.5%"}}/>
                <Typography className={classes.headline}
                            style={{fontSize: "125%", marginTop: "2%", marginLeft: "6%"}}>
                    订单票品
                </Typography>
                <Paper className={classes.root} style={{marginTop: "2%"}}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}>商品名称</TableCell>
                                <TableCell style={{textAlign: 'center'}} numeric>数量</TableCell>
                                <TableCell style={{textAlign: 'center'}} numeric>单价</TableCell>
                                <TableCell style={{textAlign: 'center'}} numeric>合计</TableCell>
                                <TableCell style={{textAlign: 'center'}} numeric>是否成功</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell component="th" scope="row"
                                                   style={{textAlign: 'center'}}>
                                            {n.name}
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>{n.number}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>{'¥' + n.eachPrice}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>{'¥' + n.number * n.eachPrice}</TableCell>
                                        {(n.succOrNot === "成功") ?
                                            <TableCell
                                                style={{color: "#3399FF", textAlign: 'center'}}
                                                numeric>{n.succOrNot}</TableCell> :
                                            <TableCell
                                                style={{color: "#FF3399", textAlign: 'center'}}
                                                numeric>{n.succOrNot}</TableCell>}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <Divider style={{marginTop: "1.5%"}}/>
                <Grid container spacing={24}>
                    {/* <Grid item xs={1} style={{marginTop:"1.5%"}}></Grid> */}

                    <Grid item xs={4} style={{marginTop: "1.5%"}}></Grid>
                    <Grid item xs={2} style={{marginTop: "1.5%"}}/>
                    <Grid item xs={3} style={{textAlign: 'right', marginTop: "1.5%"}}>
                        <Typography className={classes.headline}
                                    style={{fontSize: "125%", marginTop: "2%", marginLeft: "6%"}}>
                            已支付
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{marginTop: "1.5%"}}>
                        <Typography style={{fontSize: "125%", marginTop: "2%"}}>
                            {'¥' + this.calcuTotal()}
                        </Typography>
                    </Grid>
                </Grid>
            </div>)
        })
    };

    calcuTotal=()=>{
        let totalPrice = 0;
        this.state.data.forEach(element => {
            if(element.succOrNot==='成功')
                totalPrice += element.number * element.eachPrice;
        });
        return totalPrice
    }

    render(){
        const { classes } = this.props;

        const orderPayForm = (
            <div>
                <Card>
                    <CardContent>
                        <Grid container spacing={24}>
                            <Grid item xs={12} style={{textAlign: 'center', marginTop: "1.5%"}}>
                                <Typography className={classes.headline} style={{fontSize: "200%", marginTop: "2%"}}>
                                    {this.state.afterPayTitle}
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            this.state.afterPayTitle == "支付成功" ? (this.state.success) : (function(){
                                let storage = window.localStorage;
                                storage.removeItem("orderid");
                                storage.removeItem("message");
                                return (<div></div>)
                            }())
                        }
                    </CardContent>
                </Card>
            </div>
        );
        return (
            <div>
                {orderPayForm}
            </div>
        )
    }
}

AfterPay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AfterPay);