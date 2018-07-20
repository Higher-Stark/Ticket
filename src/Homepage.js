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
        // display: 'flex',
        // width: '100%',
        padding: `0 ${theme.spacing.unit * 2}px`,
        maxHeight: '360px',
        width: 'auto',
        display: 'block',
        overflow: 'hidden',
        justifyContent: 'center',
        marginBottom: theme.spacing.unit * 2,
    },
    content: {
        display: 'inline-block',
        flexGrow: 1,
        flexWrap: 'wrap',
        justifyContent: 'start',
        width: 'auto',
        /*
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
        */
        // margin: '0 auto',
    },
    card: {
        display: 'inline-block',
        flexGrow: 1,
    },
    pageBar: {
        display: 'flex',
        justifyContent: 'center',
        width: 'inherit',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing.unit,
        position: 'relative',
    },
    block: {
        display: 'block',
        position: 'relative',
    },
    buttonMore: {
        backgroundColor : pink[400],
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
    {
        src: 'https://steamuserimages-a.akamaihd.net/ugc/928183771923008568/3B8DAE51B21FB04474D50BC3492219BECC3862F6/?interpolation=lanczos-none&output-format=jpeg&output-quality=95&fit=inside%7C637%3A358&composite-to=*,*%7C637%3A358&background-color=black'
    },
    {
        src: 'https://lumiere-a.akamaihd.net/v1/images/r_piratesofthecaribbeandeadmentellnotales_header_postst_a2b0f97a.jpeg?region=0,0,2048,803'
    },
    {
        src: 'http://tu.qiumibao.com/v/img/180518/206969_01133852974.jpg'
    }
];

class Homepage extends Component {
    content=[];

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
        const url = `http://47.106.23.224:30005/Ticket/QueryShowPage?pagenumber=${page}`;
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
                    firstLoad: true,
                })
            })
            .catch(e => console.log(e))
    }

    load = () => {
        this.setState({loading: true});
        const {page} = this.state;
        const url = `http://47.106.23.224:30005/Ticket/QueryShowPage?pagenumber=${page}`;
        fetch (url, {
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
                    <CircularProgress className={classes.progress} size={50} />
                </Typography>
            </div>
        );

        return (
            <div className={classes.root}>
                <div id="topAnchor"></div>
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
                <div className={classes.wrapper}>
                    <div id='content' className={classes.content}>
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
                { firstLoad &&
                (<div className={classes.wrapper}>
                    <div className={classes.block}>
                        <Button variant='fab' color='primary'
                                className={classes.buttonMore}
                                onClick={this.load}
                        >
                            <ChevronDown/>
                        </Button>
                        {loading && <CircularProgress size={68} className={classes.fabProgress}/> }
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