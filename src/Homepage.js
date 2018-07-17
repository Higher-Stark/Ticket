import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Activity from './com/Activity';
import Typography from '@material-ui/core/Typography';
import Sliders from './Sliders/components/Sliders';
import PageBar from './com/PageBar';

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
            view: [],
            data: [],
            number: 1,
            totalPages: 0,
            maxPage: 0,
            idx: 1,
        }
    }

    componentDidMount() {
        console.log(this.props.width);
        const {page, number} = this.state;
        this.fetchPage(number);
        this.viewPage(page);
    }

    async fetchPage(page) {
        const url = `http://120.79.58.85:30005/Ticket/QueryShowPage?pagenumber=${page}`;
        let response = await fetch (url, {
            method: 'GET',
            credentials: "include",
        });
        try {
            let data = response.json();
            this.setState({
                data: data.content,
                totalPages: data.totalPages,
                maxPage: Math.ceil(data.totalElements / 6),
                number: data.number + 1,
            });
            return new Promise(() => 1);
        }
        catch (e) {
            console.log(e);
        }
        /*    .then(response => response.json())
            .then(data => this.setState({
                data: data.content,
                totalPages: data.totalPages,
                maxPage : Math.ceil(data.totalElements / 6),
                number: data.number + 1,
            }))
            .catch(e => console.log(e));
        */
    };

    async viewPage(idx) {
        const {page, data} = this.state;
        if (Math.ceil(idx / 3) !== page) {
            let response = await this.fetchPage(Math.ceil(idx / 3));
            console.log(response);
        }
        let idx1 = idx % 3;
        let view = data.splice(idx1, idx1 + 6);
        this.setState({
            view: view,
        });
    };

    render() {
        const {classes} = this.props;
        const {view, idx, maxPage} = this.state;

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
                        view.map((s, i) => {
                            return (
                                <Activity card={s} key={i}/>
                            );
                        })
                    }
                </div>
                <div>
                    <PageBar current={idx} max={maxPage} goto={this.viewPage}/>
                </div>
            </div>
        )
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);