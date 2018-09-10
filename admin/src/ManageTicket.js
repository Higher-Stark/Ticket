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
import TextField from "@material-ui/core/TextField";


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
    {numeric: false, disablePadding: true, label: '票品封面'},
    {numeric: false, disablePadding: false, label: '具体信息'},
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
    const { classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: false,
            })}
        >
            <div className={classes.title}>
                {(
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
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },

});

let engChi = new Map([]);
engChi.set("nickName", "昵称");
engChi.set("nickname", "昵称");
engChi.set("phone", "手机");
engChi.set("address", "地址");
engChi.set("account", "账户余额");
engChi.set("type", "类型");
engChi.set("startDate", "开始日期");
engChi.set("endDate", "结束日期");
engChi.set("time", "时间");
engChi.set("city", "城市");
engChi.set("venue", "地址");
engChi.set("title", "票名");
engChi.set("intro", "简介");
engChi.set("stock", "库存");
engChi.set("lowprice", "最低价");
engChi.set("highprice", "最高价");

const chinese = function (key) {
    return engChi.get(key) || key;
};

const urlEncode = function (obj) {
    const pairs = Object.entries(obj);
    let res = [];
    pairs.forEach(p => res.push(`${p[0]}=${p[1]}`));
    return res.join('&');
};


class ManageTicket extends React.Component {
    Delete = "http://pipipan.cn:30005/Manager/Delete";
    Update = "http://pipipan.cn:30005/Manager/Update";
    Add = "http://pipipan.cn:30005/Manager/Add";

    constructor(props) {
        super(props);

        this.state = {
            idx:-1,
            edit: -1,
            selected: [],
            data: [
                {
                    id: 0,
                    type: '',
                    startDate: '',
                    endDate: '',
                    time: '',
                    city: '',
                    venue: "",
                    title: '',
                    image: '',
                    intro: '',
                    stock: 0,
                    lowprice: 0,
                    highprice: 0,
                }
            ],
            addData: [
                {
                    id: 0,
                    type: '',
                    startDate: '',
                    endDate: '',
                    time: '',
                    city: '',
                    venue: "",
                    title: '',
                    image: '',
                    intro: '',
                    stock: 0,
                    lowprice: 0,
                    highprice: 0,
                }
            ],
            page: 0,
            rowsPerPage: 8,
            totalElements: 0,
            add: false,
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

    updateTicketInfo = (i, name) => event => {
        const {data} = this.state;
        data[i][name] = event.target.value;
        this.setState({data});
    };

    AddTicketInfo = (name) => event => {
        const {addData} = this.state;
        addData[0][name] = event.target.value;
        this.setState({addData});
    };

    toggleEdit = (i) => {
        this.oldInfo = Object.assign({}, this.state.data[i]);
        this.setState({
            edit: i,
        });
    };

    toggleSave = (i) => {
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);
        let token = admin === null ? '' : admin.token;
        this.setState({
            edit: -1,
        });

        const {id, type, startDate, endDate, time, city, venue, title, intro, stock, lowprice, highprice} = this.state.data[i];

        let body = {
            token: token,
            ticketid: id,
            type: type,
            startDate: startDate,
            endDate: endDate,
            time: time,
            city: city,
            venue: venue,
            title: title,
            intro: intro,
            stock: stock,
            lowprice: lowprice,
            highprice: highprice
        };
        console.log(this.Update + '?' + urlEncode(body));
        fetch(this.Update, {
            method: 'POST',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: urlEncode(body),
        }).then(response => {
            let headers = response.headers;
            //console.log(headers.get("errornum"));
            switch (headers.get("errornum")) {
                case '2' :
                    alert('修改成功！');
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '0' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(ticket => {
                console.log(ticket);
                /*let newData = ticket;
                if (newData.type === null)
                    newData.type = '';
                if (newData.startDate === null)
                    newData.startDate = '';
                if (newData.endDate === null)
                    newData.endDate = '';
                if (newData.time === null)
                    newData.time = '';
                if (newData.city === null)
                    newData.city = '';
                if (newData.venue === null)
                    newData.venue = '';
                if (newData.title === null)
                    newData.title = '';
                if (newData.intro === null)
                    newData.intro = '';
                if (newData.stock === null)
                    newData.stock = 0;
                if (newData.lowprice === null)
                    newData.lowprice = 0;
                if (newData.highprice === null)
                    newData.highprice = 0;
                const {data} = this.state;
                data[i] = newData;
                this.setState({data});*/

            })
            .catch(e => {
                alert(e.message);
            })
    };

    dateCheck= (date) =>{
        let a = /^(\d{4})-(\d{2})-(\d{2})$/
        if (!a.test(date)) {
           return 1;
        }
        return 0;
    };

    toggleSaveAdd = () => {
        const{rowsPerPage}=this.state;
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);
        let token = admin === null ? '' : admin.token;
        const { type, startDate, endDate, time, city, venue, title, intro, stock, lowprice, highprice, file} = this.state.addData[0];
        if (type === '' ||
            startDate === '' ||
            endDate === '' ||
            time === '' ||
            city === '' ||
            venue === "" ||
            title === '' ||
            file === '' ||
            intro === '' ||
            stock === '' ||
            lowprice === '' ||
            highprice === '') {
            alert("信息不全！");
            return;
        }
        switch(this.dateCheck(startDate))
        {
            case 0:
                break;
            case 1:
                alert("开始日期格式不正确，格式应为yyyy-mm-dd");
                return;
            default:
                alert("未知错误！");
                return;
        }
        switch(this.dateCheck(endDate))
        {
            case 0:
                break;
            case 1:
                alert("结束日期格式不正确，格式应为yyyy-mm-dd");
                return;
            default:
                alert("未知错误！");
                return;
        }
        let formData = new FormData();
        console.log(token);
        console.log(type);
        console.log(startDate);
        console.log(endDate);
        console.log(time);
        console.log(city);
        console.log(venue);
        console.log(title);
        console.log(intro);
        console.log(stock);
        console.log(lowprice);
        console.log(highprice);
        formData.append("token", token);
        formData.append("type", type);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("time", time);
        formData.append("city", city);
        formData.append("venue", venue);
        formData.append("title", title);
        formData.append("image", file);
        formData.append("intro", intro);
        formData.append("stock", stock);
        formData.append("lowprice", lowprice);
        formData.append("highprice", highprice);

        fetch(this.Add, {
            method: 'POST',
            credentials: "include",
            body: formData,
        }).then(response => {
            let headers = response.headers;
            //console.log(headers.get("errornum"));
            switch (headers.get("errornum")) {
                case '2' :
                    alert('添加成功！');
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '0' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(ticket => {
                console.log(ticket);
                /*let newData = ticket;
                if (newData.type === null)
                    newData.type = '';
                if (newData.startDate === null)
                    newData.startDate = '';
                if (newData.endDate === null)
                    newData.endDate = '';
                if (newData.time === null)
                    newData.time = '';
                if (newData.city === null)
                    newData.city = '';
                if (newData.venue === null)
                    newData.venue = '';
                if (newData.title === null)
                    newData.title = '';
                if (newData.intro === null)
                    newData.intro = '';
                if (newData.stock === null)
                    newData.stock = 0;
                if (newData.lowprice === null)
                    newData.lowprice = 0;
                if (newData.highprice === null)
                    newData.highprice = 0;
                const {data} = this.state;
                data[i] = newData;
                this.setState({data});*/
                this.setState({add: false});
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
            .catch(e => {
                alert(e.message);
            })
    };

    setImg  = event => {
        console.log('setImg');
        let i = this.state.idx;
        let newImg = event.target.files[0]; //File
        event.target.value = null;
        if (newImg.name.indexOf('.svg') > -1) {
            alert('Sorry, we do not accept images in svg format');
            return;
        }
        if (typeof FileReader === "undefined") {
            alert("Your Browser doesn't support FileReader, Please upgrade your browser. Latest Google Chrome is recommended.");
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(newImg);
        let that = this;
        let storage = window.sessionStorage;
        let admin = storage.getItem("admin");
        admin = JSON.parse(admin);
        let token = admin === null ? '' : admin.token;
        reader.onload = function () {
            const {data} = that.state;
            data[i].image = this.result;  //base 64 string
            that.setState({data});
        };
        let formData = new FormData();
        const {data} = that.state;
        console.log(token);
        console.log(data[i].id);
        formData.append("token", token);
        formData.append("ticketid", data[i].id);
        formData.append("image", newImg);
        fetch(this.Update, {
            method: 'POST',
            credentials: "include",
            body: formData,
        }).then(response => {
            let headers = response.headers;
            switch (headers.get("errornum")) {
                case '2' :
                    alert('修改成功！');
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '0' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(ticket => {
                console.log(ticket);
                /*let newData = ticket;
                if (newData.type === null)
                    newData.type = '';
                if (newData.startDate === null)
                    newData.startDate = '';
                if (newData.endDate === null)
                    newData.endDate = '';
                if (newData.time === null)
                    newData.time = '';
                if (newData.city === null)
                    newData.city = '';
                if (newData.venue === null)
                    newData.venue = '';
                if (newData.title === null)
                    newData.title = '';
                if (newData.intro === null)
                    newData.intro = '';
                if (newData.stock === null)
                    newData.stock = 0;
                if (newData.lowprice === null)
                    newData.lowprice = 0;
                if (newData.highprice === null)
                    newData.highprice = 0;
                const {data} = this.state;
                data[i] = newData;
                this.setState({data});*/

            })
            .catch(e => {
                alert(e.message);
            })
    };

    setImgAdd = () => event => {
        let newImg = event.target.files[0]; //File
        if (newImg.name.indexOf('.svg') > -1) {
            alert('Sorry, we do not accept images in svg format');
            return;
        }
        if (typeof FileReader === "undefined") {
            alert("Your Browser doesn't support FileReader, Please upgrade your browser. Latest Google Chrome is recommended.");
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(newImg);
        let that = this;
        reader.onload = function (e) {
            const {addData} = that.state;
            addData[0].image = this.result;  //base 64 string
            addData[0].file = newImg;
            that.setState({addData});
        };
    };

    toggleCancel = (i) => {
        let newData = this.state.data.slice();
        newData[i] = this.oldInfo;
        this.setState({
            data: newData,
            edit: -1,
        });
    };

    handleDown = (event, id) => {
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
                            alert('下架成功！');
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

    handleDownSelected = () => {
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
                    alert('下架成功！');
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
        this.setState({add: true});
    };

    handleBack = () => {
        this.setState({add: false});
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
        this.setState({selected:[]});
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

    filterKeys = (keys) => {
        let filter = ["image", "id", "dates", "status"];
        filter.forEach(s => {
            let idx = keys.indexOf(s);
            keys.splice(idx, 1);
        });
        return keys;
    };


    render() {
        const {classes} = this.props;
        const {data, selected, rowsPerPage, page, totalElements, edit, add, addData} = this.state;
        let keys = Object.keys(data[0]);
        keys = this.filterKeys(keys);

        const tableCell = (i, key, value) => edit === i ? (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label}>{chinese(key)}{': '}</Typography>
                <TextField key={key} value={value} onChange={this.updateTicketInfo(i, key)}
                           className={classes.textField}
                           id={key} name={key} margin="normal" type="text" required
                />
            </div>
        ) : (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label} color='primary'>{chinese(key)}{': '}</Typography>
                <Typography className={classes.inline} variant="subheading" component="h3"
                            color="default">{value}</Typography>
            </div>
        );

        const addCell = (key, value) => (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label}>{chinese(key)}{': '}</Typography>
                <TextField key={key} value={value} onChange={this.AddTicketInfo(key)}
                           className={classes.textField}
                           id={key} name={key} margin="normal" type="text" required
                />
            </div>
        );


        let content =
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
                                .map((n, idx) => {
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
                                                       padding="none">
                                                <Grid container spacing={8} key={n.id}>
                                                    <Grid item xs={6}>
                                                        <img src={n.image} className={classes.image}
                                                             alt={n.title}/>
                                                        <div className={classes.wrapper}>
                                                            <input accept="image/*" className={classes.input}
                                                                   id="flat-button-file" type="file"
                                                                   onChange={this.setImg}/>
                                                            <label htmlFor="flat-button-file">
                                                                <Button component="span" variant="contained"
                                                                        className={classes.button}
                                                                        onClick={()=>this.setState({idx:idx})}>
                                                                    Upload Profile
                                                                </Button>
                                                            </label>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            {
                                                keys.map((s) => (
                                                    tableCell(idx, s, n[s])
                                                ))
                                            }
                                            <TableCell numeric>
                                                {
                                                    edit === idx ? <div>
                                                            <Button variant='fab' color='secondary'
                                                                    onClick={() => this.toggleSave(idx)}
                                                                    className={classNames(classes.action, classes.button)}>
                                                                <SaveIcon/>
                                                            </Button>
                                                            <Button variant='fab' color='primary'
                                                                    onClick={() => this.toggleCancel(idx)}
                                                                    className={classNames(classes.action, classes.button)}>
                                                                <ClearIcon/>
                                                            </Button>
                                                        </div> :
                                                        <Button onClick={() => this.toggleEdit(idx)}><EditIcon/></Button>
                                                }
                                                <Button onClick={event => this.handleDown(event, n.id)}>下架</Button>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>
                                    <Button disabled={selected.length === 0}
                                            onClick={event => this.handleDownSelected(event)}>
                                        批量下架
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
            </Paper>;
        if (add) {
            content =
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <TableBody>
                                {addData
                                    .map((n) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={n.id}
                                            >
                                                <TableCell className={classes.info} component="th" scope="row"
                                                           padding="none">
                                                    <Grid container spacing={8} key={n.id}>
                                                        <Grid item xs={6}>
                                                            <img src={n.image} className={classes.image}
                                                                 alt={n.title}/>
                                                        </Grid>
                                                        <div className={classes.wrapper}>
                                                            <input accept="image/*" className={classes.input}
                                                                   id="flat-button-file" type="file"
                                                                   onChange={this.setImgAdd()}/>
                                                            <label htmlFor="flat-button-file">
                                                                <Button component="span" variant="contained"
                                                                        className={classes.button}>
                                                                    Upload Profile
                                                                </Button>
                                                            </label>
                                                        </div>
                                                    </Grid>
                                                </TableCell>
                                                {
                                                    keys.map((s) => (
                                                        addCell(s, n[s])
                                                    ))
                                                }
                                                <TableCell numeric>
                                                    <div>
                                                        <Button variant='fab' color='secondary'
                                                                onClick={() => this.toggleSaveAdd()}
                                                                className={classNames(classes.action, classes.button)}>
                                                            <SaveIcon/>
                                                        </Button>
                                                        <Button variant='fab' color='primary'
                                                                onClick={() => this.handleBack()}
                                                                className={classNames(classes.action, classes.button)}>
                                                            <ClearIcon/>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell
                                    >
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.handleBack()}>票品管理</Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>;
        }

        return content;
    }
}

ManageTicket.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageTicket);