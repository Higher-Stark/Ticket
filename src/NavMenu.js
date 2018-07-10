import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

// not login
export const NavMenuList1 = (
        <div>
            <Button color="inherit" component={NavLink} to='/homepage/signin'>Sign in/up</Button>
            <Button color="inherit" component={NavLink} to='/homepage/'>Home</Button>
            <Button color="inherit" component={NavLink} to='/homepage/concert'>Concert</Button>
            <Button color="inherit" component={NavLink} to='/homepage/show'>Show</Button>
        </div>
);

// login
export const NavMenuList2 = (
    <div>
        <Button color="inherit" component={NavLink} to='/homepage/account'>Account</Button>
        <Button color="inherit" component={NavLink} to='/homepage/cart'>Cart</Button>
        <Button color="inherit" component={NavLink} to='/homepage/collection'>Collection</Button>
        <Button color="inherit" component={NavLink} to='/homepage/'>Home</Button>
        <Button color="inherit" component={NavLink} to='/homepage/concert'>Concert</Button>
        <Button color="inherit" component={NavLink} to='/homepage/show'>Show</Button>
        <Button color="inherit" component={NavLink} to='/homepage/movie'>Movie</Button>
        <Button color="inherit" onClick={() => {alert("logout")}}>Logout</Button>
    </div>
);

