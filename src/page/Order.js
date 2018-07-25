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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

let id = 0
function createData(title, number, eachPrice) {
    id += 1;
    return { id, title, number, eachPrice};
}
  
const data = [
    createData('璀璨之境 克里姆特映像艺术大展—上海站', 5,500),
    createData('莱安德罗 · 埃利希个展「虚.构」—上海站', 2, 1000),
    createData('《印象莫奈：时光映迹艺术展》3.0— 苏州站', 10,880)
];

const styles = ()=>({
    headline:{
        color: pink[300],
    }
})

/***************************************************************************/
/** TablePaginationActions **/
/***************************************************************************/

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);
/***************************************************************************/
/** Order **/
/***************************************************************************/
class Order extends Component{
    constructor(props){
        super(props)
        this.state={
            data: [
                createData('Cupcake', 305, 3.7)
            ],
            page: 0,
            rowsPerPage: 0,
            totalNumber: 0,
            pageOrder: [],
        };
        this.routerToAfterPay = this.routerToAfterPay.bind(this)
    }

    componentWillMount(){
        this.fetchUserOrders();
    }

    fetchUserOrders=()=>{
        let storage = window.localStorage;
        let token = JSON.parse(storage.getItem("user")).token;
        console.log(token);
        let s = `token=${token}&pagenumber=1`;
        fetch('http://pipipan.cn:30011/Order/QueryByUserid',{
            method:"POST",
            body: s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include",
        })
            .then(response => {
                if (response.status !== 200) throw Error("Error !" + response);
                return response.text();
            })
            .then(text=>{
                console.log("hello from the outside");
                text = JSON.parse(text);
                console.log(text);
                this.setState({
                    rowsPerPage : text.size,
                    totalNumber : text.totalElements,
                    pageOrder : text.content,
                })
            })
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    routerToAfterPay (e){
        console.log("click")
        console.log(e.target.get)
        console.log(e.target.id)
    }

    buildOrderEntry=(order,classes)=>{
        const expanPanel = (<ExpansionPanel style={{marginTop:'2%',marginBottom:'4%'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={24} >
                    <Grid item xs={2} style={{ textAlign: 'right' }}>
                        <Typography style={{ fontSize: "100%", fontWeight: "normal" }}>
                            {"订单"+order.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <Typography style={{ fontSize: "100%", fontWeight: "normal" }}>
                            {"时间："+order.orderTime}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} ></Grid>
                    <Grid item xs={2} style={{ textAlign: 'left' }}>
                        {order.status==="待发货"?
                            (<Typography style={{ fontSize: "100%", fontWeight: "normal" ,color: "#3399FF"}}>
                                {order.status}
                            </Typography>):
                            (<Typography style={{ fontSize: "100%", fontWeight: "normal" ,color: "#FF3399"}}>
                                {order.status}
                            </Typography>)
                        }
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {this.buildPanelDetails(order,classes)}
            </ExpansionPanelDetails>
        </ExpansionPanel>)

        return expanPanel;
    }

    buildPanelDetails=(order,classes)=>{
        const afterPayDetail = (
            <div>
                <Typography variant="headline" color="textSecondary">
                    详细信息
                </Typography>

                <Divider style={{marginTop: "1%"}}/>
                <Grid container spacing={24}>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            订单编号
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {order.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            用户姓名
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {order.receiver}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            手机号码
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {order.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right'}}>
                        <Typography>
                            收获地址
                        </Typography>
                    </Grid>
                    <Grid item xs={10} style={{textAlign: 'left'}}>
                        <Typography>
                            {order.address}
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
                            {order.items.map(n => {
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
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>{'¥' + n.number * n.price}</TableCell>
                                        {(n.status === "成功") ?
                                            <TableCell
                                                style={{color: "#3399FF", textAlign: 'center'}}
                                                numeric>{n.status}</TableCell> :
                                            <TableCell
                                                style={{color: "#FF3399", textAlign: 'center'}}
                                                numeric>{n.status}</TableCell>}
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
                            {
                                function(order) {
                                    var tmpTotalPrice = 0;
                                    for (var i = 0; i < order.items.length; i++) {
                                        var tmpItem = order.items[i]
                                        if (tmpItem.status === "成功")
                                            tmpTotalPrice += tmpItem.number * tmpItem.price
                                    }
                                    return '¥'+tmpTotalPrice;
                                }(order)
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )

        const beforePayDetail = (
            <div>
                <Typography variant="headline" color="textSecondary">
                    详细信息
                </Typography>

                <Divider style={{marginTop: "1%"}}/>
                <Grid container spacing={24}>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            订单编号
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {order.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            用户姓名
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {order.receiver}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Typography>
                            手机号码
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
                        <Typography>
                            {order.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{textAlign: 'right'}}>
                        <Typography>
                            收获地址
                        </Typography>
                    </Grid>
                    <Grid item xs={10} style={{textAlign: 'left'}}>
                        <Typography>
                            {order.address}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider style={{marginTop: "2%"}}/>
                <Typography variant="headline" style={{marginTop: "1.5%"}}
                            className={classes.headline}>
                    票品清单
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} style={{textAlign: 'right', marginTop: "2%"}}>
                        <Paper className={classes.root} style={{marginLeft: "10%"}}>
                            {/* 以下显示票品的信息:title number price */}
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            style={{textAlign: 'center'}}>标题</TableCell>
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>数量</TableCell>
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>单价</TableCell>
                                        <TableCell style={{textAlign: 'center'}}
                                                   numeric>合计</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map(n => {
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
                                                <TableCell style={{textAlign: 'center'}}
                                                           numeric>{'¥' + n.price * n.number}</TableCell>
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
                    {/* <Grid item xs={1} style={{marginTop:"1.5%"}}></Grid> */}
                    <Grid item xs={3} style={{textAlign: 'right', marginTop: "1.5%"}}>
                        <Typography className={classes.headline}
                                    style={{fontSize: "125%", marginTop: "2%", marginLeft: "6%"}}>
                            总费用
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'left', marginTop: "1.5%"}}>
                        <Typography style={{fontSize: "125%", marginTop: "2%"}}>
                            {'¥' + function(items){
                                var tmpTotalPrice = 0;
                                for(var i = 0 ; i < items.length ; i++){
                                    tmpTotalPrice+=items[i].price*items[i].number
                                }
                                return tmpTotalPrice;
                            }(order.items)}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} style={{marginTop: "1.5%"}}/>
                    <Grid item xs={3} style={{marginTop: "1.5%"}}>
                        <Button variant="contained"
                                id = {"orderid"+order.id}
                                style={{
                            marginRight: '3%',
                            color: "#FFFFFF",
                            borderBottom: '100%',
                            backgroundColor: "#FF6699"
                        }}
                                onClick={this.routerToAfterPay}>
                            支付
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )

        return (
            <Card>
                <CardContent>
                    {order.status === "待发货"?afterPayDetail:beforePayDetail}
                </CardContent>
            </Card>)
    };

    buildTable=(orders,classes,emptyRows)=>{
        const { rowsPerPage, page } = this.state;

        const table = (
            <Card>
                <CardContent>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {this.state.pageOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            {this.buildOrderEntry(n, classes)}
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 48 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={3}
                                        count={this.state.totalNumber}/*16个*/
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActionsWrapped}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        )
        return table
    }

    render(){
        const { classes } = this.props;
        const orders = [{"订单编号":201807230000}]
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.totalNumber - page * rowsPerPage);

        const Order = (
            <div>
                <Card >
                    <CardContent>
                        <Grid container spacing={24}>
                            <Grid item xs={12} style={{ textAlign: 'center',marginTop:'2%'}}>
                                <Typography className = {classes.headline} style={{ fontSize: "200%", fontWeight: "normal", marginBottom:'3%'}}>
                                    我的订单
                                </Typography>
                            </Grid>
                        </Grid>

                        {this.buildTable(orders,classes,emptyRows)}
                    </CardContent>
                </Card>
            </div>
        );
        return (<div>{Order}</div>)
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Order);

//
// <Typography variant="headline" color="textSecondary">
//     详细信息
// </Typography>
//
// <Divider style={{marginTop: "1%"}}/>
// <Grid container spacing={24}>
//     <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
//         <Typography>
//             订单编号
//         </Typography>
//     </Grid>
//     <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
//         <Typography>
//             1232131
//         </Typography>
//     </Grid>
//     <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
//         <Typography>
//             用户姓名
//         </Typography>
//     </Grid>
//     <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
//         <Typography>
//             234234234
//         </Typography>
//     </Grid>
//     <Grid item xs={2} style={{textAlign: 'right', marginTop: "2%"}}>
//         <Typography>
//             手机号码
//         </Typography>
//     </Grid>
//     <Grid item xs={2} style={{textAlign: 'left', marginTop: "2%"}}>
//         <Typography>
//             234234234
//         </Typography>
//     </Grid>
// </Grid>
// <Divider style={{marginTop: "1.5%"}}/>
// <Grid container spacing={24}>
//     <Grid item xs={2} style={{textAlign: 'right', marginTop: "1.5%"}}>
//         <Typography>
//             收获地址
//         </Typography>
//     </Grid>
//     <Grid item xs={10} style={{textAlign: 'left', marginTop: "1.5%"}}>
//         <Typography>
//             234234234
//         </Typography>
//     </Grid>
// </Grid>