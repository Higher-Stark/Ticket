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
    commentInput : {
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
            <Grid item xs={9} md={6} className={classNames(props.classes.grid, props.classes.inline, props.classes.bottomBorder)}>
                <Grid item xs={12} md={12} className={props.classes.block}>
                    <Typography variant='body1' component='p' gutterBottom color='default' className={props.classes.content}>
                        {props.comment.content}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} className={props.classes.block}>
                    <GridList cols={3} cellHeight={40}>
                        <GridListTile/>
                        <GridListTile className={props.classes.gridListTile}>
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
    comment=null;
    replies=[];

    constructor(props) {
        super(props);
        this.state = {
            replyid: null,
            replyType: "",
            type: "",
            comment : {},
            replies : [],
            content : ""
        }
    }

    componentWillMount() {
        this.setState({
            content:""
        });
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

        let tmpType = null;
        let tmpReplyType = null;

        if(idx2 === search.length) // no type
        {
            this.setState({
                type : "Comment"
            });
            tmpType = "Comment";
        }
        else{
            /* parse type */
            idx = search.indexOf("type");
            idx2 = search.indexOf("&", idx);
            idx2 = idx2 === -1 ? search.length : idx2;
            let type = search.substring(idx + 5, idx2) || null;
            this.setState({
                type : "Reply",
                replyType : type,
            })
            tmpType = "Reply"
            tmpReplyType = type;
        }

        this.fetchParent(id,tmpType);
        this.fetchChild(id,tmpReplyType,1);

        // fetch comment/reply info from backend,
    }

    componentWillReceiveProps=(nextProps, nextContext) =>{
        //const {search} = nextProps.location;
        //const {id, type} = this.parseIdAndType(search);
    }

    parseIdAndType=(search) =>{
        let keyIdx = 0;
        keyIdx = search.indexOf("id");
        let andIdx = 0;
        andIdx = search.indexOf("&", keyIdx);
        andIdx = andIdx === -1 ? search.length : andIdx;
        const id = parseInt(search.substring(keyIdx + 2, andIdx), 10);
        keyIdx = search.indexOf("type");
        andIdx = search.indexOf("&", keyIdx);
        const type = search.substring(keyIdx + 2, andIdx);
        return{
            id: id, type: type
        };
    }

    toggleReply = (id, type) => {
        this.props.history.push({
            pathname: '/comments',
            search: `?id=${id}&type=${type}`,
        });
        console.log(id, type);
        this.setState({
            replyid: id,
            replyType: type,
        })
        this.fetchParent(id, "Reply");
        this.fetchChild(id, type, 1);
    }

    fetchParent = (id,type)=>{
        if(type === "Comment"){
            fetch(`http://pipipan.cn:30010/Comment/QueryByCommentid?commentid=${id}`,{
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
                        comment:data,
                    });
                })
                .catch(e => console.log(e));
        }
        else if(type === "Reply"){
            fetch(`http://pipipan.cn:30010/Reply/QueryExactByReplyId?replyid=${id}`,{
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
                        comment:data,
                    });
                })
                .catch(e => console.log(e));
        }

    };

    fetchChild=(id,replyType,pagenumber)=>{
        console.log("hhleo");
        console.log(replyType);
        console.log(pagenumber);
        console.log(id)
        if(replyType == null){
            let s = `parentid=${id}&type=toComment&pagenumber=${pagenumber}`;
            fetch(`http://pipipan.cn:30010/Reply/QueryByParentId`,{
                method:'POST',
                body:s,
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
                    console.log("in fetch child")
                    console.log(data)
                    this.setState({
                        replies : data.content
                    })
                })
        }
        else {
            console.log("in id "+id);
            let s = `parentid=${id}&type=toReply&pagenumber=${pagenumber}`;
            fetch(`http://pipipan.cn:30010/Reply/QueryByParentId`,{
                method:'POST',
                body:s,
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
                    console.log(this.state.replies)
                    this.setState({
                        replies : data.content
                    })
                })
        }
    };

    saveReply=()=>{
        let storage = window.localStorage;
        let user = storage.getItem("user");
        if(user == null || user.length === 0)
        {
            alert("若要评论 请先登录")
            this.props.history.push({
                pathname:'/signin'
            })
            return;
        }
        let token = JSON.parse(user).token;

        if(this.state.content == null||this.state.content.length===0){
            alert("不能回复空内容")
            return;
        }

        //let replyType = null;
        console.log("in save ")
        console.log(this.state.type)
        if(this.state.type === "Comment"){
            //replyType = "toComment";
            console.log("id "+this.state.replyid)
            console.log("content "+this.state.content)
            let s = `token=${token}&commentid=${this.state.replyid}&content=${this.state.content}`;
            fetch('http://pipipan.cn:30010/Reply/AddToComment',{
                method:'POST',
                body:s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                    if (response.status !== 200) throw Error("Error !" + response);
                    return response.text();
                })
                .then(text=>{
                    console.log(text)
                    console.log("23123123123")
                    alert("评论成功")
                })

        }
        else{
            //replyType = "toReply";
            let s = `token=${token}&replyid=${this.state.replyid}&content=${this.state.content}`;
            fetch('http://pipipan.cn:30010/Reply/AddToReply',{
                method:'POST',
                body:s,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                credentials: "include"
            })
                .then(response => {
                    if (response.status !== 200) throw Error("Error !" + response);
                    return response.text();
                })
                .then(text=>{
                    alert("评论成功")
                })
        }
    };

    editComment = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid container spacing={8} alignContent='center'>
                    <Grid item xs={12} md={12} className={classes.grid} >
                        <Grid item xs={3} md={1}
                              className={classNames(classes.grid, classes.inline)}
                        >
                            <div className={classes.user}>
                                <Typography variant='subheading' component='h3' gutterBottom color='primary'>
                                    {this.state.comment==null?"":this.state.comment.ownername}
                                </Typography>
                                <Typography variant='caption' color='textSecondary'>
                                    {this.state.comment==null?"":this.state.comment.createTime}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={9} md={6} className={classNames(classes.grid, classes.inline, classes.bottomBorder)}>
                            <Grid item xs={12} md={12} className={classes.block}>
                                <Typography variant='body1' component='p' gutterBottom color='default' className={classes.content}>
                                    {this.state.comment==null?"":this.state.comment.content}
                                </Typography>
                            </Grid>
                            <Grid item md={5}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <Grid item xs={12} md={6}>
                            <TextField multiline fullWidth rows={3} rowsMax={6}
                                       placeholder={`回复${this.state.comment==null?"":this.state.comment.ownername}`}
                                       value={this.state.content} onChange={this.editComment}
                                       InputProps={{
                                           disableUnderline: true,
                                           classes: {
                                               root: classes.commentRoot,
                                               input : classes.commentInput,
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
                            <IconButton onClick = {this.saveReply}>
                                <CommentText/>
                            </IconButton>
                        </Grid>
                    </Grid>d
                    {
                        this.state.replies.length === 0 ? <div><h3>暂无回复</h3></div>:this.state.replies.map(s => (item({classes: classes, comment: s, reply: this.toggleReply})))
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