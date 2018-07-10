import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from './Activity';
import {Cards} from './test-data/Cards';
import Typography from '@material-ui/core/Typography';
import Sliders from './Sliders/components/Sliders';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
});

const Img=[
    require('./Sliders/img/AAE8E3AD657B93F4597B9136A535A5EFD7276A59_size27_w757_h391.jpeg'),
    require('./Sliders/img/r_piratesofthecaribbeandeadmentellnotales_header_postst_a2b0f97a.jpeg'),
    require('./Sliders/img/steamuserimages-a.akamaihd.net.jpeg'),
];

class Home extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div >
                <Sliders
                    images={Img}
                    speed={1}
                    delay={2}
                    autoPlay={true}
                    autoParse={true}
                />
                <br/>
                <Typography variant="title" color="inherit"  style={{textAlign:'center'}} noWrap>
                    热门票品
                </Typography>
                <br/>
                <div className={classes.root}>
                    {
                        Cards.map((s, i) => {
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

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);