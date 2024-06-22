import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import '../styles/ProductAbout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ isOpen, onRequestClose, product, addToFavorites, addToCart }) => {
  if (!product) return null;

  const customStyles = {
    content: {
      width: '50%',
      height: '60%',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      overflow: 'auto',
      position: 'relative' // Для абсолютного позиционирования кнопки закрытия
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      style={customStyles}
    >
      <div className="product-modal">
        <button className="close-button" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.fulldescription}</p>
        <p className="price">Price: ${product.price}</p>
        <div className="button-container">
          <motion.button
            className="add-to-favorites"
            onClick={() => addToFavorites(product)}
            whileHover={{ scale: 1.1, backgroundColor: '#ff4081', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
          >
            Add to Favorites
          </motion.button>
          <motion.button
            className="add-to-cart"
            onClick={() => addToCart(product)}
            whileHover={{ scale: 1.1, backgroundColor: '#4caf50', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
