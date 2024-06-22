import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Favorites from './components/Favourite';
import Catalog from './components/Catalog';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/Main.css'; // Подключение Main.css

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const addToFavorites = (product) => {
    setFavoriteProducts((prevFavorites) => {
      if (!prevFavorites.find((item) => item.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const addToCart = (product) => {
    setCartProducts((prevCart) => [...prevCart, product]);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Main searchQuery={searchQuery} addToFavorites={addToFavorites} openProductModal={openProductModal} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartProducts={cartProducts} />} />
          <Route path="/favorites" element={<Favorites favoriteProducts={favoriteProducts} />} />
          <Route path="/catalog" element={<Catalog 
            searchQuery={searchQuery} 
            addToFavorites={addToFavorites} 
            openProductModal={openProductModal} 
            closeProductModal={closeProductModal} 
            modalIsOpen={modalIsOpen} 
            selectedProduct={selectedProduct} 
            addToCart={addToCart} 
          />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
