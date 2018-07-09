import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import Collections from '@material-ui/icons/Collections';
import Bookmark from '@material-ui/icons/Bookmark';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import MusicCircle from 'mdi-material-ui/MusicCircle';
import MovieRoll from 'mdi-material-ui/MovieRoll';
import Theater from 'mdi-material-ui/Theater';
import {NavLink} from 'react-router-dom';


// not login
export const NavMenuList1 = (
        <div>
            <ListItem button component={NavLink} to='/homepage/signup'>
                <ListItemIcon><AccountCircle/></ListItemIcon>
                <ListItemText inset primary='Sign in/up'/>
            </ListItem>
            <Divider/>
            <ListItem button component={NavLink} to='/homepage/'>
                <ListItemIcon><Home color='primary'/></ListItemIcon>
                <ListItemText inset primary='Home'/>
            </ListItem>
            <ListItem button component={NavLink} to='/homepage/concert'>
                <ListItemIcon><Bookmark color='secondary'/></ListItemIcon>
                <ListItemText inset primary='Concert'/>
            </ListItem>
            <ListItem button component={NavLink} to='/homepage/show'>
                <ListItemIcon><Bookmark color="error"/></ListItemIcon>
                <ListItemText inset primary='Show'/>
            </ListItem>
        </div>
);

// login
export const NavMenuList2 = (
    <div>
        <ListItem button component={NavLink} to='/homepage/account'>
            <ListItemIcon><Person/></ListItemIcon>
            <ListItemText inset primary='Account'/>
        </ListItem>
        <ListItem button component={NavLink} to='/homepage/cart'>
            <ListItemIcon><ShoppingCart/></ListItemIcon>
            <ListItemText inset primary='Cart'/>
        </ListItem>
        <ListItem button component={NavLink} to='/homepage/collection'>
            <ListItemIcon><Collections/></ListItemIcon>
            <ListItemText inset primary='Collection'/>
        </ListItem>
        <Divider/>
        <ListItem button component={NavLink} to='/homepage/'>
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText inset primary='Home'/>
        </ListItem>
        <ListItem button component={NavLink} to='/homepage/concert'>
            <ListItemIcon><MusicCircle/></ListItemIcon>
            <ListItemText inset primary='Concert'/>
        </ListItem>
        <ListItem button component={NavLink} to='/homepage/show'>
            <ListItemIcon><Theater/></ListItemIcon>
            <ListItemText inset primary='Show'/>
        </ListItem>
        <ListItem button component={NavLink} to='/homepage/movie'>
            <ListItemIcon><MovieRoll/></ListItemIcon>
            <ListItemText inset primary='Movie'/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => {alert("logout")}}>
            <ListItemIcon><LogoutVariant/></ListItemIcon>
            <ListItemText inset primary='Logout'/>
        </ListItem>
    </div>
);

