import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import MusicCircle from 'mdi-material-ui/MusicCircle';
import Basketball from 'mdi-material-ui/Basketball';
import TheaterIcon from 'mdi-material-ui/Theater';
import StarIcon from 'mdi-material-ui/Star';
import StarOutlineIcon from 'mdi-material-ui/StarOutline';
import PlaceIcon from '@material-ui/icons/Place';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import DetailModal from './DetailModal';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
    },
    card: {
        width: 336,
    },
    icon: {
        color: '#eeeeee',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',  // 16:9
    },
    header: {
        height: '100%',
    },
    imageSec: {
        display: 'block',
        height: 189,
        width: 'inherit',
        justifyContent: 'center',
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: 'inherit',
        height: 'inherit',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        padding: 'auto auto',
    },
    intro: {
        height: 100,
        overflow: 'hidden',
        textOverflow: 'fade(10px)',
    },
    brief: {
        width: 'inherit',
        height: 60,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    buttonIcon: {
        flexGrow: 1,
        marginRight: theme.spacing.unit,
        color: '#FFF9C4',
        maxWidth: '25%',
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.props.like,
            open: false,
        };
    };

    toggleLike = () => this.setState({like: !this.state.like});

    handleOpen = () => this.setState({open: true});

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const {classes, card} = this.props;

        const actIcon = () => {
            const type = card.type;
            if (type.indexOf('sports') !== -1) return <Basketball/>;
            else if (type.indexOf("concert") !== -1) return <MusicCircle/>;
            else if (type.indexOf("show") !== -1) return <TheaterIcon/>;
            else return (<MoreHoriz/>);
        };

        const titledImage = (
            <div>
                <GridListTile component={Link} className={classes.imageSec} to={`/detail/${card.id}`}>
                    <div className={classes.imageWrapper}>
                    <img className={classes.image}
                         src={card.image}
                         alt={card.title}/>
                    </div>
                    <GridListTileBar title={card.title}
                                     subtitle={<span>{card.city}</span>}
                                     actionIcon={<IconButton className={classes.icon}>{actIcon()}</IconButton>}
                    />
                </GridListTile>
            </div>
        );

        return (
            <div className={classes.root}>
                <Card className={classes.card} >
                    <CardMedia className={classes.media} component={() => titledImage}
                               image='file-image.svg'
                               title='Card Image'
                    />
                    <CardContent className={classes.intro}>
                        <Typography variant='subheading' component='h3' gutterBottom>
                            <PlaceIcon/>{card.venue}{' '}
                        </Typography>
                        <Typography component='p' variant='body1' className={classes.brief}>
                            {card.intro}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <CardActions className={classes.cardAction}>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={this.toggleLike}>
                            {this.state.like ? <StarIcon/> : <StarOutlineIcon/>}
                            Like
                        </Button>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={this.handleOpen}>
                            <MoreHoriz/>
                        </Button>
                    </CardActions>
                    <Modal arialabelledy="simple-model-title" ariadescribeby="simple-modal-description"
                           open={this.state.open} onClose={this.handleClose}
                    >
                        <DetailModal card={card}/>
                    </Modal>
                </Card>
            </div>
        );
    }
}

Activity.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activity);