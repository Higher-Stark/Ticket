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
import Theater from 'mdi-material-ui/Theater';
import {NavLink} from 'react-router-dom';

const styles = {
    home: {
        color: '#2196f3',
    },
    music: {
        color: '#ff5722',
    },
    show: {
        color: '#00e676',
    },
    opera: {
        color: '#8bc34a',
    },
    sports: {
        color: '#f44336',
    },
    dance: {
        color: '#e040fb'
    },
};

// not login
export const NavMenuList1 = (
        <div>
            <ListItem button component={NavLink} to='/signin'>
                <ListItemIcon><AccountCircle/></ListItemIcon>
                <ListItemText inset primary='Sign in/up'/>
            </ListItem>
            <Divider/>
            <ListItem button component={NavLink} to='/'>
                <ListItemIcon><Home style={styles.home}/></ListItemIcon>
                <ListItemText inset primary='Home'/>
            </ListItem>
            <ListItem button component={NavLink} to='/category/music'>
                <ListItemIcon><MusicCircle style={styles.music}/></ListItemIcon>
                <ListItemText inset primary='Concert'/>
            </ListItem>
            <ListItem button component={NavLink} to='/category/show'>
                <ListItemIcon><Bookmark style={styles.show}/></ListItemIcon>
                <ListItemText inset primary='Show'/>
            </ListItem>
            <ListItem button component={NavLink} to='/category/opera'>
                <ListItemIcon><Theater style={styles.opera}/></ListItemIcon>
                <ListItemText inset primary='Opera'/>
            </ListItem>
            <ListItem button component={NavLink} to='/category/sports'>
                <ListItemIcon><Bookmark style={styles.sports}/></ListItemIcon>
                <ListItemText inset primary='Sports'/>
            </ListItem>
            <ListItem button component={NavLink} to='/category/dance'>
                <ListItemIcon><Bookmark style={styles.dance}/></ListItemIcon>
                <ListItemText inset primary='Dance'/>
            </ListItem>
        </div>
);

// login
export const NavMenuList2 = (
    <div>
        <ListItem button component={NavLink} to='/account'>
            <ListItemIcon><Person/></ListItemIcon>
            <ListItemText inset primary='Account'/>
        </ListItem>
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
            <ListItemIcon><Home style={styles.home}/></ListItemIcon>
            <ListItemText inset primary='Home'/>
        </ListItem>
        <ListItem button component={NavLink} to='/category/music'>
            <ListItemIcon><MusicCircle style={styles.music}/></ListItemIcon>
            <ListItemText inset primary='Concert'/>
        </ListItem>
        <ListItem button component={NavLink} to='/category/show'>
            <ListItemIcon><Bookmark style={styles.show}/></ListItemIcon>
            <ListItemText inset primary='Show'/>
        </ListItem>
        <ListItem button component={NavLink} to='/category/opera'>
            <ListItemIcon><Theater style={styles.opera}/></ListItemIcon>
            <ListItemText inset primary='Opera'/>
        </ListItem>
        <ListItem button component={NavLink} to='/category/sports'>
            <ListItemIcon><Bookmark style={styles.sports}/></ListItemIcon>
            <ListItemText inset primary='Sports'/>
        </ListItem>
        <ListItem button component={NavLink} to='/category/dance'>
            <ListItemIcon><Bookmark style={styles.dance}/></ListItemIcon>
            <ListItemText inset primary='Dance'/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => {alert("logout")}}>
            <ListItemIcon><LogoutVariant/></ListItemIcon>
            <ListItemText inset primary='Logout'/>
        </ListItem>
    </div>
);

