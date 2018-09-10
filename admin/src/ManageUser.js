import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({

    root: {
        ...theme.mixins.gutters(),
        width: 'inherit',//'100%'
        marginTop: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    padding: {
        padding: theme.spacing.unit,
    },
    imageSec: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        margin: 'auto auto',
        borderRadius: '50%',
    },
    textField: {
        maxWidth: 540,
        minWidth: 160,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    actions: {
        display: 'block',
        justifyContent: 'right',
    },
    action: {
        display: 'block',
        float: 'right',
    },
    label: {
        display: 'inline-block',
        paddingRight: theme.spacing.unit,
    },
    block: {
        display: 'block',
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    imgGrid: {
        marginTop: theme.spacing.unit * 3,
        flexGrow: 1,
    },
    inline: {
        display: 'inline-block',
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'inherit',
        justifyContent: 'center',
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: `0 ${theme.spacing.unit}ps`,
        minWidth: 160,
    },
    updateButton: {
        flexGrow: 1,
        maxWidth: 100,
        margin: `${theme.spacing.unit}px auto`,
    },
    form: {
        display: 'block',
        width: '36%',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
        justifyContent: 'center',
    },
    password: {
        display: 'block',
        margin: theme.spacing.unit,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
});

function createData(id, username, password, email, status,authority) {

    return { id: id, username, password, email, status, authority };
}

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
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'id', numeric: false, disablePadding: true, label: 'id' },
    { id: 'username', numeric: true, disablePadding: false, label: 'username' },
    { id: 'password', numeric: true, disablePadding: false, label: 'password' },
    { id: 'email', numeric: true, disablePadding: false, label: 'email' },
    { id: 'status', numeric: true, disablePadding: false, label: 'status' },
    { id: 'authority', numeric: true, disablePadding: false, label: 'authority' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                >
                                    <TableSortLabel
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
        flex: '1 1 80%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes ,handleDelete, handleModify} = props;

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
                        用户
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Grid container justify="center">
                        <Grid item>
                            <Tooltip title="Delete">
                                <IconButton aria-label="Delete">
                                    <DeleteIcon onClick = { handleDelete}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="modify">
                                <IconButton aria-label="Delete">
                                    <BuildIcon onClick = { handleModify}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleModify: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class ManageUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: [],
            page: 1,
            rowsPerPage: 9,
            totalPage:null,
            currentPage:null,
            totalElement:null,
            open: false,
            elementToModify:null,
            modifyPassword:null,
            modifyStatus:null,
            deleteStatus:0,
        };
    }

    componentWillMount() {
        this.fetchUserFromBackend(1);
    }

    componentDidMount() {

    }

    fetchUserFromBackend = (pagenumber) => {
        let storage = window.sessionStorage;
        let admin = JSON.parse(storage.getItem("admin"));
        if(admin === null)
            return;
        let token = admin === null ? '' : admin.token;
        let s = `token=${token}&pagenumber=${pagenumber}`;
        fetch('http://pipipan.cn:30009/Manager/QueryBatch', {
            method: 'POST',
            body: s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include"
        })
            .then(response => {
                let errornum = response.headers.get('errornum');
                console.log(errornum);
                if (errornum === '0') {
                    if (response.status !== 200) throw Error("Error !" + response);
                    return response.text();
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
            })
            .then((text) => {
                text = JSON.parse(text);
                console.log(text);
                var content = text.content;
                console.log(content);
                let tmpData = [];
                for(var id in content){
                    var eachUser = content[id];
                    tmpData.push(createData(eachUser.id,eachUser.username,eachUser.password,eachUser.email,eachUser.status,eachUser.authority))
                }
                var tmpTotalPage = Math.ceil(text.totalElements/this.state.rowsPerPage);
                this.setState({
                    data : tmpData,
                    totalPage : tmpTotalPage,
                    page : pagenumber-1,
                    totalElement : text.totalElements
                });
                console.log("hello");
            })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleClick = (event, id) => {
        let selectIndex = this.state.selected.indexOf(id);
        let newSelected = [];
        if(selectIndex === -1)
            newSelected.push(id);
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
        this.fetchUserFromBackend(page+1);
    };

    handleDelete = () => {
        console.log("delete");
        console.log(this.state.selected);
        let storage = window.sessionStorage;
        let admin = JSON.parse(storage.getItem("admin"));
        let token = admin === null ? '' : admin.token;
        if(this.state.selected.length == 0)
            return;
        let s = `token=${token}&id=${this.state.selected[0]}`;
        console.log("the s "+s)
        console.log("current page " + this.state.page)
        fetch('http://pipipan.cn:30009/Manager/Delete', {
            method: 'POST',
            body: s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include"
        })
            .then(response => {
                let errornum = response.headers.get('errornum');
                console.log(errornum);
                if (errornum === '0') {
                    if (response.status !== 200){
                        this.setState({
                            deleteStatus : 1,
                        })
                    };
                    return response.text();
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
            })
            .then((text) => {
                if(this.state.deleteStatus === 1)
                    return;
                text = JSON.parse(text);
                console.log(text);
                this.setState({
                    selected : []
                })
                this.fetchUserFromBackend(this.state.page+1);
                alert("删除成功!")
            })
    };

    handleModify = () => {
        console.log("modify");
        var find = false;
        for(var eachElementIndex in this.state.data){
            var eachElement = this.state.data[eachElementIndex];
            if(eachElement.id === this.state.selected[0]){
                find = true;
                this.setState({
                    elementToModify:eachElement,
                })
                this.handleOpen();
            }
        }
        if(!find){
            let storage = window.sessionStorage;
            let admin = JSON.parse(storage.getItem("admin"));
            let token = admin === null ? '' : admin.token;
            let s = `token=${token}&id=${this.state.selected[0]}`;

            fetch('http://pipipan.cn:30009/Manager/QueryById', {
                method: 'POST',
                body: s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                    let errornum = response.headers.get('errornum');
                    console.log(errornum);
                    if (errornum === '0') {
                        if (response.status !== 200) throw Error("Error !" + response);
                        return response.text();
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
                })
                .then((text) => {
                    text = JSON.parse(text);
                    console.log(text);
                    this.setState({
                        elementToModify : text
                    }),
                    console.log("not find");
                    this.handleOpen();
                })
        }
    };

    cancelClick = () => {
        console.log("in cancel click");
        this.setState({
            selected : []
        })
    };

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            modifyPassword:null,
            modifyStatus:null
        });
        this.fetchUserFromBackend(this.state.page+1);
    };

    handleSubmit = () =>{
        //change status
        if(this.state.modifyStatus != null && this.state.modifyStatus != this.state.elementToModify.status){
            if(this.state.modifyStatus != 'UnActive' && this.state.modifyStatus != 'Active' && this.state.modifyStatus != 'Frozen'){
                alert("the status should be 'Active' or 'UnActive' or 'Frozen', your input form is wrong. Please Submit Again!")
                this.handleClose();
            }
            else {
                let storage = window.sessionStorage;
                let admin = JSON.parse(storage.getItem("admin"));
                let token = admin === null ? '' : admin.token;
                let s = `token=${token}&id=${this.state.selected[0]}&status=${this.state.modifyStatus}`;
                fetch('http://pipipan.cn:30009/Manager/UpdateStatus', {
                    method: 'POST',
                    body: s,
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }),
                    credentials: "include"
                })
                    .then(response => {
                        let errornum = response.headers.get('errornum');
                        console.log(errornum);
                        if (errornum === '0') {
                            if (response.status !== 200) throw Error("Error !" + response);
                            return response.text();
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
                    })
                    .then((text) => {
                        console.log(text);
                        this.handleClose();
                        this.fetchUserFromBackend(this.state.page+1);
                    })
            };
        }
        //change password
        if(this.state.modifyPassword != null && this.state.modifyPassword != this.state.elementToModify.password){
            let storage = window.sessionStorage;
            let admin = JSON.parse(storage.getItem("admin"));
            let token = admin === null ? '' : admin.token;
            let s = `token=${token}&id=${this.state.selected[0]}&password=${this.state.modifyPassword}`;
            fetch('http://pipipan.cn:30009/Manager/UpdatePassword', {
                method: 'POST',
                body: s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                    let errornum = response.headers.get('errornum');
                    console.log(errornum);
                    if (errornum === '0') {
                        if (response.status !== 200) throw Error("Error !" + response);
                        return response.text();
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
                })
                .then((text) => {
                    console.log(text);
                    this.handleClose();
                    this.fetchUserFromBackend(this.state.page+1);
                })
        }
        this.handleClose();
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleModifyPassword = event => {
        console.log("the new password " + event.target.value)
        this.setState({ modifyPassword: event.target.value });
    };

    handleModifyStatus = event => {
        this.setState({ modifyStatus: event.target.value });
    };

    loadModifyElement = (segment) =>{

    };

    render() {
        const {classes} = this.props;

        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}
                                      handleDelete = {this.handleDelete}
                                      handleModify = {this.handleModify}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.cancelClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.id}
                                            </TableCell>
                                            <TableCell numeric>{n.username}</TableCell>
                                            <TableCell numeric>{n.password}</TableCell>
                                            <TableCell numeric>{n.email}</TableCell>
                                            <TableCell numeric>{n.status}</TableCell>
                                            <TableCell numeric>{n.authority}</TableCell>
                                        </TableRow>
                                    );
                                })}

                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={this.state.totalElement}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                />

                <Modal arialabelledy="simple-model-title" ariadescribeby="simple-modal-description"
                       open={this.state.open} onClose={this.handleClose}
                >
                    <Paper className={classes.root} elevation={1}  style={{marginTop: "15%",marginLeft:"30%",marginRight:"30%"}}>
                        <Grid container spacing={24}>
                            <Grid item xs={1} style={{marginTop: "1.5%"}}/>
                            <Grid item xs={3} style={{textAlign: 'center', marginTop: "1.5%"}}>
                                <TextField
                                    id="read-only-input"
                                    label="Id"
                                    defaultValue={this.state.elementToModify==null?"":this.state.elementToModify.id}
                                    className={classes.textField}
                                    margin="normal"
                                    style={{textAlign: 'center'}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1} style={{marginTop: "1.5%"}}/>
                            <Grid item xs={7} style={{marginTop: "1.5%"}}>
                                <TextField
                                    id="read-only-input"
                                    label="Username"
                                    defaultValue={this.state.elementToModify==null?"":this.state.elementToModify.username}
                                    className={classes.textField}
                                    margin="normal"
                                    style={{textAlign: 'center'}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/**/}
                            <Grid item xs={1}/>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                                <TextField
                                    id="Password"
                                    label="Password-mutable"
                                    defaultValue={this.state.elementToModify==null?"":this.state.elementToModify.password}
                                    value = {this.state.modifyPassword}
                                    className={classes.textField}
                                    margin="normal"
                                    style={{textAlign: 'center'}}
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    onChange={this.handleModifyPassword}
                                />
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={7}>
                                <TextField
                                    id="read-only-input"
                                    label="Email"
                                    defaultValue={this.state.elementToModify==null?'':this.state.elementToModify.email}
                                    className={classes.textField}
                                    margin="normal"
                                    style={{textAlign: 'center'}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                                <TextField
                                    id="Status"
                                    label="Status-mutable"
                                    defaultValue={this.state.elementToModify==null?"":this.state.elementToModify.status}
                                    value = {this.state.modifyStatus}
                                    className={classes.textField}
                                    margin="normal"
                                    style={{textAlign: 'center'}}
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    onChange={this.handleModifyStatus}
                                />
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={7}>
                                <TextField
                                    id="read-only-input"
                                    label="Authority"
                                    defaultValue={this.state.elementToModify==null?"":this.state.elementToModify.authority}
                                    className={classes.textField}
                                    margin="normal"
                                    style={{textAlign: 'center'}}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={3} style={{textAlign: 'center'}}>
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={7}>
                                <Button color="primary" className={classes.button} onClick = {this.handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
            </Paper>
        );
    }
}

ManageUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageUser);