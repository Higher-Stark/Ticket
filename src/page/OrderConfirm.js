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

let id = 0
function createData(title, number, price) {
    id += 1;
    return { title,number,price };
}
  
const data = [
    createData('璀璨之境 克里姆特映像艺术大展—上海站', 5,"¥500"),
    createData('莱安德罗 · 埃利希个展「虚.构」—上海站', 2, "¥1000"),
    createData('《印象莫奈：时光映迹艺术展》3.0— 苏州站', 10,"¥880")
];

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 800,
    },
    headline:{
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

class OrderConfirm extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { classes } = this.props;

        const orderAddressFrom = (
            <div>
                <Typography variant="display1" gutterBottom className={classes.headline}> 
                    取票人信息
                </Typography>
                <Divider light = {true} />
                <Card>
                    <CardContent>
                        <Typography variant="headline" color="textSecondary" >
                            取货信息
                        </Typography>
                        <Divider style={{marginTop:"1%"}}/>
                        <Grid container spacing={24}>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"2%"}}>
                                    <Typography style={{ fontSize: "125%" , fontWeight:"normal"}}>
                                        收货地址
                                    </Typography>
                            </Grid>
                            <Grid item xs={5} style={{marginTop:"1.8%"}}>
                                <Input 
                                    placeholder="打爆潘子奕狗头 打爆潘子奕狗头 打爆潘子奕狗头"
                                    fullWidth
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}>
                                </Input>
                            </Grid>
                            <Grid item xs={5} style={{marginTop:"2%"}}>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"-1%"}}>
                                    <Typography style={{ fontSize: "125%",fontWeight:"normal"}}>
                                        用户姓名
                                    </Typography>
                            </Grid>
                            <Grid item xs={5} style={{ marginTop:"-1%"}}>
                                <Input 
                                    placeholder="打爆潘子奕狗头"
                                    
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}>
                                </Input>
                            </Grid>
                            <Grid item xs={5} style={{ marginTop:"-1%"}}>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"-1%"}}>
                                    <Typography style={{ fontSize: "125%",fontWeight:"normal"}}>
                                        手机号码
                                    </Typography>
                            </Grid>
                            <Grid item xs={5} style={{ marginTop:"-1%"}}>
                                <Input 
                                    placeholder="打爆潘子奕狗头"
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}>
                                </Input>
                            </Grid>
                            <Grid item xs={5} style={{ marginTop:"-1%"}}>
                            </Grid>
                        </Grid>
                        <Divider style={{marginTop:"2%"}}/>
                        <Typography variant="headline"  style={{marginTop:"1.5%"}} className={classes.headline}>
                            票品清单
                        </Typography>
                        <Grid container spacing={24}>
                            <Grid item xs={12} style={{textAlign:'right',marginTop:"2%"}}>
                                <Paper className={classes.root} style={{marginLeft:"10%"}} >
                                {/* 以下显示票品的信息:title number price */}
                                    <Table className={classes.table} >
                                        <TableHead>
                                            <TableRow >
                                                <TableCell style={{textAlign:'center'}}>Title</TableCell>
                                                <TableCell style={{textAlign:'center'}} numeric>Number</TableCell>
                                                <TableCell style={{textAlign:'center'}} numeric>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map(n => {
                                                return (
                                                    <TableRow key={n.id}>
                                                        <TableCell component="th" scope="row" style={{textAlign:'center'}}>
                                                            {n.title}
                                                        </TableCell>
                                                        <TableCell style={{textAlign:'center'}} numeric>{n.number}</TableCell>
                                                        <TableCell style={{textAlign:'center'}} numeric>{n.price}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Divider style={{ marginTop: "2%" }} />
                        <Grid container spacing={24}>
                            <Grid item xs={12} style={{ textAlign: 'center', marginTop: "1%" }}>
                                <Button variant="extendedFab" style={{ marginTop: "1%", color: "#FF6699", backgroundColor: "#CCCCCC" }}>
                                    <PaymentIcon />
                                    <Typography variant='body1' style={{ paddingLeft: '10px', color: "#FF6699" }}>
                                        {'提交'}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </div>
        )
        return(
            <div>
                {orderAddressFrom}
            </div>
        )
    }
}

OrderConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OrderConfirm);