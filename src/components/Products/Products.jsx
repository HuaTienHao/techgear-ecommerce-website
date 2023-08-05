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

                <meta property="og:url" content="https://huatienhao.github.io/techgear-ecommerce-website/" />
                <meta property="og:title" content="TechGear - E-Commerce Website" />
                <meta property="og:description" content="A simple e-commerce website that sell computer components" />
                <meta property="og:image" content="https://img.freepik.com/free-vector/tech-banner-illustration-desktop-computer_107791-7920.jpg?w=1380&t=st=1691235666~exp=1691236266~hmac=113a7ceba16f66babed0c3a419ab4314beee1ff778e65fdfcf197fb0c550a6f1" />
                
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