import React, {Component} from 'react';
import PropTypes from 'prop-types';
import pink from '@material-ui/core/colors/pink';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
function createData(title, number, eachPrice) {
  id += 1;
  return { id, title, number, eachPrice};
}

const data = [
  createData('璀璨之境 克里姆特映像艺术大展—上海站', 5, 500),
  createData('莱安德罗 · 埃利希个展「虚.构」—上海站', 2, 1000),
  createData('《印象莫奈：时光映迹艺术展》3.0— 苏州站', 10, 880)
];


class PayConfirm extends Component{
    constructor(props){
        super(props)
        this.calcuTotal = this.calcuTotal.bind()
    }

    calcuTotal(){
        console.log(data)
        let totalPrice = 0;
        data.forEach(element => {
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(n => {
                                        return (
                                            <TableRow key={n.id}>
                                                <TableCell component="th" scope="row" style ={{textAlign:'center'}}>
                                                    {n.title}
                                                </TableCell>
                                                <TableCell style ={{textAlign:'center'}} numeric>{n.number}</TableCell>
                                                <TableCell style ={{textAlign:'center'}} numeric>{'¥'+n.eachPrice}</TableCell>
                                                <TableCell style ={{textAlign:'center'}} numeric>{'¥'+n.number * n.eachPrice}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                        <Divider style={{marginTop:"1.5%"}}/>
                        <Grid container spacing={24}>
                            {/* <Grid item xs={1} style={{marginTop:"1.5%"}}></Grid> */}
                            <Grid item xs={3} style={{textAlign:'right',marginTop:"1.5%"}}>
                                <Typography className={classes.headline} style={{ fontSize: "125%", marginTop: "2%", marginLeft: "6%" }}>
                                    总费用
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{textAlign:'left',marginTop:"1.5%"}}>
                                    <Typography  style={{ fontSize: "125%", marginTop: "2%"}}>
                                        {'¥'+this.calcuTotal()}
                                    </Typography>
                            </Grid>
                            <Grid item xs={2} style={{marginTop:"1.5%"}}/>
                            <Grid item xs={3} style={{marginTop:"1.5%"}}>
                                <Button variant="contained" style={{marginRight:'3%',color:"#FFFFFF",borderBottom:'100%',backgroundColor:"#FF6699"}}>
                                    支付
                                </Button>
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

PayConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PayConfirm);