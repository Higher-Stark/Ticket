import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {NavLink} from "react-router-dom";
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Collections from '@material-ui/icons/Collections';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import lightGreen from "@material-ui/core/colors/lightGreen";
import red from "@material-ui/core/colors/red";
import Ballet from './svg/ballet3.svg';
import Exhibition from './svg/exhibition.svg';
import Vocal from './svg/ic-vocal.svg';
import Curtain from './svg/curtain.svg';
import Mask from './svg/mask.svg';
import Parent from './svg/parenting.svg';
import Acrobatics from './svg/acrobatics.svg';
import BasketballIcon from 'mdi-material-ui/Basketball';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const listStyles = {
    home: {
        color: '#2196f3',
    },
    music: {
        color: red['A400'],
    },
    sports: {
        color: lightGreen['A400'],
    },
    svg: {
        width: 24,
        height: 24,
    },
    parenting: {
        color: '#547491',
    },
};

class NestedList extends React.Component {
    state = {open: false};

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    render() {
        return (
            <div>
                <ListItem  button onClick={this.handleClick}>
                    <ListItemIcon><Person/></ListItemIcon>
                    <ListItemText inset primary='Account'/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={NavLink} to='/account' >
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText inset primary="Profile"/>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText inset primary="Order"/>
                        </ListItem>
                        <ListItem button  >
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText inset primary="Wallet"/>
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button component={NavLink} to='/cart'>
                    <ListItemIcon><ShoppingCart/></ListItemIcon>
                    <ListItemText inset primary='Cart'/>
                </ListItem>
                <ListItem button component={NavLink} to='/collection'>
                    <ListItemIcon><Collections/></ListItemIcon>
                    <ListItemText inset primary='Collection'/>
                </ListItem>
                <Divider/>
                <ListItem button component={NavLink} to='/'>
                    <ListItemIcon><HomeIcon style={listStyles.home}/></ListItemIcon>
                    <ListItemText inset primary='Home'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/vocal concert'>
                    <ListItemIcon><img src={Vocal} alt='vocal' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Vocal Concert'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/show'>
                    <ListItemIcon><img src={Curtain} alt='show' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Show'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/exhibition'>
                    <ListItemIcon><img src={Exhibition} alt='exhibition' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Exhibition'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/opera'>
                    <ListItemIcon><img src={Mask} alt='opera' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Opera'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/sports'>
                    <ListItemIcon><BasketballIcon style={listStyles.sports}/></ListItemIcon>
                    <ListItemText inset primary='Sports'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/dance'>
                    <ListItemIcon><img src={Ballet} alt='dance' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Dance'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/parent'>
                    <ListItemIcon><img src={Parent} alt='parent' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Parent-child'/>
                </ListItem>
                <ListItem button component={NavLink} to='/category/acrobatics'>
                    <ListItemIcon><img src={Acrobatics} alt='Acrobatics' style={listStyles.svg}/></ListItemIcon>
                    <ListItemText inset primary='Acrobatics'/>
                </ListItem>
                <Divider/>
                <ListItem button onClick={this.props.toggleLogout}>
                    <ListItemIcon><LogoutVariant/></ListItemIcon>
                    <ListItemText inset primary='Logout'/>
                </ListItem>
            </div>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);