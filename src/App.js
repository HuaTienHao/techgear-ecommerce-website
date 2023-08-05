import React, { useState, useEffect } from 'react';

import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-Y8RC9RVEPR";
ReactGA.initialize(MEASUREMENT_ID);


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  };
  
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  
  const handleAddToCart = async (productId, quantity) => {
    const data = await commerce.cart.add(productId, quantity);

    setCart(data);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const data = await commerce.cart.update(productId, { quantity });

    setCart(data);
  };

  const handleRemoveFromCart = async (productId) => {
    const data = await commerce.cart.remove(productId);

    setCart(data);
  };

  const handleEmptyCart = async () => {
    const data = await commerce.cart.empty();

    setCart(data);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
  
      const filteredData = data.filter((item) => {
        if (searchQuery === '')
          return true;
        return (item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      })
  
      setProducts(filteredData);
    };
    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: window.location.pathname + window.location.search, 
      title: "Test title" });
  }, []);


  if (!cart) return "Loading...";

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} handleSearchChange={handleSearchChange} />

        <Helmet>
            <title>TechGear - E-Commerce Website</title>
            <meta name='description' content='A simple e-commerce website that sell computer components' />
            <meta name="keywords" content="E-Commerce, ReactJS" />

            <meta property="og:url" content="https://huatienhao.github.io/techgear-ecommerce-website/" />
            <meta property="og:title" content="TechGear - E-Commerce Website" />
            <meta property="og:description" content="A simple e-commerce website that sell computer components" />
            <meta property="og:image" content="https://img.freepik.com/free-vector/tech-banner-illustration-desktop-computer_107791-7920.jpg?w=1380&t=st=1691235666~exp=1691236266~hmac=113a7ceba16f66babed0c3a419ab4314beee1ff778e65fdfcf197fb0c550a6f1" />
            
        </Helmet>

        <Routes>
          <Route exact path="/" element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }/>
          <Route exact path="/cart" element={
            <Cart 
              cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          }/>
          <Route exact path="/checkout" element={
            <Checkout 
              cart={cart} 
              order={order} 
              onCaptureCheckout={handleCaptureCheckout} 
              error={errorMessage}
              />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;