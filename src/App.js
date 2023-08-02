import React, { useState, useEffect } from 'react';

import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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


  if (!cart) return "Loading...";

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} handleSearchChange={handleSearchChange} />

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