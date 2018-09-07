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
                        我的收藏
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
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

class Collection extends React.Component {
    QueryByUserId = "http://pipipan.cn:30012/Collection/QueryByUserId";
    DeleteBatch = "http://pipipan.cn:30012/Collection/DeleteBatch";

    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 8,
            totalElements: 0,
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
        const {rowsPerPage} = this.state;
        let newData = this.state.data.slice();
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        let batchcollectionid = [id];
        let i;
        for (i = 0; i < newData.length; i++) {
            if (newData[i].id === id) {
                fetch(this.DeleteBatch + `?token=${token}&batchcollectionid=${batchcollectionid}`)
                    .then(response => response.headers)
                    .then(headers => {
                        let errornum = headers.get('errornum');
                        console.log(errornum);
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
                    .then(() => {
                        const {page} = this.state;
                        fetch(this.QueryByUserId + `?pagenumber=${Math.floor(page/2)  + 1}&token=${token}`)
                            .then(response => {
                                    let errornum = response.headers.get('errornum');
                                    console.log(errornum);
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
                                    data: page%2?data.content.slice(rowsPerPage):data.content.slice(0,rowsPerPage),
                                    totalElements: data.totalElements
                                });
                            })
                            .catch(e => console.log(e));
                    })
                    .catch(e => console.log(e));
                break;
            }
        }
    };

    handleDeleteSelected = () => {
        const {rowsPerPage} = this.state;
        let newSelected = this.state.selected.slice();
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        fetch(this.DeleteBatch + `?token=${token}&batchcollectionid=${newSelected}`)
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
            .then(() => {
                const {page} = this.state;
                fetch(this.QueryByUserId + `?pagenumber=${Math.floor(page/2)  + 1}&token=${token}`)
                    .then(response => {
                            let errornum = response.headers.get('errornum');
                            console.log(errornum);
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
                            data: page%2?data.content.slice(rowsPerPage):data.content.slice(0,rowsPerPage),
                            totalElements: data.totalElements
                        });
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
        this.setState({selected: []});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        clearTimeout(this.timer);
        const {rowsPerPage} = this.state;
        fetch(this.QueryByUserId + `?pagenumber=${Math.floor(page/2)  + 1}&token=${token}`)
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
                console.log(data);
                this.setState({
                    data: page%2?data.content.slice(rowsPerPage):data.content.slice(0,rowsPerPage),
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
        const {rowsPerPage} = this.state;
        fetch(this.QueryByUserId + `?pagenumber=${Math.floor(page/2)  + 1}&token=${token}`)
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
                    data: page%2?data.content.slice(rowsPerPage):data.content.slice(0,rowsPerPage),
                    totalElements: data.totalElements
                });
            })
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        const {data, selected, rowsPerPage, page, totalElements} = this.state;
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
                                                       padding="none" onClick={() => this.detail(n.ticketId)}>
                                                <Grid container spacing={8} key={n.id}>
                                                    <Grid item xs={6}>
                                                        <img src={n.image} className={classes.image}
                                                             alt={n.title}/>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant='subheading' component='h3' color='primary'
                                                                    className={classes.title}>
                                                            {`[${n.title}]`}
                                                        </Typography>
                                                        <Typography variant='caption' gutterBottom>
                                                            {n.intro}
                                                        </Typography>
                                                        <Typography variant='caption' color='inherit' gutterBottom>
                                                            {n.date}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
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
                                <TableCell/>
                                <TableCell/>
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

Collection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Collection);