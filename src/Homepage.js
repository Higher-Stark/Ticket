import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from './Activity';
import Typography from '@material-ui/core/Typography';
import Sliders from './Sliders/components/Sliders';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'normal',
        overflow: 'hidden',
        // alignItems: 'start'
    },
});

const Img = [
    {
        src: 'https://steamuserimages-a.akamaihd.net/ugc/928183771923008568/3B8DAE51B21FB04474D50BC3492219BECC3862F6/?interpolation=lanczos-none&output-format=jpeg&output-quality=95&fit=inside%7C637%3A358&composite-to=*,*%7C637%3A358&background-color=black'
    },
    {
        src:'https://lumiere-a.akamaihd.net/v1/images/r_piratesofthecaribbeandeadmentellnotales_header_postst_a2b0f97a.jpeg?region=0,0,2048,803'
    },
    {
        src:'http://tu.qiumibao.com/v/img/180518/206969_01133852974.jpg'
    }
];

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
        }
    }

    componentDidMount() {
        console.log(this.props.width);
        const {page} = this.state;
        const url = `http://120.79.58.85:30005/Ticket/QueryShowPage?pagenumber=${page}`;
        fetch (url, {
            method: 'GET',
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => this.setState({data: data.content}))
            .catch(e => console.log(e));
    }

    render() {
        const {classes} = this.props;
        const {data} = this.state;

        return (
            <div >

                <Sliders
                    images={Img}
                    speed={2}
                    delay={3}
                    autoPlay={true}
                    autoParse={true}
                />

                <br/>
                <Typography variant="title" color="inherit" style={{textAlign: 'center'}} noWrap>
                    热门票品
                </Typography>
                <br/>
                <div className={classes.root}>
                    {
                        data.map((s, i) => {
                            return (
                                <Activity card={s} key={i}/>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);