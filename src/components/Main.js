import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from './ProductAbout';
import '../styles/Main.css';

const Main = ({ searchQuery, addToFavorites, openProductModal, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data.slice(0, 10));
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

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  return (
    <main className="main">
      <section className="info">
        <h2>SABE Programming courses</h2>
        <p>Приветствуем в нашем магазине SABE с курсами программирования. Это один из сайтов команды SABE, предназначенный для выбора и приобретения курса по программированию. Здесь вы можете найти огромное количество лидирующих языков и купить курсы по их изучению.</p>
      </section>
      <section className="productsSection">
        <h2>Наши курсы:</h2>
        <div className="productsContainer">
          {filteredProducts.map(product => (
            <div key={product.id} className="product" onClick={() => openModal(product)}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </div>
          ))}
        </div>
      </section>
      <ProductModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
        addToFavorites={addToFavorites}
        addToCart={addToCart}
      />
    </main>
  );
};

export default Main;
