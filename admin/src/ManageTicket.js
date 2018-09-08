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
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";

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
    {numeric: false, disablePadding: true, label: '票品信息'},
    {numeric: false, disablePadding: false, label: '类型简介'},
    {numeric: true, disablePadding: false, label: '价格范围'},
    {numeric: true, disablePadding: false, label: '库存'},
    {numeric: false, disablePadding: false, label: '操作'},
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
                        票品管理
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

class ManageTicket extends React.Component {
    Delete = "http://pipipan.cn:30005/Manager/Delete";

    constructor(props) {
        super(props);

        this.state = {
            edit:-1,
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 9,
            totalElements: 0,
            add:false,
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

    toggleEdit = (i) => {
        this.oldInfo = Object.assign({}, this.state.data[i]);
        this.setState({
            edit: i,
        });
    };

    toggleSave = (i) => {
        const {id,type,startDate,endDate,time,city,venue,title,image,intro,stock,lowprice,highprice} = this.state.data[i];
        //检验信息齐全
        if (type.length === 0) {
            alert("信息不齐！");
            return;
        }
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);
        let token = admin === null ? '' : admin.token;
        this.setState({
            edit: -1,
        });
    };

    toggleCancel = (i) => {
        let newData = this.state.data.slice();
        newData[i] = this.oldInfo;
        this.setState({
            data: newData,
            edit: -1,
        });
    };

    handleDelete = (event, id) => {
        const {rowsPerPage} = this.state;
        let newData = this.state.data.slice();
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);
        let token = admin === null ? '' : admin.token;
        let ticketids = [id];
        let i;
        for (i = 0; i < newData.length; i++) {
            if (newData[i].id === id) {
                console.log(this.Delete + `?token=${token}&ticketids=${ticketids}`);
                fetch(this.Delete + `?token=${token}&ticketids=${ticketids}`)
                    .then(response => response.headers)
                    .then(headers => {
                        let errornum = headers.get('errornum');
                        if (errornum === '2') {
                            return;
                        }
                        else if (errornum === '1') {
                            alert("尚未登录！");
                        }
                        else if (errornum === '0') {
                            alert("身份不对应！");
                        }
                        else if (errornum === '3') {
                            alert("账户被冻结！");
                        }
                        this.props.history.push('/signin');
                    })
                    .then(() => {
                        const {page} = this.state;
                        const url = `http://pipipan.cn:30005/Ticket/QueryShowPage?pagenumber=${Math.floor(page / 2) + 1}`;
                        console.log(url);
                        fetch(url, {
                            method: 'GET',
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data === null) throw Error("Response error!");
                                this.setState({
                                    data: page % 2 ? data.content.slice(rowsPerPage) : data.content.slice(0, rowsPerPage),
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
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);
        let token = admin === null ? '' : admin.token;
        console.log(this.Delete + `?token=${token}&ticketids=${newSelected}`);
        fetch(this.Delete + `?token=${token}&ticketids=${newSelected}`)
            .then(response => response.headers)
            .then(headers => {
                let errornum = headers.get('errornum');
                if (errornum === '2') {
                    return;
                }
                else if (errornum === '1') {
                    alert("尚未登录！");
                }
                else if (errornum === '0') {
                    alert("身份不对应！");
                }
                else if (errornum === '3') {
                    alert("账户被冻结！");
                }
                this.props.history.push('/signin');
            })
            .then(() => {
                const {page} = this.state;
                const url = `http://pipipan.cn:30005/Ticket/QueryShowPage?pagenumber=${Math.floor(page / 2) + 1}`;
                console.log(url);
                fetch(url, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data === null) throw Error("Response error!");
                        this.setState({
                            data: page % 2 ? data.content.slice(rowsPerPage) : data.content.slice(0, rowsPerPage),
                            totalElements: data.totalElements
                        });
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
        this.setState({selected: []});
    };

    handleAdd = () => {
        this.setState({add:true});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
        const {rowsPerPage} = this.state;
        fetch(`http://pipipan.cn:30005/Ticket/QueryShowPage?pagenumber=${Math.floor(page / 2) + 1}`)
            .then(response => {
                    return response.status === 200 ? response.json() : null;
                }
            )
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: page % 2 ? data.content.slice(rowsPerPage) : data.content.slice(0, rowsPerPage),
                    totalElements: data.totalElements
                });
            })
            .catch(e => console.log(e));
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    componentWillMount() {
        const {page, rowsPerPage} = this.state;
        const url = `http://pipipan.cn:30005/Ticket/QueryShowPage?pagenumber=${Math.floor(page / 2) + 1}`;
        console.log(url);
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: page % 2 ? data.content.slice(rowsPerPage) : data.content.slice(0, rowsPerPage),
                    totalElements: data.totalElements
                });
            })
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        const {data, selected, rowsPerPage, page, totalElements,edit} = this.state;
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
                                .map((n,i) => {
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
                                                            {n.city}{' '}{n.venue}
                                                        </Typography>
                                                        <Typography variant='caption' color='inherit' gutterBottom>
                                                            From{n.startDate}to{n.endDate}{' '}{n.time}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>{n.type}{':'}{n.intro}</TableCell>
                                            <TableCell numeric>￥{n.lowprice}-￥{n.highprice}</TableCell>
                                            <TableCell numeric>
                                                           {n.stock}
                                            </TableCell>
                                            <TableCell numeric>
                                                {
                                                    edit === i ?<div>
                                                            <Button variant='fab' color='secondary'
                                                                    onClick={() => this.toggleSave(i)}
                                                                    className={classNames(classes.action, classes.button)}>
                                                                <SaveIcon/>
                                                            </Button>
                                                            <Button variant='fab' color='primary'
                                                                    onClick={() => this.toggleCancel(i)}
                                                                    className={classNames(classes.action, classes.button)}>
                                                                <ClearIcon/>
                                                            </Button>
                                                        </div>:
                                                    <Button onClick={() => this.toggleEdit(i)}><EditIcon/></Button>
                                                }
                                                <Button onClick={event => this.handleDelete(event, n.id)}>删除</Button>
                                            </TableCell>

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
                                >
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => this.handleAdd()}>添加新票品</Button>
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

ManageTicket.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageTicket);