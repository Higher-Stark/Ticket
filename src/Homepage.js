import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import Button from '@material-ui/core/Button';
import pink from '@material-ui/core/colors/pink';
import ArrowCollapseUp from 'mdi-material-ui/ArrowCollapseUp';
import Activity from './com/Activity';
import Typography from '@material-ui/core/Typography';
import Sliders from './Sliders/components/Sliders';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        overflow: 'hidden',
        width: 'inherit',
        padding: '0 auto',
    },
    carousel: {
        padding: `0 ${theme.spacing.unit * 2}px`,
        maxHeight: '360px',
        width: 'auto',
        display: 'block',
        overflow: 'hidden',
        justifyContent: 'center',
        marginBottom: theme.spacing.unit * 2,
    },
    contentWrapper: {
        justifyContent: 'center',
        width: 'inherit',
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
        [theme.breakpoints.down('md')]: {
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
        display: 'flex',
    },
    card: {
        flexGrow: 1,
    },
    pageBar: {
        display: 'flex',
        justifyContent: 'center',
        width: 'inherit',
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // margin: theme.spacing.unit,
        position: 'relative',
    },
    block: {
        display: 'block',
        position: 'relative',
    },
    buttonMore: {
        backgroundColor: pink[400],
        '&:hover': {
            backgroundColor: pink[200],
        },
    },
    fabProgress: {
        color: pink[400],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    rightWrapper: {
        border: '9px solid transparent',
        borderBottomColor: '#3DA0DB',
        width: '0px',
        height: '0px',
        top: '0px',
    },
    topIcon: {
        position: 'fixed',
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
        color: '#f0f0f0',
        padding: theme.spacing.unit,
        backgroundColor: 'rgba(160, 160, 160, 0.3)',
        borderRadius: '4px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});


const Img = [
    {src: "http://image4.xishiqu.cn/upload/apic/920/180/920180606//DF7FD626-25DC-F101-6966-B2676DE254D6.jpg"},
    {src: "http://image3.xishiqu.cn/upload/apic/920/180/920180601//DD80509A-A417-52C5-90EE-221798DDD239.jpg"},
    {src: "http://image5.xishiqu.cn/upload/apic/920/180/920180706//B22F8B63-F36A-A1C5-DA7B-520A6A961D34.jpg"},
    {src: "http://image.xishiqu.cn/upload/apic/920/180/920180629//96E3F75A-FE93-96BE-2FC1-BC8F3CF8F6D6.jpg"}
];

class Homepage extends Component {
    content = [];

    constructor(props) {
        super(props);
        this.state = {
            items: 0,
            page: 1,
            loading: false,
            firstLoad: false,
        };
    }

    componentDidMount() {
        const {page} = this.state;
        const url = `http://pipipan.cn:30005/Ticket/QueryShowPage?pagenumber=${page}`;
        console.log(url);
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.content = this.content.concat(data.content);
                const quantity = data.numberOfElements;
                const {items} = this.state;
                this.setState({
                    items: items + quantity,
                    page: page + 1,
                    loading: false,
                    firstLoad: true,
                })
            })
            .catch(e => console.log(e))
    }

    load = () => {
        this.setState({loading: true});
        const {page} = this.state;
        const url = `http://pipipan.cn:30005/Ticket/QueryShowPage?pagenumber=${page}`;
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.content = this.content.concat(data.content);
                const quantity = data.numberOfElements;
                const {items} = this.state;
                this.setState({
                    items: items + quantity,
                    page: page + 1,
                    loading: false,
                })
            })
            .catch(e => console.log(e))
    };

    render() {
        const {classes} = this.props;
        const {items, loading, firstLoad} = this.state;

        const loadingCircle = (
            <div>
                <Typography variant="title" color="primary" align='center' noWrap>
                    <CircularProgress className={classes.progress} size={50}/>
                </Typography>
            </div>
        );

        return (
            <div className={classes.root}>
                <div id="topAnchor"/>
                <div className={classes.carousel}>
                    <Sliders
                        images={Img}
                        speed={2}
                        delay={3}
                        autoPlay={true}
                        autoParse={true}
                    />
                </div>
                <div>
                    <Typography variant="title" color="inherit" align='center' noWrap component="h2" gutterBottom>
                        热门票品
                    </Typography>
                </div>
                {items === 0 ? loadingCircle : null}
                    <div className={classes.contentWrapper}>
                    <div id='content' className={classes.content}>
                        <div className={classes.cards}>
                        {
                            this.content.slice(0, items).map((s, i) => {
                                return (
                                    <div className={classes.card} key={i}>
                                        <Activity card={s}/>
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>
                    </div>
                {firstLoad &&
                (<div className={classes.wrapper}>
                    <div className={classes.block}>
                        <Button variant='fab' color='primary'
                                className={classes.buttonMore}
                                onClick={this.load}
                        >
                            <ChevronDown/>
                        </Button>
                        {loading && <CircularProgress size={68} className={classes.fabProgress}/>}
                    </div>
                    <a href="#topAnchor" className={classes.topIcon}>
                        <ArrowCollapseUp/>
                    </a>
                </div>)}
            </div>
        )
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
