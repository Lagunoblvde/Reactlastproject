import React from 'react';
import '../styles/Favourite.css'; // Подключение файла стилей

const Favorite = ({ favoriteProducts }) => {
  return (
    <div className="favorites">
      <h2>Избранное</h2>
      {favoriteProducts.length > 0 ? (
        <div className="productsContainer">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Вы ещё не добавили ни один курс в избранное(</p>
      )}
    </div>
  );
};

export default Favorite;
