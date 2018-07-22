import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import pink from '@material-ui/core/colors/pink';
import Activity from '../com/Activity';
import PageBar from '../com/PageBar';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        width: 'inherit',
        padding: theme.spacing.unit,
    },
    text: {
        color: '#ef33ef',
        margin: theme.spacing.unit,
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        [theme.breakpoints.up('xl')]: {
            width: 1760,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1056,
        },
        [theme.breakpoints.up('md')]: {
            width: 704,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        margin: '0 auto',
    },
    cards: {
        margin: `${theme.spacing.unit}px 0`,
        flexWrap: 'wrap',
        display: 'flex'
    },
    card: {
        flexGrow: 1,
    },
    loading: {
        display: 'block',
        position: 'relative',
    },
    fabProgress: {
        color: pink[400],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
});

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
        }
    }

    componentWillMount() {
        const {match} = this.props;
        const category = match.params.category;
        const {page} = this.state;
        fetch(this.url + `?pagenumber=${page}&type=${category}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error!");
                /*
                this.setState({
                    data: data.content,
                });
                */
                this.totalPages = data.totalPages;
            })
            .catch(e => console.log(e));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {match} = nextProps;
        this.setState({
            category: match.params.category,
            page: 1,
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {match} = this.props;
        let preCategory = match.params.category;
        let nextCategory = match.params.category;
        if (nextCategory !== preCategory) return true;
        preCategory = this.state.category;
        nextCategory = nextState.category;
        if (preCategory !== nextCategory) return true;
        return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match} = this.props;
        const category = match.params.category;
        const {page} = this.state;
        fetch(this.url + `?pagenumber=${page}&type=${category}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error!");
                this.setState({
                    data: data.content,
                });
                this.totalPages = data.totalPages;
            })
            .catch(e => console.log(e));
    }

    viewPage = (idx) => {
        const category = this.props.match.params.category;
        fetch(this.url + `?pagenumber=${idx}&type=${category}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(data => {
                if (data === null) throw Error("Response error");
                this.setState({
                    data: data.content,
                    page: idx,
                });
                this.totalPages = data.totalPages;
            })
            .catch(e => console.log(e));
    };

    render() {
        const {classes} = this.props;
        const {data, page} = this.state;

        return (
            data === null ? (
                    <div className={classes.loading}>
                        <CircularProgress size={58} className={classes.fabProgress}/>
                    </div>
                ) :
                <div className={classes.root}>
                    <div className={classes.content}>
                        <div className={classes.cards}>
                            {data.map((x, i) => {
                                return (<Activity card={x} key={i} className={classes.card}/>)
                            })}
                        </div>
                    </div>
                    <div>
                        <PageBar current={page} max={this.totalPages} goto={this.viewPage}/>
                    </div>
                </div>
        );
    }
}

Category.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);