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
import MusicCircle from 'mdi-material-ui/MusicCircle';
import MovieIcon from 'mdi-material-ui/Movie';
import TheaterIcon from 'mdi-material-ui/Theater';
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal';
import StarIcon from 'mdi-material-ui/Star';
import StarOutlineIcon from 'mdi-material-ui/StarOutline';
import CartPlusIcon from 'mdi-material-ui/CartPlus';
import ShoppingIcon from 'mdi-material-ui/Shopping';

const styles = theme => ({
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
    image: {
        width: '100%',
        maxHeight: 200,
    },
    buttonIcon: {
        marginRight: theme.spacing.unit,
        color: '#ff1100',
    },
});

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.props.like,
        };
    };

    toggleLike = () => this.setState({like: !this.state.like})

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
                <GridListTile>
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
            <div>
                <Card className={classes.card} >
                    <CardMedia className={classes.media} component={() => titledImage}
                               image='file-image.svg'
                               title='Card Image'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='headline' component='h2'>
                            {card.title}
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
                        <Button variant='extendedFab' color='secondary' className={classes.buttonIcon}>
                            <CartPlusIcon/>
                            Add to Cart
                        </Button>
                        <Button variant='extendedFab' color='primary' className={classes.buttonIcon}>
                            <ShoppingIcon/>
                            Pay
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

Activity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activity);