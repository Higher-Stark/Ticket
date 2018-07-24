import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter'

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

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
        const {classes, count, page, rowsPerPage, theme} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
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
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
    TablePaginationActions,
);


const columnData = [
    {numeric: false, disablePadding: true, label: '商品信息'},
    {numeric: true, disablePadding: false, label: '单价'},
    {numeric: true, disablePadding: false, label: '数量'},
    {numeric: true, disablePadding: false, label: '金额'},
    {numeric: true, disablePadding: false, label: '操作'},
];


class EnhancedTableHead extends React.Component {
    render() {
        const {onSelectAllClick, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map((column, i) => {
                        return (
                            <TableCell
                                key={i}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                {column.label}
                            </TableCell>
                        );
                    }, this)}

                </TableRow>
            </TableHead>
        );
    }
}


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
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
    },
});

let EnhancedTableToolbar = props => {
    const {numSelected, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        购物车
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
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
    image: {
        width: '100%',
        align: 'center',
    },
    info: {
        width: '20%',
    }

});

class Cart extends React.Component {
    QueryByUserId = "http://pipipan.cn:30007/Cart/QueryByUserId";
    NumberEditInCart = "http://pipipan.cn:30007/Cart/NumberEditInCart";
    DeleteBatchInCart = "http://pipipan.cn:30007/Cart/DeleteBatchInCart";

    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 16,
        };
    }

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleDelete = (event, id) => {
        let newData = this.state.data.slice();
        let i = 0;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;
        let batchentryid = [id];
        for (; i < newData.length; i++) {
            if (newData[i].id === id) {
                fetch(this.DeleteBatchInCart + `?token=${token}&batchentryid=${batchentryid}`)
                    .then(response => response.headers)
                    .then(headers => {
                        console.log(headers);
                        alert("添加成功！");
                    })
                    .catch(e => console.log(e));
                break;
            }
        }
        newData.splice(i, 1);
        this.setState({data: newData});
    };

    handleSub = (event, id) => {
        let newData = this.state.data.slice();
        let i = 0;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;
        for (; i < newData.length; i++) {
            if (newData[i].id === id) {
                newData[i].quantity--;
                fetch(this.NumberEditInCart + `?token=${token}&entryid=${id}&number=${newData[i].quantity}`)
                    .then(response => response.headers)
                    .then(headers => {
                        console.log(headers);
                        alert("添加成功！");
                    })
                    .catch(e => console.log(e));
                break;
            }
        }
        this.setState({data: newData});
    };

    handleAdd = (event, id) => {
        let newData = this.state.data.slice();
        let i = 0;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;
        for (; i < newData.length; i++) {
            if (newData[i].id === id) {
                newData[i].quantity++;
                fetch(this.NumberEditInCart + `?token=${token}&entryid=${id}&number=${newData[i].quantity}`)
                    .then(response => response.headers)
                    .then(headers => {
                        console.log(headers);
                        alert("添加成功！");
                    })
                    .catch(e => console.log(e));
                break;
            }
        }
        this.setState({data: newData});
    };


    handleDeleteSelected = (event) => {
        let newData = this.state.data.slice();
        let newSelected = this.state.selected.slice();
        let i = 0;
        let j = 0;
        console.log(this.state.selected);
        let length = newData.length;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;
        for (; i < newSelected.length; i++) {
            console.log(i);
            for (; j < length; j++) {
                if (newSelected[i] === newData[j].id) {
                    fetch(this.DeleteBatchInCart + `?token=${token}&batchentryid=${newSelected}`)
                        .then(response => response.headers)
                        .then(headers => {
                            console.log(headers);
                            alert("添加成功！");
                        })
                        .catch(e => console.log(e));
                    break;
                }
            }
            newData.splice(i, 1);
        }
        this.setState({data: newData});
        this.setState({selected: []});
    };


    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    detail = (id) => {
        this.props.history.push("/detail/" + id)
    };


    isSelected = id => this.state.selected.indexOf(id) !== -1;


    componentWillMount() {
        const {page} = this.state;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user.token;
        fetch(this.QueryByUserId + `?pagenumber=${page + 1}&token=${token}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: data.content,
                    totalPages: data.totalPages
                });
            })
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        const {data, selected, rowsPerPage, page} = this.state;
        let totalPrice = 0;
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    totalPrice += isSelected * n.price * n.quantity;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox"
                                                       onClick={event => this.handleClick(event, n.id)}>
                                                <Checkbox checked={isSelected}/>
                                            </TableCell>
                                            <TableCell className={classes.info} component="th" scope="row"
                                                       padding="none" onClick={() => this.detail(n.id)}>
                                                <Grid container spacing={8} className={classes.root} key={n.id}>
                                                    <Grid item xs={6}>
                                                        <img src={n.images.s3_4} className={classes.image}
                                                             alt={n.title}/>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant='title' component='h2' color='primary'
                                                                    className={classes.title}>
                                                            {`[${n.title}]`}
                                                        </Typography>
                                                        <Typography variant='subheading' color='secondary'>
                                                            {n.city}{' '}{n.venue}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell numeric>￥{n.price}</TableCell>
                                            <TableCell
                                                numeric><Button disabled={n.quantity === 1}
                                                                onClick={event => this.handleSub(event, n.id)}>-</Button>{n.quantity}<Button
                                                onClick={event => this.handleAdd(event, n.id)}>+</Button></TableCell>
                                            <TableCell numeric>￥{n.price * n.quantity}</TableCell>
                                            <TableCell numeric><Button
                                                onClick={event => this.handleDelete(event, n.id)}>删除</Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>
                                    <Button disabled={selected.length === 0}
                                            onClick={event => this.handleDeleteSelected(event)}>
                                        批量删除
                                    </Button>
                                </TableCell>
                                <TableCell
                                > 合计：￥{totalPrice}
                                </TableCell>
                                <TableCell>
                                    <Button disabled={totalPrice === 0}>结算</Button>
                                </TableCell>
                                <TablePagination
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    labelRowsPerPage={''}
                                    rowsPerPageOptions={[]}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);