import {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import pink from "@material-ui/core/colors/pink";
import IconButton from "@material-ui/core/IconButton";
import CommentTextOutline from "mdi-material-ui/CommentTextOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from "@material-ui/core/TablePagination";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import {urlEncode} from "../util/utils";
import classNames from "classnames";
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

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    post: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        margin: 'auto auto',
        overflow: 'hidden',
    },
    selectButton: {
        margin: theme.spacing.unit,
    },
    grid: {
        display: 'flex',
        flexGrow: 1,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    container: {
        alignContent: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    imgGrid: {
        flexGrow: 1,
        margin: theme.spacing.unit,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing.unit,
    },
    inline: {
        display: 'inline-block',
    },
    textField: {
        margin: `0 ${theme.spacing.unit}px`,
        width: 60,
    },
    action: {
        display: 'block',
        margin: theme.spacing.unit,
        justifyContent: 'center',
    },
    buttonIcon: {
        margin: `0 ${theme.spacing.unit}px`,
        padding: `0 ${theme.spacing.unit}px`,
    },
    loading: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    loadingBar: {
        flexGrow: 1,
        width: 'inherit',
    },
    commentRoot: {
        display: 'block',
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    commentInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 48px),',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0, 123,255, .25)',
        },
    },
    commentFormLabel: {
        fontSize: 18,
    },
    commentButtonWrapper: {
        display: 'block',
        width: 'inherit',
        // justifyContent: 'right',
        margin: `0 ${theme.spacing.unit}px`,
    },
    commentButton: {
        display: 'block',
        float: 'right',
    },
    wrapper: {
        display: 'block',
        flexGrow: 1,
    },
    bottomBorder: {
        borderBottom: '1px solid rgba(225,225,225,0.36)',
    },
    headline: {
        color: pink[300],

    },
    opacity: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }
});

function createCommentData(id, ownerId, ownername, content, createDate) {
    return {id, ownerId, ownername, content, createDate};
}

class UserComment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rowsPerPage: 9,
            page: 0,
            edit: -1,
            comments: [],
            totalElements: 0,
        };
    }

    handleChangePage = (event, page) => {
        console.log("我要changepage辣");
        this.setState({page});
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        clearTimeout(this.timer);
        fetch(`http://pipipan.cn:30010/Comment/QueryByUserid?pagenumber=${page + 1}&token=${token}`)
            .then(response => {
                    let errornum = response.headers.get('errornum');
                    if (errornum === '0') {
                        if (response.status !== 200) throw Error("Error !" + response);
                        return response.json();
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
                let content = data.content;
                let tmpArray = [];
                for (let i = 0; i < content.length; i++) {
                    tmpArray.push(createCommentData(content[i].id, content[i].owenerId, content[i].ownername, content[i].content, content[i].createTime))
                }
                this.setState({
                    comments: tmpArray,
                    totalElements: data.totalElements
                });
            })
            .catch(e => console.log(e));
    };

    componentDidMount() {
        this.fetchCommentToTicket(1);
    }


    fetchCommentToTicket = (pagenumber) => {
        let storage = window.localStorage;
        let user = JSON.parse(storage.getItem("user"));
        if (user === null) {
            alert("请登录");
            this.props.history.push({
                pathname: '/signin',
            });
            return;
        }
        console.log("fetch comment by user id" + user.token);
        let s = `token=${user.token}&pagenumber=${pagenumber}`;
        console.log("http://pipipan.cn:30010/Comment/QueryByUserid?" + s);
        fetch("http://pipipan.cn:30010/Comment/QueryByUserid", {
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
                //console.log(response.text());
                if (errornum === '0') {
                    if (response.status !== 200) throw Error("Error !" + response);
                    return response.json();
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
            .then(data => {
                console.log(data);
                if (data.totalElements === 0) {
                    this.setState({
                        comments: []
                    })
                }
                else {
                    let content = data.content;
                    let tmpArray = [];
                    for (let i = 0; i < content.length; i++) {
                        tmpArray.push(createCommentData(content[i].id, content[i].owenerId, content[i].ownername, content[i].content, content[i].createTime))
                    }
                    this.setState({
                        comments: tmpArray,
                        totalElements: data.totalElements
                    });
                    console.log(this.state.comments)
                }
            });
    };

    viewCommentAndReply = (id) => {
        console.log("View Comment and Replay of Comment/Reply id= " + id);
        this.props.history.push({
            pathname: '/comments',
            search: `?id=${id}`,
        })
    };

    toggleEdit = (i) => {
        this.oldInfo = Object.assign({}, this.state.comments[i]);
        this.setState({
            edit: i,
        });
    };

    toggleSave = (i) => {
        const {id, content} = this.state.comments[i];
        if (content.length === 0) {
            alert("评论不能为空！");
            return;
        }
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        this.setState({
            edit: -1,
        });


        let body = {
            token: token,
            commentid: id,
            content: content,
        };
        console.log(urlEncode(body));
        fetch(`http://pipipan.cn:30010/Comment/UpdateContentByCommentid`, {
            method: 'POST',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: urlEncode(body),
        }).then(response => {
            let errornum = response.headers.get('errornum');
            console.log(errornum);
            //console.log(response.text());
            if (errornum === '0') {
                if (response.status !== 200) throw Error("Error !" + response);
                return response.json();
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
            .then(data => {
                console.log(data);
                let newComments = this.state.comments.slice();
                newComments[i] = createCommentData(data.id, data.owenerId, data.ownername, data.content, this.state.comments[i].createDate);
                this.setState({comments: newComments});
            })
            .catch(e => {
                alert(e.message);
            })
    };

    toggleCancel = (i) => {
        let newComments = this.state.comments.slice();
        newComments[i] = this.oldInfo;
        this.setState({
            comments: newComments,
            edit: -1,
        });
    };

    updateComments = i => event => {
        const {comments} = this.state;
        comments[i].content = event.target.value;
        this.setState({comments});
    };

    handleDelete = (i) => {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        let commentid = this.state.comments[i].id;
        fetch(`http://pipipan.cn:30010/Comment/DeleteByCommentid?token=${token}&commentid=${commentid}`)
            .then(response => {
                let errornum = response.headers.get('errornum');
                console.log(errornum);
                //console.log(response.text());
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
                this.props.history.push('/signin');
            })
            .then(() => {
                const {page} = this.state;
                fetch(`http://pipipan.cn:30010/Comment/QueryByUserid?pagenumber=${page + 1}&token=${token}`)
                    .then(response => {
                            let errornum = response.headers.get('errornum');
                            console.log(errornum);
                            //console.log(response.text());
                            if (errornum === '0') {
                                if (response.status !== 200) throw Error("Error !" + response);
                                return response.json();
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
                        if (data.totalElements === 0) {
                            this.setState({
                                comments: []
                            })
                        }
                        else {
                            let content = data.content;
                            let tmpArray = [];
                            for (let i = 0; i < content.length; i++) {
                                tmpArray.push(createCommentData(content[i].id, content[i].owenerId, content[i].ownername, content[i].content, content[i].createTime))
                            }
                            this.setState({
                                comments: tmpArray,
                                totalElements: data.totalElements
                            });
                            console.log(this.state.comments)
                        }
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    };

    render() {
        const {classes} = this.props;
        const {comments, rowsPerPage, page, totalElements, edit} = this.state;

        const Comment = (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} style={{textAlign: 'center', marginTop: '2%'}}>
                        <Typography className={classes.headline}
                                    style={{fontSize: "200%", fontWeight: "normal", marginBottom: '3%'}}>
                            我的评论
                        </Typography>
                    </Grid>
                </Grid>
                {comments.length === 0 ? (<div><h3>暂无评论</h3></div>) :
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableBody>
                            {this.state.comments.map((s, i) => (
                                <Grid key={s.id} item xs={12} md={8} className={classes.grid}>
                                    <Grid item xs={2} md={2} className={classes.bottomBorder}>
                                        <Typography variant='subheading' component='h3'
                                                    className={classes.inline}>{s.ownername}</Typography>
                                        <br/>
                                        <Typography variant='caption'
                                                    className={classes.inline}>{s.createDate}</Typography>
                                    </Grid>
                                    <Grid item xs={10} md={10} className={classes.bottomBorder}>
                                        <div>
                                            <div>
                                                {
                                                    edit === i ?
                                                        <TextField key={s.id} value={s.content}
                                                                   onChange={this.updateComments(i)}
                                                                   className={classes.textField}
                                                                   id={s.id} name={s.id} margin="normal" type="text"
                                                                   required
                                                        />
                                                        :
                                                        (<Typography variant='body1'
                                                                     component='p'>{s.content}</Typography>)
                                                }
                                            </div>
                                            <div className={classes.commentButtonWrapper}>
                                                {
                                                    edit === i ?
                                                        <div>
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
                                                        </div> :
                                                        <Button variant='fab' color='primary'
                                                                onClick={() => this.toggleEdit(i)}
                                                                className={classNames(classes.action, classes.button)}>
                                                            <EditIcon/>
                                                        </Button>
                                                }
                                                <IconButton aria-label="ViewCommentAndReply"
                                                            className={classes.commentButton}
                                                            onClick={() => this.viewCommentAndReply(s.id)}>
                                                    <CommentTextOutline/>
                                                </IconButton>
                                                <Button
                                                    onClick={() => this.handleDelete(i)}>删除</Button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                        </TableBody>
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
                    </Table>
                }
            </div>
        );
        return (<div>{Comment}</div>)
    }

}

UserComment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserComment);