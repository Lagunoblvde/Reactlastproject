import React from 'react';
import '../styles/Header.css';
import { FaShoppingCart, FaHeart, FaBook } from 'react-icons/fa'; // Используем FaBook как иконку каталога
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="logo">SABE</div>
      <div className="search-bar">
        <input type="text" placeholder="Поиск товаров..." onChange={(e) => onSearch(e.target.value)} />
        <button type="button">Поиск</button>
      </div>
      <div className="icons">
        <Link to="/favorites" className="icon"><FaHeart /></Link>
        <Link to="/cart" className="icon"><FaShoppingCart /></Link>
        <Link to="/catalog" className="icon"><FaBook /></Link> {/* Заменили иконку на FaBook */}
      </div>
    </header>
  );
};

export default Header;
