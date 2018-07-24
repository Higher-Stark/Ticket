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
                createData('Cupcake', 305, 3.7),
                createData('Donut', 452, 25.0),
                createData('Eclair', 262, 16.0),
                createData('Frozen yoghurt', 159, 6.0),
                createData('Gingerbread', 356, 16.0),
                createData('Honeycomb', 408, 3.2),
                createData('Ice cream sandwich', 237, 9.0),
                createData('Jelly Bean', 375, 0.0),
                createData('KitKat', 518, 26.0),
                createData('Lollipop', 392, 0.2),
                createData('Marshmallow', 318, 0),
                createData('Nougat', 360, 19.0),
                createData('Oreo', 437, 18.0),
            ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        }
        this.calcuTotal = this.calcuTotal.bind(this)
        this.getUserOrder = this.getUserOrder.bind(this)
        this.buildOrderEntry = this.buildOrderEntry.bind(this)
        this.buildTable = this.buildTable.bind(this)
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    calcuTotal(){
        console.log(data)
        let totalPrice = 0;
        data.forEach(element => {
            totalPrice += element.number * element.eachPrice;
        });
        return totalPrice
    }

    getUserOrder(){
        let storage = window.localStorage;
        let token = storage.getItem("user")
        console.log(token)
        fetch()
    }

    buildOrderEntry(order,classes){
        const expanPanel = (<ExpansionPanel style={{marginTop:'2%',marginBottom:'4%'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={24} >
                    <Grid item xs={2} style={{ textAlign: 'right' }}>
                        <Typography style={{ fontSize: "100%", fontWeight: "normal" }}>
                            订单1
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <Typography style={{ fontSize: "100%", fontWeight: "normal" }}>
                            时间：2018年07月24日
                        </Typography>
                    </Grid>
                    <Grid item xs={4} ></Grid>
                    <Grid item xs={2} style={{ textAlign: 'left' }}>
                        <Typography style={{ fontSize: "100%", fontWeight: "normal" }}>
                            待付款
                        </Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Card>
                    <CardContent>
                        <Typography variant="headline" color="textSecondary">
                            详细信息
                        </Typography>

                        <Divider style={{marginTop: "1%"}}/>
                        <Grid container spacing={24}>
                            <Grid item xs={2} style={{textAlign:'right',marginTop:"2%"}}>
                                <Typography>
                                    订单编号
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:'left',marginTop:"2%"}}>
                                <Typography>
                                    {order["订单编号"]}
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
                                            {data.map(n => {
                                                return (
                                                    <TableRow key={n.id}>
                                                        <TableCell component="th" scope="row"
                                                                   style={{textAlign: 'center'}}>
                                                            {n.title}
                                                        </TableCell>
                                                        <TableCell style={{textAlign: 'center'}}
                                                                   numeric>{n.number}</TableCell>
                                                        <TableCell style={{textAlign: 'center'}}
                                                                   numeric>{'¥'+n.eachPrice}</TableCell>
                                                        <TableCell style={{textAlign: 'center'}}
                                                                   numeric>{'¥'+n.eachPrice*n.number}</TableCell>
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
                                <Button variant="contained" style={{marginRight:'3%',color:"#FFFFFF",borderBottom:'100%',backgroundColor:"#FF6699"}}
                                        onClick={this.getUserOrder}>
                                    支付
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </ExpansionPanelDetails>
        </ExpansionPanel>)

        return expanPanel;
    }

    buildTable(orders,classes,emptyRows){
        const { data, rowsPerPage, page } = this.state;

        const table = (
            <Card>
                <CardContent>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
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
                                        count={data.length}/*13个*/
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
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
        )
        return (<div>{Order}</div>)
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Order);