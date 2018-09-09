import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import fakeData from './fake_data.json';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stablizedThis = array.map((el, index) => [el, index]);
    stablizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stablizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'ticket_id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: true, label: '名称' },
    { id: 'city', numeric: false, disablePadding: true, label: '城市' },
    { id: 'bottomPrice' ,numeric: true, disablePadding: false, label: '底价 (人民币)' },
    { id: 'bottomSale', numeric: true, disablePadding: false, label: '售出票数', },
    { id: 'topPrice', numeric: true, disablePadding: false, label: '顶价 (人民币)' },
    { id: 'topSale', numeric: true, disablePadding: false, label: '售出票数' },
    { id: 'rest', numeric: true, disablePadding: false, label: '余票' },
    { id: 'total', numeric: true, disablePadding: false, label: '总票数' },
];

class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell key={row.id} numeric={row.numeric} padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip title="Sort" placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: 
        theme.palette.type === 'light' ?
            {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
        padding: `0 ${theme.spacing.unit}px`,
    },
});

let EnhancedTableToolbar = props => {
    const { classes, toggleFilter } = props;

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="title" id="tableTitle">
                    销量统计
                </Typography>
            </div>
            <div className={classes.title}>
                <Typography variant="subheading" id="report_date" color="textSecondary">
                    {(new Date()).toLocaleString()}
                </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list" onClick={toggleFilter}>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    toggleFilter: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    name: {
        textOverflow: 'ellipsis',
    },
    textField: {
        flex: '0 0 auto',
        margin: `0 ${theme.spacing.unit}px`,
        width: 240,
    },
    spacer: {
        flex: '1 1 100%',
    },
    filter: {
        display: 'flex',
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});

class EnhancedTable extends Component {
    originData = null;

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'id',
            data: props.data,
            page: 0, 
            rowsPerPage: 16,
            filterOpen: false,
            nameFilter: null,
            cityFilter: null,
        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.filter = this.filter.bind(this);
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleFilterChange = field => event => {
        this.setState({[field] : event.target.value});
    };

    toggleFilter() {
        const {filterOpen} = this.state;
        if (filterOpen) {
            this.setState({
                filterOpen: false,
                nameFilter: null,
                cityFilter: null,
                data: this.originData,
            });
            this.originData = null;
        }
        else {
            this.setState({ filterOpen: true});
        }
    }

    filter() {
        const {nameFilter, cityFilter, data} = this.state;
        this.originData = data;
        let filtered = data.filter(el => el.name.indexOf(nameFilter || "") !== -1 && el.city.indexOf(cityFilter) !== -1);
        this.setState({ data: filtered });
    }

    render() {
        const {classes } = this.props;
        const { data, order, orderBy, rowsPerPage, page, nameFilter, cityFilter, filterOpen } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar toggleFilter={this.toggleFilter}/>
                { filterOpen && (
                    <div className={classes.filter}>
                        <div className={classes.spacer}/>
                        <TextField id="name-filter" label="名称关键词"  className={classes.textField} margin="normal"
                            value={nameFilter || ""} onChange={this.handleFilterChange('nameFilter')}
                        />
                        <TextField id="city-filter" label="城市关键词" className={classes.textField} margin="normal"
                            value={cityFilter || ""} onChange={this.handleFilterChange('cityFilter')}
                        />
                        <Button variant="contained" color="primary" onClick={this.filter}>
                            筛选
                        </Button>
                    </div>
                )}
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => (
                                    <TableRow hover tabIndex={-1} key={n.id}>
                                        <TableCell numeric>{n.id}</TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={classes.name}>
                                            {n.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {n.city}
                                        </TableCell>
                                        <TableCell numeric>{n.lowPrice}</TableCell>
                                        <TableCell numeric>{n.lowSale}</TableCell>
                                        <TableCell numeric>{n.highPrice}</TableCell>
                                        <TableCell numeric>{n.highSale}</TableCell>
                                        <TableCell numeric>{n.rest}</TableCell>
                                        <TableCell numeric>{n.total}</TableCell>
                                    </TableRow>
                                )
                            )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination component="div" count={data.length} rowsPerPage={rowsPerPage} page={page}
                    rowsPerPageOptions={[16, 32, 48]}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

EnhancedTable = withStyles(styles)(EnhancedTable);

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const tabStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
    },
    textField: {
        margin: `0 ${theme.spacing.unit}px`,
        width: 200,
    },
    
});

class Report extends Component {
    url = "http://pipipan.cn:30014/Manager/";

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            date: (new Date()).Format("yyyy-mm-dd"),
            city: "",
            id: "",
            year: "",
            month: "",
            week: 1,
            data: null,
        };
    }

    handleChange = (event, value) => {
        this.setState({ tab : value });
    };

    handleTextChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    toggleQueryDaily = event => {
        const {date, id, city} = this.state;
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);

        console.log(date, id, city);
        if (!date) {
            alert("date is empty");
            return -1;
        }
        if (id === "" && city === "") {
            fetch(this.url + `DailyQueryAll?token=${admin.token}&pagenumber=1`,
                {method: 'GET'})
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                let el = null;
                for (el in data) {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                }
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id === "" && city !== "") {
            fetch(this.url + 
                `DailyQueryByCityAndDate?token=${admin.token}&city=${city}&date=${date}&pagenumber=1`,
                {method: 'GET',}
            )
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id !== "") {
            fetch(this.url + `DailyQueryByTicketidAndDate?token=${admin.token}&ticketid=${id}&date=${date}`)
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
    };

    toggleQueryWeekly = event => {
        const {year, month, week, id, city} = this.state;
        console.log(year, month, week, id, city);
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);

        if (!year || !month || !week) {
            alert("信息不全");
            return -1;
        }
        if (id === "" && city === "") {
            fetch(this.url + `WeeklyQueryAll?token=${admin.token}&pagenumber=1`,
                {method: 'GET'})
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                let el = null;
                for (el in data) {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                }
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id === "" && city !== "") {
            fetch(this.url + 
                `WeeklyQueryByTicketidAndWeek?token=${admin.token}&ticketid=${id}&year=${year}&month=${month}&week=${week}`,
                {method: 'GET',}
            )
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id !== "") {
            fetch(this.url + `WeeklyQueryByCityAndWeek?token=${admin.token}&year=${year}&month=${month}&week=${week}&city=${city}&pagenumber=1`)
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
    };

    toggleQueryMonthly = event => {
        const {year, month, id, city} = this.state;
        console.log(year, month, id, city);

        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);

        if (!year || !month ) {
            alert("信息不全");
            return -1;
        }
        if (id === "" && city === "") {
            fetch(this.url + `MonthlyQueryAll?token=${admin.token}&pagenumber=1`,
                {method: 'GET'})
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                let el = null;
                for (el in data) {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                }
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id === "" && city !== "") {
            fetch(this.url + 
                `MonthlyQueryByTicketidAndMonth?token=${admin.token}&year=${year}&month=${month}&ticketid=${id}`,
                {method: 'GET',}
            )
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id !== "") {
            fetch(this.url + `MonthlyQueryByCityAndMonth?token=${admin.token}&year=${year}&month=${month}&city=${city}&pagenumber=1`)
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
    };

    toggleQueryYearly = event => {
        const {year, id, city} = this.state;
        console.log(year, id, city);

        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);

        if (!year ) {
            alert("信息不全");
            return -1;
        }
        if (id === "" && city === "") {
            fetch(this.url + `AnnuallyQueryAll?token=${admin.token}&pagenumber=1`,
                {method: 'GET'})
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                let el = null;
                for (el in data) {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                }
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id === "" && city !== "") {
            fetch(this.url + 
                `AnuuallyQueryByTicketidAndYear?token=${admin.token}&year=${year}&ticketid=${id}`,
                {method: 'GET',}
            )
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
        else if (id !== "") {
            fetch(this.url + `AnuuallyQueryByCityAndYear?token=${admin.token}&year=${year}&city=${city}&pagenumber=1`)
            .then(response => {
                let headers = response.headers;
                if (headers.get("errorNum") !== 0) {
                    switch(headers.get("errorNum")) {
                        case 1: 
                            alert("尚未登录");
                            break;
                        case 2:
                            alert("身份不对应");
                            break;
                        case 3:
                            alert("账户被冻结");
                            break;
                        default:
                    }
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                let tmp = [];
                data.map(el => {
                    let item = {
                        id: el.ticketId,
                        total: el.totalPrice,
                        sales: el.priceAndAmount,
                        rate: el.rate,
                        city: el.city,
                        name: el.title,
                    };
                    tmp.append(item);
                })
                this.setState({data: tmp});
            })
            .catch(e => console.log(e));
        }
    };

    render() {
        const {classes } = this.props;
        const { tab, date, id, city, year, month, week, data } = this.state;

        const daily = (
            <div className={classes.form}>
                <TextField id="day" label="日期" className={classes.textField}
                    value={date} onChange={this.handleTextChange("date")}
                    margin="normal" type="date"
                />
                <TextField id="id" label="票品ID" className={classes.textField}
                    value={id} onChange={this.handleTextChange("id")}
                    margin="normal"
                />
                <TextField id="city" label="城市" className={classes.textField}
                    value={city} onChange={this.handleTextChange("city")}
                    margin="normal"
                />
                <Button variant="contained" color="primary" 
                    onClick={this.toggleQueryDaily}
                >
                    查询
                </Button>
            </div>
        );

        const weekly = (
            <div className={classes.form}>
                <TextField id="year" label="年" className={classes.textField}
                    value={year} onChange={this.handleTextChange("year")}
                    margin="normal" type="normal"
                />
                <TextField id="month" label="月" className={classes.textField}
                    value={month} onChange={this.handleTextChange("month")}
                    margin="normal" type="normal"
                />
                <TextField id="week" label="周" className={classes.textField}
                    value={week} onChange={this.handleTextChange("week")}
                    margin="normal"
                />
                <TextField id="id" label="票品ID" className={classes.textField}
                    value={id} onChange={this.handleTextChange("id")}
                    margin="normal"
                />
                <TextField id="city" label="城市" className={classes.textField}
                    value={city} onChange={this.handleTextChange("city")}
                    margin="normal"
                />
                <Button variant="contained" color="primary" 
                    onClick={this.toggleQueryWeekly}
                >
                    查询
                </Button>
            </div>
        );

        const monthly = (
            <div className={classes.form}>
                <TextField id="year" label="年" className={classes.textField}
                    value={year} onChange={this.handleTextChange("year")}
                    margin="normal" type="normal"
                />
                <TextField id="month" label="月" className={classes.textField}
                    value={month} onChange={this.handleTextChange("month")}
                    margin="normal" type="normal"
                />
                <TextField id="id" label="票品ID" className={classes.textField}
                    value={id} onChange={this.handleTextChange("id")}
                    margin="normal"
                />
                <TextField id="city" label="城市" className={classes.textField}
                    value={city} onChange={this.handleTextChange("city")}
                    margin="normal"
                />
                <Button variant="contained" color="primary" 
                    onClick={this.toggleQueryMonthly}
                >
                    查询
                </Button>
            </div>
        );

        const yearly = (
            <div className={classes.form}>
                <TextField id="year" label="年" className={classes.textField}
                    value={year} onChange={this.handleTextChange("year")}
                    margin="normal" type="normal"
                />
                <TextField id="id" label="票品ID" className={classes.textField}
                    value={id} onChange={this.handleTextChange("id")}
                    margin="normal"
                />
                <TextField id="city" label="城市" className={classes.textField}
                    value={city} onChange={this.handleTextChange("city")}
                    margin="normal"
                />
                <Button variant="contained" color="primary" 
                    onClick={this.toggleQueryYearly}
                >
                    查询
                </Button>
            </div>
        );
        
        let hasData = true;
        if (!data) hasData = false;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={tab} onChange={this.handleChange}>
                        <Tab label="日报表" />
                        <Tab label="周报表" />
                        <Tab label="月报表" />
                        <Tab label="年报表" />
                    </Tabs>
                </AppBar>
                { tab === 0 && (
                    <div> 
                        {daily}
                        { hasData && <EnhancedTable data={data}/> }
                    </div>
                )
                }
                { tab === 1 && (
                    <div>
                        {weekly}
                        { hasData && <EnhancedTable data={data}/> }
                    </div>
                )}
                { tab === 2 && (<div>{monthly}{ hasData && <EnhancedTable data={data }/> }</div>) }
                { tab === 3 && (<div>{yearly}{ hasData && <EnhancedTable data={data}/> }</div>) }
            </div>
        );
    }
}

Report.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(tabStyles)(Report);
