import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CommentMultiple from 'mdi-material-ui/CommentMultiple';
import CommentText from 'mdi-material-ui/CommentText';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";

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
        padding: theme.spacing.unit,
    },
    grid: {
        width: 'inherit',
        padding: theme.spacing.unit,
    },
    block: {
        display: 'block',
    },
    inline: {
        display: 'inline-block',
    },
    actions: {
        width: 'inherit',
        padding: theme.spacing.unit,
    },
    bottomBorder: {
        borderBottom: '1px solid rgba(240,240,240,0.36)',
    },
    content: {
        padding: theme.spacing.unit,
        flexWrap: 'wrap',
    },
    gridListTile: {
        display: 'flex',
        justifyContent: 'center',
        height: theme.spacing.unit * 2,
        width: '100%',
    },
    user: {
        height: 'inherit',
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
        width: 'inherit',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0, 123,255, .23)',
        },
    },
    commentFormLabel: {
        fontSize: 20,
    },
});

const item = props => (
    <Grid item xs={12} md={12} className={props.classes.grid} key={props.comment.id}>
        <Grid item xs={3} md={1}
              className={classNames(props.classes.grid, props.classes.inline)}
        >
            <div className={props.classes.user}>
                <Typography variant='subheading' component='h3' gutterBottom color='primary'>
                    {props.comment.ownername}
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                    {props.comment.createTime}
                </Typography>
            </div>
        </Grid>
        <Grid item xs={9} md={6}
              className={classNames(props.classes.grid, props.classes.inline, props.classes.bottomBorder)}>
            <Grid item xs={12} md={12} className={props.classes.block}>
                <Typography variant='body1' component='p' gutterBottom color='default'
                            className={props.classes.content}>
                    {props.comment.content}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} className={props.classes.block}>
                <GridList cols={3} cellHeight={40}>
                    <GridListTile/>
                    <GridListTile className={props.classes.gridListTile}>
                        {
                            props.comment.ownername !== props.name ? null : <Button
                                onClick={() => props.handleDelete(props.i)}>删除</Button>
                        }
                        <IconButton>
                            <CommentMultiple/>
                        </IconButton>
                        <IconButton>
                            <CommentMultiple/>
                        </IconButton>
                        <IconButton>
                            <CommentMultiple/>
                        </IconButton>
                    </GridListTile>
                    <GridListTile className={props.classes.gridListTile}>
                        <IconButton onClick={() => props.reply(props.comment.id, props.comment.type)}>
                            <CommentText/>
                        </IconButton>
                    </GridListTile>
                </GridList>
            </Grid>
            <Grid item md={5}/>
        </Grid>
    </Grid>
);

class Comments extends Component {
    comment = null;
    replies = [];

    constructor(props) {
        super(props);
        this.state = {
            replyid: null,
            replyType: "",
            type: "",
            comment: {},
            replies: [],
            totalElements: 0,
            rowsPerPage: 4,
            page: 0,
            content: ""
        }
    }

    componentWillMount() {
        this.setState({
            content: ""
        });
        const {location} = this.props;
        console.log(this.props);
        const {search} = location;
        /* parse id */
        let id = null;
        let idx = search.indexOf('id');
        let idx2 = search.indexOf('&', idx);
        idx2 = idx2 === -1 ? search.length : idx2;
        id = parseInt(search.substring(idx + 3, idx2), 10);
        this.setState({
            replyid: id
        });

        let tmpType = null;
        let tmpReplyType = null;

        if (idx2 === search.length) // no type
        {
            this.setState({
                type: "Comment"
            });
            tmpType = "Comment";
        }
        else {
            /* parse type */
            idx = search.indexOf("type");
            idx2 = search.indexOf("&", idx);
            idx2 = idx2 === -1 ? search.length : idx2;
            let type = search.substring(idx + 5, idx2) || null;
            this.setState({
                type: "Reply",
                replyType: type,
            });
            tmpType = "Reply";
            tmpReplyType = type;
        }
        console.log(tmpType);
        console.log(tmpReplyType);
        this.fetchParent(id, tmpType);
        this.fetchChild(id, tmpReplyType, 1);

        // fetch comment/reply info from backend,
    }


    componentWillReceiveProps(nextProps, nextContext) {
        const {search} = nextProps.location;
        let id = null;
        let idx = search.indexOf('id');
        let idx2 = search.indexOf('&', idx);
        idx2 = idx2 === -1 ? search.length : idx2;
        id = parseInt(search.substring(idx + 3, idx2), 10);
        this.setState({
            replyid: id
        });

        let tmpType = null;
        let tmpReplyType = null;

        if (idx2 === search.length) // no type
        {
            this.setState({
                type: "Comment"
            });
            tmpType = "Comment";
        }
        else {
            /* parse type */
            idx = search.indexOf("type");
            idx2 = search.indexOf("&", idx);
            idx2 = idx2 === -1 ? search.length : idx2;
            let type = search.substring(idx + 5, idx2) || null;
            this.setState({
                type: "Reply",
                replyType: type,
            });
            tmpType = "Reply";
            tmpReplyType = type;
        }
        this.fetchParent(id, tmpType);
        this.fetchChild(id, tmpReplyType, 1);
    }

    parseIdAndType = (search) => {
        let keyIdx = 0;
        keyIdx = search.indexOf("id");
        let andIdx = 0;
        andIdx = search.indexOf("&", keyIdx);
        andIdx = andIdx === -1 ? search.length : andIdx;
        const id = parseInt(search.substring(keyIdx + 2, andIdx), 10);
        keyIdx = search.indexOf("type");
        andIdx = search.indexOf("&", keyIdx);
        const type = search.substring(keyIdx + 2, andIdx);
        return {
            id: id, type: type
        };
    };

    handleDelete = (i) => {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        let replyid = this.state.replies[i].id;
        fetch(`http://pipipan.cn:30010//Reply/Delete?token=${token}&replyid=${replyid}`)
            .then(response => {
                let errornum = response.headers.get('errornum');
                console.log(errornum);
                //console.log(response.text());
                if (errornum === '0') {
                    if (response.status !== 200) throw Error("Error !" + response);
                    console.log("删除成功");
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
                const {location} = this.props;
                console.log(this.props);
                const {search} = location;
                /* parse id */
                let id = null;
                let idx = search.indexOf('id');
                let idx2 = search.indexOf('&', idx);
                idx2 = idx2 === -1 ? search.length : idx2;
                id = parseInt(search.substring(idx + 3, idx2), 10);
                this.setState({
                    replyid: id
                });
                let tmpReplyType = null;

                if (idx2 === search.length) // no type
                {
                    this.setState({
                        type: "Comment"
                    });
                }
                else {
                    /* parse type */
                    idx = search.indexOf("type");
                    idx2 = search.indexOf("&", idx);
                    idx2 = idx2 === -1 ? search.length : idx2;
                    let type = search.substring(idx + 5, idx2) || null;
                    this.setState({
                        type: "Reply",
                        replyType: type,
                    });
                    tmpReplyType = type;
                }
                this.fetchChild(id, tmpReplyType, page+1);
            })
            .catch(e => console.log(e));
    };

    toggleReply = (id, type) => {
        this.props.history.push({
            pathname: '/comments',
            search: `?id=${id}&type=${type}`,
        });
        console.log(id, type);
        this.setState({
            replyid: id,
            replyType: type,
        });
        this.fetchParent(id, "Reply");
        this.fetchChild(id, type, 1);
    };

    fetchParent = (id, type) => {
        if (type === "Comment") {
            fetch(`http://pipipan.cn:30010/Comment/QueryByCommentid?commentid=${id}`, {
                method: 'GET',
                credentials: "include",
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else throw Error("Get detail failed");
                })
                .then(data => {
                    this.setState({
                        comment: data,
                    });
                })
                .catch(e => console.log(e));
        }
        else if (type === "Reply") {
            fetch(`http://pipipan.cn:30010/Reply/QueryExactByReplyId?replyid=${id}`, {
                method: 'GET',
                credentials: "include",
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else throw Error("Get detail failed");
                })
                .then(data => {
                    this.setState({
                        comment: data,
                    });
                })
                .catch(e => console.log(e));
        }
    };

    fetchChild = (id, replyType, pagenumber) => {
        console.log("hello");
        console.log(replyType);
        console.log(pagenumber);
        console.log(id);
        if (replyType == null) {
            let s = `parentid=${id}&type=toComment&pagenumber=${pagenumber}`;
            console.log(s);
            fetch(`http://pipipan.cn:30010/Reply/QueryByParentId`, {
                method: 'POST',
                body: s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                    if (response.status !== 200) throw Error("Error !" + response);
                    return response.json();
                })
                .then(data => {
                    console.log("in fetch child");
                    console.log(data);
                    this.setState({
                        replies: data.content,
                        totalElements: data.totalElements
                    })
                })
        }
        else {
            console.log("in id " + id);
            let s = `parentid=${id}&type=toReply&pagenumber=${pagenumber}`;
            console.log(s);
            fetch(`http://pipipan.cn:30010/Reply/QueryByParentId`, {
                method: 'POST',
                body: s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                    if (response.status !== 200) throw Error("Error !" + response);
                    return response.json();
                })
                .then(data => {
                    console.log(this.state.replies);
                    this.setState({
                        replies: data.content,
                        totalElements: data.totalElements
                    })
                })
        }
    };

    saveReply = () => {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        if (user == null || user.length === 0) {
            alert("若要评论 请先登录");
            this.props.history.push({
                pathname: '/signin'
            });
            return;
        }
        let token = JSON.parse(user).token;

        if (this.state.content == null || this.state.content.length === 0) {
            alert("不能回复空内容");
            return;
        }

        //let replyType = null;
        console.log("in save ");
        console.log(this.state.type);
        if (this.state.type === "Comment") {
            //replyType = "toComment";
            console.log("id " + this.state.replyid);
            console.log("content " + this.state.content);
            let s = `token=${token}&commentid=${this.state.replyid}&content=${this.state.content}`;
            console.log(s);
            fetch('http://pipipan.cn:30010/Reply/AddToComment', {
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
                        alert("评论成功");
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
                .then(text => {
                    console.log(text);
                    console.log("23123123123");
                })
                .then(() => {
                    this.setState({content: ''});
                    const {location} = this.props;
                    console.log(this.props);
                    const {search} = location;
                    /* parse id */
                    let id = null;
                    let idx = search.indexOf('id');
                    let idx2 = search.indexOf('&', idx);
                    idx2 = idx2 === -1 ? search.length : idx2;
                    id = parseInt(search.substring(idx + 3, idx2), 10);
                    this.setState({
                        replyid: id
                    });

                    let tmpReplyType = null;

                    if (idx2 === search.length) // no type
                    {
                        this.setState({
                            type: "Comment"
                        });
                    }
                    else {
                        /* parse type */
                        idx = search.indexOf("type");
                        idx2 = search.indexOf("&", idx);
                        idx2 = idx2 === -1 ? search.length : idx2;
                        let type = search.substring(idx + 5, idx2) || null;
                        this.setState({
                            type: "Reply",
                            replyType: type,
                        });
                        tmpReplyType = type;
                    }
                    console.log(id);
                    console.log(tmpReplyType);
                    this.fetchChild(id, tmpReplyType, 1);
                });
        }
        else {
            //replyType = "toReply";
            let s = `token=${token}&replyid=${this.state.replyid}&content=${this.state.content}`;
            console.log(s);
            fetch('http://pipipan.cn:30010/Reply/AddToReply', {
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
                        alert("评论成功");
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
                .then((text) => {
                    console.log(text);
                    console.log("123");
                })
                .then(() => {
                    this.setState({content: ''});
                    const {location} = this.props;
                    console.log(this.props);
                    const {search} = location;
                    /* parse id */
                    let id = null;
                    let idx = search.indexOf('id');
                    let idx2 = search.indexOf('&', idx);
                    idx2 = idx2 === -1 ? search.length : idx2;
                    id = parseInt(search.substring(idx + 3, idx2), 10);
                    this.setState({
                        replyid: id
                    });

                    let tmpReplyType = null;

                    if (idx2 === search.length) // no type
                    {
                        this.setState({
                            type: "Comment"
                        });
                    }
                    else {
                        /* parse type */
                        idx = search.indexOf("type");
                        idx2 = search.indexOf("&", idx);
                        idx2 = idx2 === -1 ? search.length : idx2;
                        let type = search.substring(idx + 5, idx2) || null;
                        this.setState({
                            type: "Reply",
                            replyType: type,
                        });
                        tmpReplyType = type;
                    }
                    console.log(id);
                    console.log(tmpReplyType);
                    this.fetchChild(id, tmpReplyType, 1);
                });
        }
    };

    editComment = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    handleChangePage = (event, page) => {
        console.log("我要changepage辣");
        this.setState({page});
        const {location} = this.props;
        const {search} = location;
        /* parse id */
        let id = null;
        let idx = search.indexOf('id');
        let idx2 = search.indexOf('&', idx);
        idx2 = idx2 === -1 ? search.length : idx2;
        id = parseInt(search.substring(idx + 3, idx2), 10);
        this.setState({
            replyid: id
        });

        let tmpReplyType = null;

        if (idx2 === search.length) // no type
        {
            this.setState({
                type: "Comment"
            });
        }
        else {
            /* parse type */
            idx = search.indexOf("type");
            idx2 = search.indexOf("&", idx);
            idx2 = idx2 === -1 ? search.length : idx2;
            let type = search.substring(idx + 5, idx2) || null;
            this.setState({
                type: "Reply",
                replyType: type,
            });
            tmpReplyType = type;
        }
        this.fetchChild(id, tmpReplyType, page + 1);
    };

    render() {
        const {classes} = this.props;
        const {totalElements, rowsPerPage, page} = this.state;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let name = user === null ? '' : user.name;
        return (
            <div>
                <Grid container spacing={8} alignContent='center'>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <Grid item xs={3} md={1}
                              className={classNames(classes.grid, classes.inline)}
                        >
                            <div className={classes.user}>
                                <Typography variant='subheading' component='h3' gutterBottom color='primary'>
                                    {this.state.comment == null ? "" : this.state.comment.ownername}
                                </Typography>
                                <Typography variant='caption' color='textSecondary'>
                                    {this.state.comment == null ? "" : this.state.comment.createTime}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={9} md={6}
                              className={classNames(classes.grid, classes.inline, classes.bottomBorder)}>
                            <Grid item xs={12} md={12} className={classes.block}>
                                <Typography variant='body1' component='p' gutterBottom color='default'
                                            className={classes.content}>
                                    {this.state.comment == null ? "" : this.state.comment.content}
                                </Typography>
                            </Grid>
                            <Grid item md={5}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <Grid item xs={12} md={6}>
                            <TextField multiline fullWidth rows={3} rowsMax={6}
                                       placeholder={`回复${this.state.comment == null ? "" : this.state.comment.ownername}`}
                                       value={this.state.content} onChange={this.editComment}
                                       InputProps={{
                                           disableUnderline: true,
                                           classes: {
                                               root: classes.commentRoot,
                                               input: classes.commentInput,
                                           }
                                       }}
                                       label="回复" id="reply" InputLabelProps={{
                                shrink: true, className: classes.commentFormLabel,
                            }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <Grid item xs={10} md={5} className={classes.grid}>
                            <div>{"  "}</div>
                        </Grid>
                        <Grid item xs={2} md={1} className={classes.grid}>
                            <IconButton onClick={this.saveReply}>
                                <CommentText/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    {
                        this.state.replies.length === 0 ? <div><h3>暂无回复</h3></div> :
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <TableBody>
                                    {
                                        this.state.replies.map((s, i) => {
                                            console.log(name);
                                            console.log(s.ownername);
                                            return item({
                                                classes: classes,
                                                comment: s,
                                                name: name,
                                                i: i,
                                                handleDelete: this.handleDelete,
                                                reply: this.toggleReply
                                            })
                                        })
                                    }
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
                </Grid>
            </div>
        )
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);