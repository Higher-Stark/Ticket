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
                            <IconButton onClick={() => props.history.push({
                                pathname: '/comments',
                                search: `?id=${props.comment.id}`,
                            })}>
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
        }
    }

    componentWillMount() {
        this.comment = {
            id: 1093,
            owenerId: 109,
            ownername: "Cefalexin",
            targetTicketId: 1000,
            content: "Sustained-release Capsules",
            replys: "http://www.google.com/search?q=Shyndec",
            createTime: '2017-08-34',
        };
        this.replies = [
            {
                id: 2000,
                ownerId: 203,
                ownername: "intel",
                targetUserId: 109,
                targetTicketId: 1093,
                targetObjectId: 1777,
                content: 'Kabylake Caffee',
                createTime: '2009-04-11',
            },
            {
                id: 3000,
                ownerId: 404,
                ownername: 'not found',
                targetTicketId: 1093,
                targetObjectId: 1843,
                content: 'During the BRICS Xiamen Summit held in China in September, BRICS members agreed to deepen strategic partnerships, strengthen cooperation on issues related to the economy, trade, politics, security and people-to-people exchanges, and set up the BRICS Plus platform, Xi said.',
                createTime: '2016-03-12',
            }
        ]
        // fetch comment/reply info from backend,
    }

    toggleReply = (id) => {
        this.setState({
            replyid: id,
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
                                    {this.comment.ownername}
                                </Typography>
                                <Typography variant='caption' color='textSecondary'>
                                    {this.comment.createTime}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={9} md={6} className={classNames(classes.grid, classes.inline, classes.bottomBorder)}>
                            <Grid item xs={12} md={12} className={classes.block}>
                                <Typography variant='body1' component='p' gutterBottom color='default' className={classes.content}>
                                    {this.comment.content}
                                </Typography>
                            </Grid>
                            <Grid item md={5}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <Grid item xs={12} md={6}>
                            <TextField multiline fullWidth rows={3} rowsMax={6}
                                       placeholder={`回复${this.comment.ownername}`}
                                       InputProps={{
                                           disableUnderline: true,
                                           classes: {
                                               root: classes.commentRoot,
                                               input : classes.commentInput,
                                           }
                                       }}
                                       label="回复" id="reply" InputLabelProps={{
                                           shrink: true, classes: classes.commentFormLabel,
                            }}

                                       />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.grid}>
                        <Grid item xs={10} md={5} className={classes.grid}>
                            <div>{"  "}</div>
                        </Grid>
                        <Grid item xs={2} md={1} className={classes.grid}>
                            <IconButton>
                                <CommentText/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    {
                        this.replies.map(s => (item({classes: classes, comment: s, reply: this.toggleReply})))
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