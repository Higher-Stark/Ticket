import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import Collections from '@material-ui/icons/Collections';
import Divider from '@material-ui/core/Divider';
import Bookmark from '@material-ui/icons/Bookmark';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';

import MusicCircle from 'mdi-material-ui/MusicCircle';
import MovieRoll from 'mdi-material-ui/MovieRoll';
import Theater from 'mdi-material-ui/Theater';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';
import {NavLink} from 'react-router-dom';


// not login
export const NavMenuList1 = (
    <div>
        <ListItem >
            <ListItemIcon><AccountCircle/></ListItemIcon>
        </ListItem>
        <ListItem>
            <ListItemIcon><Bookmark/></ListItemIcon>
        </ListItem>
    </div>
);

// login
export const NavMenuList2 = (
    <div>
        <NavLink to='/signup'>
            <ListItem button>
                <ListItemIcon><Person/></ListItemIcon>
                <ListItemText inset primary='Account'/>
            </ListItem>
        </NavLink>
        <ListItem button>
            <ListItemIcon><ShoppingCart/></ListItemIcon>
            <ListItemText inset primary='Cart'/>
        </ListItem>
        <ListItem button>
            <ListItemIcon><Collections/></ListItemIcon>
            <ListItemText inset primary='Collection'/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => {
            alert("Market")
        }}>
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText inset primary='Home'/>
        </ListItem>
        <ListItem button onClick={() => {
            alert("Concert")
        }}>
            <ListItemIcon><Bookmark/></ListItemIcon>
            <ListItemText inset primary='Concert'/>
        </ListItem>
        <ListItem button onClick={() => {
            alert("Show")
        }}>
            <ListItemIcon><Bookmark/></ListItemIcon>
            <ListItemText inset primary='Show'/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => {
            document.getElementById('not').style.display = 'block';
            document.getElementById('login').style.display = 'none';
            document.getElementById('welcome').style.display = 'block';
            document.getElementById('ticket').style.display = 'none';
        }}>
            <ListItemIcon><LogoutVariant/></ListItemIcon>
            <ListItemText inset primary='Logout'/>
        </ListItem>
    </div>
);

