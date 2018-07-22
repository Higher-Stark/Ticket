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

import {Cards} from "../test-data/Cards";

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: '商品信息'},
    {id: 'calories', numeric: true, disablePadding: false, label: '单价'},
    {id: 'fat', numeric: true, disablePadding: false, label: '数量'},
    {id: 'carbs', numeric: true, disablePadding: false, label: '金额'},
    {id: 'protein', numeric: true, disablePadding: false, label: '操作'},
];


class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

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
                    {columnData.map(column => {
                        return (
                            <TableCell
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
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
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
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: Cards,
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

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
        for (; i < newData.length; i++) {
            if (newData[i].id === id)
                break;
        }
        newData.splice(i, 1);
        this.setState({data: newData});
    };

    handleSub = (event, id) => {
        let newData = this.state.data.slice();
        let i = 0;
        for (; i < newData.length; i++) {
            if (newData[i].id === id) {
                newData[i].quantity--;
                break;
            }
        }
        this.setState({data: newData});
    };

    handleAdd = (event, id) => {
        let newData = this.state.data.slice();
        let i = 0;
        for (; i < newData.length; i++) {
            if (newData[i].id === id) {
                newData[i].quantity++;
                break;
            }
        }
        this.setState({data: newData});
    };


    handleDeleteSelected = (event) => {
        let newData = this.state.data.slice();
        let newSelected = this.state.selected.slice();
        let i = 0;
        let id = 0;
        console.log(this.state.selected);
        let length = newData.length;
        for (; id < newSelected.length; id++) {
            console.log(id);
            for (; i < length; i++) {
                if (newData[i].id === newSelected[id])
                    break;
            }
            newData.splice(i, 1);
        }
        this.setState({data: newData});
        this.setState({selected: []});
    };


    handleChangePage = (event, page) => {
        this.setState({page});
    };

    detail = (id) => {
        this.props.history.push("/detail/"+id)
    };


    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        console.log(selected);
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        let totalPrice = 0;
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
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
                                            <TableCell numeric
                                                       onClick={event => this.handleDelete(event, n.id)}>删除</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Button disabled={selected.length === 0}
                                            onClick={event => this.handleDeleteSelected(event)}>
                                        批量删除
                                    </Button>
                                </TableCell>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell
                                > 合计：￥{totalPrice}
                                </TableCell>
                                <TableCell>
                                    <Button disabled={totalPrice === 0}>结算</Button>
                                </TableCell>

                            </TableRow>
                        </TableHead>
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