import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import CalendarToday from 'mdi-material-ui/CalendarToday';
import Collapse from '@material-ui/core/Collapse';
import MoreVert from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

const styles = theme => ({
    paper: {
        position: 'absolute',
        minWidth: 360,
        maxWidth: 720,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadow[5],
        padding: theme.spacing.unit * 4,
    },
    modal: {
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        padding: theme.spacing.unit,
    },
    table: {
        width: '100%',
    },
});

class DetailModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            like: false,
            delete: false,
            dates: [],
            seat: [],
        };
    }

    toggleMore = () => this.setState({open: ! this.state.open});

    render() {
        const {classes, card} = this.props;

        return (
            <div style={{top: '50%', left: '50%', transform: `translate(-50%, -50%)`}} className={classes.paper}>
                <div className={classes.modal}>
                    <img src={card.src} alt={card.title} className={classes.image}/>
                </div>
                <div>
                    <Typography variant='title' component='h2' color='primary' gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        {card.subtitle}
                    </Typography>
                    <Typography variant='subheading' component='h3' color='secondary'>
                        <PlaceIcon/>
                        {card.location}
                    </Typography>
                    <Typography variant='title' component='h2'>
                        Introduction
                        <IconButton onClick={this.toggleMore}>
                            <MoreVert/>
                        </IconButton>
                    </Typography>
                    <Collapse in={this.state.collapse} timeout='auto' unmountOnExit>
                        <Typography variant='body1' component='p'>
                            {card.brief}
                        </Typography>
                    </Collapse>
                    <Typography variant='headline'><CalendarToday/> Date</Typography>
                    <div>
                        {card.dates.map((s, i) => {
                            const {dates} = this.state;
                            dates.push(0);
                            return (
                                <Button variant={dates[i] === 0 ? "outlined" : "contained"} color='primary'>{s}</Button>
                            )
                        })}
                    </div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {}
                            </TableRow>
                        </TableHead>
                    </Table>
                </div>
            </div>
        )
    }
}

DetailModal.propTypes = {
    classes: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailModal);