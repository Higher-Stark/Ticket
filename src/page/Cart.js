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
import TableFooter from '@material-ui/core/TableFooter';
import TextField from '@material-ui/core/TextField';

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
            totalElements: 0,
            dirties: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        let newTotalElements = this.state.totalElements;
        newTotalElements--;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        let batchentryid = [id];
        let i;
        for ( i = 0; i < newData.length; i++) {
            if (newData[i].id === id) {
                fetch(this.DeleteBatchInCart + `?token=${token}&batchentryid=${batchentryid}`)
                    .then(response => response.headers)
                    .then(headers => {
                        let errornum = headers.get('errornum');
                        if (errornum === '0') {
                            return;
                        }
                        else if (errornum === '1') {
                            alert("尚未登录！");
                        }
                        else if (errornum === '2') {
                            alert("身份不对应！");
                        }
                        else if (errornum === '3') {
                            alert("账户被冻结！");
                        }
                        this.props.history.push('/signin');
                    })
                    .catch(e => console.log(e));
                break;
            }
        }
        newData.splice(i, 1);
        this.setState({data: newData});
        this.setState({totalElements: newTotalElements});
    };


    handleNumberEdit = (token, id,  i) => {
        fetch(this.NumberEditInCart + `?token=${token}&entryid=${id}&number=${this.state.data[i].number}`)
            .then(response => response.headers)
            .then(headers => {
                let errornum = headers.get('errornum');
                if (errornum === '0') {

                    return;
                }
                else if (errornum === '1') {
                    alert("尚未登录！");
                }
                else if (errornum === '2') {
                    alert("身份不对应！");
                }
                else if (errornum === '3') {
                    alert("账户被冻结！");
                }
                this.props.history.push('/signin');
            })
            .catch(e => console.log(e));
        let newDirty=this.state.dirties.slice();
        newDirty[i]=0;
        this.setState({dirties:newDirty});
    };


    handleChange = (event, id) => {
        if (event.target.value < 1)
            return;
        let newData = this.state.data.slice();
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === id) {
                newData[i].number = event.target.value;
                if (this.state.dirties[i] === 1)
                    break;
                else
                {
                    let newDirty=this.state.dirties.slice();
                    let newI=i;
                    newDirty[i]=1;
                    this.setState({dirties:newDirty});
                    this.timer=setTimeout(()=>{this.handleNumberEdit(token,id,newI)}, 5000);
                }

            }
        }
        this.setState({data: newData});
    };


    handleDeleteSelected = (event) => {
        let newSelected = this.state.selected.slice();
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        fetch(this.DeleteBatchInCart + `?token=${token}&batchentryid=${newSelected}`)
            .then(response => response.headers)
            .then(headers => {
                let errornum = headers.get('errornum');
                if (errornum === '0') {
                    return;
                }
                else if (errornum === '1') {
                    alert("尚未登录！");
                }
                else if (errornum === '2') {
                    alert("身份不对应！");
                }
                else if (errornum === '3') {
                    alert("账户被冻结！");
                }
                this.props.history.push('/signin');
            })
            .then(()=>{
                const {page}=this.state;
                fetch(this.QueryByUserId + `?pagenumber=${page + 1}&token=${token}`)
                    .then(response => {
                            let errornum = response.headers.get('errornum');
                            if (errornum === '0') {
                                return response.status === 200 ? response.json() : null;
                            }
                            else if (errornum === '1') {
                                alert("尚未登录！");
                            }
                            else if (errornum === '2') {
                                alert("身份不对应！");
                            }
                            else if (errornum === '3') {
                                alert("账户被冻结！");
                            }
                            this.props.history.push('/signin');
                        }
                    )
                    .then(data => {
                        if (data === null) throw Error("Response error!");
                        this.setState({
                            data: data.content,
                            totalElements: data.totalElements
                        });
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
        this.setState({selected: []});
    };

    handleCheck=()=>{
        let cartProducts=[];
        const {selected,data}=this.state;
        for (let i = 0; i < selected.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (selected[i] === data[j].id) {
                    cartProducts.push(data[j]);
                }
            }
        }
        let storage = window.localStorage;
        storage.setItem("cartProducts", JSON.stringify(cartProducts));
        storage.setItem("orderType","orderInCart");
        clearTimeout(this.timer);
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        for(let k=0;k<16;k++)
        {
            if(this.state.dirties[k])
                this.handleNumberEdit(token,this.state.data[k].id,k);
        }
        window.location.href = "/orderconfirm";
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        clearTimeout(this.timer);
        for(let k=0;k<16;k++)
        {
            if(this.state.dirties[k])
                this.handleNumberEdit(token,this.state.data[k].id,k);
        }
        fetch(this.QueryByUserId + `?pagenumber=${page + 1}&token=${token}`)
            .then(response => {
                    let errornum = response.headers.get('errornum');
                    if (errornum === '0') {
                        return response.status === 200 ? response.json() : null;
                    }
                    else if (errornum === '1') {
                        alert("尚未登录！");
                    }
                    else if (errornum === '2') {
                        alert("身份不对应！");
                    }
                    else if (errornum === '3') {
                        alert("账户被冻结！");
                    }
                    this.props.history.push('/signin');
                }
            )
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: data.content,
                    totalElements: data.totalElements
                });
            })
            .catch(e => console.log(e));
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
        let token = user === null ? '' : user.token;
        fetch(this.QueryByUserId + `?pagenumber=${page + 1}&token=${token}`)
            .then(response => {
                    let errornum = response.headers.get('errornum');
                    if (errornum === '0') {
                        return response.status === 200 ? response.json() : null;
                    }
                    else if (errornum === '1') {
                        alert("尚未登录！");
                    }
                    else if (errornum === '2') {
                        alert("身份不对应！");
                    }
                    else if (errornum === '3') {
                        alert("账户被冻结！");
                    }
                    this.props.history.push('/signin');
                }
            )
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: data.content,
                    totalElements: data.totalElements
                });
            })
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        const {data, selected, rowsPerPage, page, totalElements} = this.state;
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
                                    totalPrice += isSelected * n.price * n.number;
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
                                                        <img src={n.image} className={classes.image}
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
                                                        <Typography variant='subheading' color='inherit'>
                                                            {n.date}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell numeric>￥{n.price}</TableCell>
                                            <TableCell numeric>
                                                <TextField id='quantity' type='number' margin='normal'
                                                           value={n.number}
                                                           onChange={event => this.handleChange(event, n.id)}/>
                                            </TableCell>
                                            <TableCell numeric>￥{n.price * n.number}</TableCell>
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
                                    <Button disabled={selected.length === 0} onClick={() => this.handleCheck()}>结算</Button>
                                </TableCell>
                                <TablePagination
                                    count={totalElements}
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