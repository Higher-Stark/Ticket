import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CartPlusIcon from 'mdi-material-ui/CartPlus';
import ShoppingIcon from 'mdi-material-ui/Shopping';
import CommentPlusOutline from 'mdi-material-ui/CommentPlusOutline';
import CommentTextOutline from 'mdi-material-ui/CommentTextOutline';
import {urlEncode} from '../util/utils';
import {locale} from '../util/utils';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    post: {
        maxWidth : '100%',
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
            marginTop : theme.spacing.unit * 3,
        },
    },
    commentInput : {
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
    commentButton : {
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
});

function createCommentData(id, ownerId, ownername, content, createDate) {
    return {id, ownerId, ownername, content, createDate};
}

class Specify extends Component {
    url = {
        detail: 'http://pipipan.cn:30005/Ticket/QueryById',
    };

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            detail: null,
            dates: [],
            prices: [],
            price: 0,
            date: null,
            quantity: 0,
            edit: false,
            content: null,
            comments: []
        };
    }

    componentDidMount() {
        const {match} = this.props;
        const id = match.params.id;
        fetch(this.url.detail + `?id=${id}`, {
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
                this.setState({detail: data});
                /* 拿票的评论 */
                this.fetchCommentToTicket(1)
            })
            .catch(e => console.log(e));
    }

    fetchCommentToTicket = (pagenumber) =>{
        console.log("in fetch comment "+this.state.detail.id)
        let s = `ticketid=${this.state.detail.id}&pagenumber=${pagenumber}`;
        fetch("http://pipipan.cn:30010/Comment/QueryByTicketid",{
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
            .then(data =>{
                console.log(data);
                if(data.totalElements === 0){
                    this.setState({
                        comments : []
                    })
                }
                else{
                    let content = data.content;
                    let tmpArray = [];
                    for(var i = 0 ; i < content.length ; i++){
                        tmpArray.push(createCommentData(content[i].id,content[i].owenerId,content[i].ownername,content[i].content,content[i].createTime))
                    }
                    this.setState({
                        comments : tmpArray
                    })
                    console.log(this.state.comments)
                }
            });

    }

    selectPrice = (selectedPrice) => {
        const {price} = this.state;
        this.setState({
            price: price === selectedPrice ? 0 : selectedPrice,
        });
    };

    selectDate = (selectedDate) => {
        const {date} = this.state;
        if (selectedDate === date)
            this.setState({
                date: null,
                quantity: 1,
            });
        else
            this.setState({
                date: selectedDate,
                quantity: 1
            })
    };

    toggleCart = () => {
        const {detail, price, date, quantity} = this.state;
        let storage = window.localStorage;
        let user = JSON.parse(storage.getItem("user"));
        if (user === null)
        {
            alert("请登录");
            this.props.history.push({
                pathname: '/signin',
            });
            return;
        }
        let body = {
            token: user.token,
            ticketid: detail.id,
            price: price,
            date: date,
            number: quantity,
        };
        const url = "http://pipipan.cn:30007/Cart/SaveInDetailPage";

        fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: urlEncode(body),
            credentials: "include",
        })
        .then(response => response.headers)
        .then(headers => {
            let errornum=headers.get('errornum');
            if(errornum==='0')
            {
                alert("成功！");
                return ;
            }
            else if(errornum==='1')
            {
                alert("尚未登录！");
            }
            else if(errornum==='2')
            {
                alert("身份不对应！");
            }
            else if(errornum==='3')
            {
                alert("账户被冻结！");
            }
            this.props.history.push('/signin');
        })
    };

    toggleBuy = () => {
        const {detail, price, date, quantity} = this.state;

        const {selectedDate, selectedPrice} = this.state;
        if (selectedDate === -1 || selectedPrice === -1) {
            console.log("You haven't selected any time or price");
            return;
        }
        let storage = window.localStorage;
        let user = JSON.parse(storage.getItem("user"));
        if (user === null)
        {
            alert("请登录");
            this.props.history.push({
                pathname: '/signin',
            });
            return;
        }

        let tickets = [
            {
                id: detail.id,
                date: date,
                price: price,
                number: quantity
            }
        ];

        storage.setItem("orderConfirmTickets",JSON.stringify(tickets));
        storage.setItem("orderType","orderInDetailPage");
        this.props.history.push({
            pathname: '/orderconfirm',
        });
    };

    handleChange = (e) => {
        if (e.target.value < 1)
            return;
        this.setState({
            quantity: e.target.value,
        });
    };

    openComment = () => {
        console.log("in open comment");
        console.log(this.state.content)
        if(this.state.content==null||this.state.content.length === 0){
            alert("评论为空，无法保存")
            return;
        }
        const {edit} = this.state;
        this.setState({
            edit: !edit
        });
        let storage = window.localStorage;
        let user = storage.getItem("user");
        if(user == null || user.length === 0){
            alert("请先登录");
            this.props.history.push({
                pathname:'/signin'
            })
            return;
        }
        console.log(this.state.detail)
        let token = JSON.parse(user).token;
        let s = `token=${token}&ticketid=${this.state.detail.id}&content=${this.state.content}`;

        fetch('http://pipipan.cn:30010/Comment/Add',{
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
            .then(text =>{
                console.log(text);
                this.setState({
                    content:""
                })
                alert("评论成功");
            });
    };

    editComment = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    viewCommentAndReply = (id, type) => {
        console.log("View Comment and Replay of Comment/Reply id= " + id);
        this.props.history.push({
            pathname: '/comments',
            search: `?id=${id}`,
        })
    };

    render() {
        const {classes} = this.props;
        const {detail, price, date, quantity} = this.state;

        return (
            detail === null ? (
                    <div className={classes.loading}>
                        <LinearProgress color='secondary' className={classes.loadingBar}/>
                    </div>
                ) :
                <div className={classes.root}>
                    <Grid container spacing={8} className={classes.grid}>
                        <Grid item xs={12} className={classes.grid}>
                            <Grid item xs={3} className={classes.imgGrid}>
                                <Grid container className={classes.container}>
                                    <img src={detail.image} alt={detail.title} className={classes.post}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} className={classes.content}>
                                <div>
                                    <Typography variant='title' component='h2' gutterBottom color='primary'>
                                        {detail.title}
                                    </Typography>
                                    <Typography variant='subheading' component='h3' gutterBottom color='textSecondary'>
                                        {detail.city}{' | '}{detail.venue}
                                    </Typography>
                                    <Typography variant='subheading' component='h3' gutterBottom color='secondary'>
                                        {'日期 '}
                                        <Typography variant='body1' component='p' color='textSecondary' className={classes.inline}>
                                            {`${locale(detail.startDate)} - ${locale(detail.endDate)}  ${detail.time}`}
                                        </Typography>
                                    </Typography>
                                    <div>
                                        <div>
                                            <Typography component='h3' variant='subheading' color='primary'
                                                        className={classes.inline}>{'演出时间: '}</Typography>
                                            {
                                                detail.dates.split(' , ').map((s, i) => {
                                                    return (
                                                        <Button variant={s === date ? "contained" : "outlined"}
                                                                onClick={() => this.selectDate(s)}
                                                                color='primary'
                                                                className={classes.selectButton}
                                                                key={i}
                                                        >
                                                            {locale(s)}{' '}{detail.time}
                                                        </Button>
                                                    )
                                                })}
                                        </div>
                                        <div>
                                            <Typography variant='subheading' component='h3' color='primary'
                                                        className={classes.inline}>{"票价选择： "}</Typography>
                                            <Button variant={price === detail.lowprice ? "contained" : "outlined"}
                                                    onClick={() => this.selectPrice(detail.lowprice)}
                                                    color='primary'
                                                    className={classes.selectButton}
                                            >
                                                {detail.lowprice}
                                            </Button>
                                            <Button variant={price === detail.highprice ? "contained" : "outlined"}
                                                    onClick={() => this.selectPrice(detail.highprice)}
                                                    color='primary'
                                                    className={classes.selectButton}
                                            >
                                                {detail.highprice}
                                            </Button>
                                        </div>
                                        <Typography variant='subheading' component='h3' gutterBottom color='primary'>
                                            {'库存: '}
                                            <Typography variant='body1' component='p' color='textSecondary'
                                                        className={classes.inline}>
                                                { detail.stock}
                                            </Typography>
                                        </Typography>
                                        {
                                            date === null || price === 0 ? null : (
                                                <div>
                                                    <TextField id='quantity' type='number' label='数量' margin='normal'
                                                               value={quantity} onChange={this.handleChange}/>
                                                </div>
                                            )
                                        }
                                        <div className={classes.action}>
                                            <Button variant='extendedFab'
                                                    color='secondary'
                                                    className={classes.buttonIcon}
                                                    onClick={() => this.toggleCart()}
                                                    disabled={date === null || price === 0}
                                            >
                                                <CartPlusIcon/>
                                                Add
                                            </Button>
                                            <Button variant='extendedFab'
                                                    color='primary'
                                                    className={classes.buttonIcon}
                                                    onClick={() => this.toggleBuy()}
                                                    disabled={date === null || price === 0}
                                            >
                                                <ShoppingIcon/>
                                                Pay
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3} className={classes.grid}>
                                <Typography variant='subheading' component='h3'>{'票务系统信息'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                        <Typography variant='title' component='h2'>{"详细介绍"}</Typography>
                        <Typography variant='body1' component='p'>{detail.intro}</Typography>
                    </Grid>
                    {
                        /*
                         * Comment Section
                         */
                    }
                    <Grid item xs={12} className={classes.grid}>
                        <Typography variant='title' component='h2' color='primary' gutterBottom>{"评论区"}</Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.grid}>
                        <TextField label="发表评论" id="comment-input" fullWidth InputProps={{
                            disableUnderline: true,
                            classes: {
                                root: classes.commentRoot,
                                input: classes.commentInput,
                            },
                        }}
                                   InputLabelProps={{ shrink: true, className: classes.commentFormLabel}}
                                   multiline rowsMax={6} rows={3} placeholder={"说些什么吧..."}
                                   value={this.state.content} onChange={this.editComment}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                        <Grid item xs={8} className={classes.grid}>
                        </Grid>
                        <Grid item xs={1} className={classes.grid}>
                            <div className={classes.commentButtonWrapper}>
                                <Button className={classes.commentButton} variant='fab' color='secondary' onClick={this.openComment}>
                                    <CommentPlusOutline/>
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    {this.state.comments.length===0?(<div><h3>暂无评论</h3></div>):this.state.comments.map(s => (
                        <Grid key={s.id} item xs={12} md={8} className={classes.grid}>
                            <Grid item xs={2} md={2} className={classes.bottomBorder}>
                                <Typography variant='subheading' component='h3' className={classes.inline}>{s.ownername}</Typography>
                                <br/>
                                <Typography variant='caption' className={classes.inline}>{s.createDate}</Typography>
                            </Grid>
                            <Grid item xs={10} md={10} className={classes.bottomBorder}>
                                <div>
                                    <div>
                                        <Typography variant='body1' component='p'>{s.content}</Typography>
                                    </div>
                                    <div className={classes.commentButtonWrapper}>
                                        <IconButton aria-label="ViewCommentAndReply" className={classes.commentButton} onClick={() => this.viewCommentAndReply(s.id)}>
                                            <CommentTextOutline/>
                                        </IconButton>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    ))}
                </div>
        )
    }
}

Specify.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Specify);