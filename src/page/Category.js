import React, {Component} from 'react';
import ReactLoading from "react-loading";
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import Activity from '../com/Activity';
import styled from "tachyons-components";


const Section = styled('div')`
flex flex-wrap content-center justify-center w-100 h-100`;

export const Article = styled('div')`
w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;

export const Prop = styled('h3')`
f5 f4-ns mb0 white`;

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
    }
});

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
        }
    }

    componentDidMount() {
        const {page} = this.state;
        const {sort} = this.props.match.params;
        const url = `http://120.79.58.85:30005/Ticket/QueryByTypePage?pagenumber=${page}&type=${sort}`;
        console.log(url);
        fetch(url, {
            method: 'GET',
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => this.setState({data: data.content}))
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;

        const data = this.state.data;
        console.log(data);

        const loading = (
            <Section>
                <Article>
                    <ReactLoading type="bars" color="#fff"/>
                    <Prop>Loading</Prop>
                </Article>
            </Section>
        );

        const activities = (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.cards}>
                        {data.map(x => {
                            return (
                                <div className='animated fadeIn'>
                                    <Activity card={x} key={x.id} className={classes.card}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );

        const toShow = (
            <div>
                {data.length === 0 ? loading : activities}
            </div>
        );


        return (
            <div>
                {toShow}
            </div>
        );
    }
}

Category.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
