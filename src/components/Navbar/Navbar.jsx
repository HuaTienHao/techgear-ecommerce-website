import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, TextField } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = ({ totalItems, handleSearchChange }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        TechGear
                    </Typography>

                    {location.pathname === '/' && (
                        <>
                            <TextField className={classes.search} placeholder='Search' onChange={(e) => {handleSearchChange(e.target.value)}}/>
                            <div className={classes.grow} />
                            <div className={classes.button}>
                                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary" overlap='rectangular'>
                                    <ShoppingCart/>
                                </Badge>
                                </IconButton>
                            </div>
                        </>
                     )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;