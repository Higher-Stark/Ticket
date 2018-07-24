import React, {Component} from 'react';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import PaymentIcon from '@material-ui/icons/Payment'

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

const data = [
  createData('璀璨之境 克里姆特映像艺术大展—上海站', 5, 500, "成功"),
  createData('莱安德罗 · 埃利希个展「虚.构」—上海站', 2, 1000, "成功"),
  createData('《印象莫奈：时光映迹艺术展》3.0— 苏州站', 10, 880, "失败")
];


class AfterPay extends Component{
    constructor(props){
        super(props)
        this.calcuTotal = this.calcuTotal.bind()
    }

    calcuTotal(){
        console.log(data)
        let totalPrice = 0;
        data.forEach(element => {
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
                            <Grid item xs={12} style={{textAlign:'center',marginTop:"1.5%"}}>
                                    <Typography  className={classes.headline} style={{ fontSize: "200%", marginTop: "2%"}}>
                                        支付成功
                                    </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"2%"}}>
                                <Typography>
                                    订单编号
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'left',marginTop:"2%"}}>
                                <Typography>
                                    201807230000
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"2%"}}>
                                <Typography>
                                    用户姓名
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'left',marginTop:"2%"}}>
                                <Typography>
                                    潘子奕狗头
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"2%"}}>
                                <Typography>
                                    手机号码
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'left',marginTop:"2%"}}>
                                <Typography>
                                    54739110
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop:"1.5%"}}/>
                        <Grid container spacing={24}>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"1.5%"}}>
                                <Typography>
                                    收获地址
                                </Typography>
                            </Grid>
                            <Grid item xs={10} style={{textAlign:'left',marginTop:"1.5%"}}>
                                <Typography>
                                    上海市 闵行校区 东川路800号 上海交大闵行校区
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop:"1.5%"}}/>
                        <Typography className={classes.headline} style={{ fontSize: "125%",marginTop:"2%",marginLeft:"6%"}}>
                            订单票品
                        </Typography>
                        <Paper className={classes.root} style = {{marginTop:"2%"}}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style ={{textAlign:'center'}}>商品名称</TableCell>
                                        <TableCell style ={{textAlign:'center'}} numeric>数量</TableCell>
                                        <TableCell style ={{textAlign:'center'}} numeric>单价</TableCell>
                                        <TableCell style ={{textAlign:'center'}} numeric>合计</TableCell>
                                        <TableCell style ={{textAlign:'center'}} numeric>是否成功</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(n => {
                                        return (
                                            <TableRow key={n.id}>
                                                <TableCell component="th" scope="row" style ={{textAlign:'center'}}>
                                                    {n.name}
                                                </TableCell>
                                                <TableCell style ={{textAlign:'center'}} numeric>{n.number}</TableCell>
                                                <TableCell style ={{textAlign:'center'}} numeric>{'¥'+n.eachPrice}</TableCell>
                                                <TableCell style ={{textAlign:'center'}} numeric>{'¥'+n.number * n.eachPrice}</TableCell>
                                                {(n.succOrNot==="成功")?<TableCell style={{color:"#3399FF",textAlign:'center'}}numeric>{n.succOrNot}</TableCell>:<TableCell style={{color:"#FF3399",textAlign:'center'}}numeric>{n.succOrNot}</TableCell>}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                        <Divider style={{marginTop:"1.5%"}}/>
                        <Grid container spacing={24}>
                            {/* <Grid item xs={1} style={{marginTop:"1.5%"}}></Grid> */}
                            
                            <Grid item xs={4} style={{marginTop:"1.5%"}}></Grid>
                            <Grid item xs={2} style={{marginTop:"1.5%"}}/>
                            <Grid item xs={3} style={{textAlign:'right',marginTop:"1.5%"}}>
                                <Typography className={classes.headline} style={{ fontSize: "125%", marginTop: "2%", marginLeft: "6%" }}>
                                    已支付
                                </Typography>
                            </Grid>
                            <Grid item xs={3} style={{marginTop:"1.5%"}}>
                                    <Typography  style={{ fontSize: "125%", marginTop: "2%"}}>
                                        {'¥'+this.calcuTotal()}
                                    </Typography>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                </Card>
            </div>
        );
        return(
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