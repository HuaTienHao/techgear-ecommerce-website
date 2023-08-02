import React from "react";
import { Grid } from "@material-ui/core";
import { Helmet } from 'react-helmet';

import Product from "./Product/Product";
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    
    return (
        <main className={classes.content}>
            <Helmet>
                <title>TechGear - E-Commerce Website</title>
                <meta name='description' content='A simple e-commerce website that sell computer components' />
                <meta name="keywords" content="E-Commerce, ReactJS" />
            </Helmet>

            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;