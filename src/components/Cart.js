import React, { useState } from 'react';
import '../styles/Cart.css'; // Подключение файла стилей
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

const Cart = ({ cartProducts = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const totalPrice = cartProducts.length > 0 
    ? cartProducts.reduce((total, product) => total + product.price, 0)
    : 0;

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const onSubmit = (data) => {
    if (!recaptchaValue) {
      alert('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    const productNames = cartProducts.map(product => product.name).join(', ');

    emailjs.send('service_uzfjw0m', 'template_x82gupi', {
      username: data.name,
      userlogin: data.email,
      usermessage: data.address,
      productname: productNames,
      productprice: totalPrice
    }, 'jBMilYmLsGL5c4uK2')
    .then((result) => {
      alert('Сообщение отправлено!');
      setIsModalOpen(false);
    })
    .catch((error) => {
      console.error('Не удалось отправить сообщение', error);
      alert('Ошибка отправки сообщения.');
    });
  };

  return (
    <div className="cart">
      <h1>Корзина</h1>
      {cartProducts.length > 0 ? (
        <>
          <div className="productsContainer">
            {cartProducts.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>{product.price} $</p>
              </div>
            ))}
          </div>
          <div className="cartInfo">
            <h2>Итоговая стоимость: {totalPrice} ₽</h2>
            <button className="checkoutButton" onClick={handleOrderClick}>Оформить заказ</button>
          </div>
        </>
      ) : (
        <p>Ваша корзина пуста.</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Заполните данные для заказа</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                ФИО:
                <input
                  type="text"
                  {...register('name', { required: 'ФИО обязательно' })}
                />
                {errors.name && <span>{errors.name.message}</span>}
              </label>
              <label>
                Адрес:
                <input
                  type="text"
                  {...register('address', { required: 'Адрес обязателен' })}
                />
                {errors.address && <span>{errors.address.message}</span>}
              </label>
              <label>
                Способ оплаты:
                <select
                  {...register('paymentMethod', { required: 'Способ оплаты обязателен' })}
                >
                  <option value="">Выберите способ оплаты</option>
                  <option value="card">Карта</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Наличные</option>
                </select>
                {errors.paymentMethod && <span>{errors.paymentMethod.message}</span>}
              </label>
              <label>
                Почта:
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Почта обязательна',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат почты'
                    }
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </label>
              <ReCAPTCHA
                sitekey="6Lfzu_wpAAAAAHR91arXz8h33ICe-exXQ67lNydK"
                onChange={handleRecaptchaChange}
              />
              <button type="submit">Отправить</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Отмена</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
