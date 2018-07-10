import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import MovieIcon from 'mdi-material-ui/Movie';
import TheaterIcon from 'mdi-material-ui/Theater';
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal';
import StarIcon from 'mdi-material-ui/Star';
import StarOutlineIcon from 'mdi-material-ui/StarOutline';
import CartPlusIcon from 'mdi-material-ui/CartPlus';
import ShoppingIcon from 'mdi-material-ui/Shopping';
import PlaceIcon from '@material-ui/icons/Place';
import DetailModal from './DetailModal';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
    },
    card: {
        maxWidth: 345,
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
        height: 195,
    },
    image: {
        width: '100%',
        maxHeight: 200,
        margin: 'auto 0',
    },
    brief: {
        height: 100,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    buttonIcon: {
        marginRight: theme.spacing.unit,
        color: '#ffebee',
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

    toggleCart = (id) => {
        /*
         * fetch ("/add_to_cart?id="+id
         */
        fetch ('/add_to_cart?id='+id, {method: "GET", credentials: "include"})
            .then(response => {
                if (response.status !== 200) throw {msg: "Add to Cart failed!"};
                else alert("Add to cart succeed");
            })
            .catch(e => console.log(e));
    };

    toggleBuy = (id) => {
        fetch("/buy?id="+id, {method: "GET", credentials: "include"})
            .then(response => {
                if (response.status !== 200) throw {msg: "Buy failed"};
                else alert("Add to cart succeed");
            })
            .catch(e => console.log(e));
    };

    handleOpen = () => this.setState({open: true});

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const {classes, card} = this.props;

        const actIcon = () => {
            const icon = card.icon;
            if (icon === 'music') return <MusicCircle/>;
            else if (icon === 'movie') return <MovieIcon/>;
            else if (icon === 'show') return <TheaterIcon/>;
            else return <DotsHorizontal/>
        };

        const titledImage = (
            <div>
                <GridListTile component='div' className={classes.imageSec}>
                    <img className={classes.image}
                         src={card.src}
                         alt={card.title}/>
                    <GridListTileBar title={card.title}
                                     subtitle={<span>{card.subtitle}</span>}
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
                    <CardContent className={classes.brief} onClick={this.handleOpen}>
                        <Typography gutterBottom variant='headline' component='h2'>
                            {card.title}
                        </Typography>
                        <Typography variant='subheading' component='h3' gutterBottom>
                            <PlaceIcon/>{card.location}{' '}
                        </Typography>
                        <Typography component='p'>
                            {card.brief}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={this.toggleLike}>
                            {this.state.like ? <StarIcon/> : <StarOutlineIcon/>}
                            Like
                        </Button>
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon} onClick={() => this.toggleCart(card.id)}>
                            <CartPlusIcon/>
                            Add
                        </Button>
                        <Button variant='extendedFab' color='primary' className={classes.buttonIcon} onClick={() => this.toggleBuy(card.id)}>
                            <ShoppingIcon/>
                            Pay
                        </Button>
                    </CardActions>
                    <Modal ariaLabelledy="simple-model-title" ariaDescribeby="simple-modal-description"
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