import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/Catalog.css';
import ProductModal from './ProductAbout';

const Catalog = ({ searchQuery = '', openProductModal, closeProductModal, modalIsOpen, selectedProduct, addToFavorites, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the products data:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  return (
    <div className="catalog">
      <div className="productsContainer">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="product-item" 
              onClick={() => openProductModal(product)}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </motion.div>
          ))
        ) : (
          <p>Товары не найдены</p>
        )}
      </div>
      <ProductModal
        isOpen={modalIsOpen}
        onRequestClose={closeProductModal}
        product={selectedProduct}
        addToFavorites={addToFavorites}
        addToCart={addToCart}
      />
    </div>
  );
};

export default Catalog;
