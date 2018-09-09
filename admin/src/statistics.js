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
            data: fakeData,
            page: 0, 
            rowsPerPage: 5,
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
};

export default withStyles(styles)(EnhancedTable);