import React, { useState, useEffect, useRef } from 'react';
import '../styles/Footer.css';
import emailjs from 'emailjs-com';

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [expanded, setExpanded] = useState(false);
  const footerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_uzfjw0m', 'template_zgbx1c5', {
      username: form.name,
      userlogin: form.email,
      usermessage: form.message
    }, 'jBMilYmLsGL5c4uK2')
    .then((result) => {
      alert('Сообщение отправлено!');
      setForm({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Не удалось отправить сообщение', error);
      alert('Ошибка отправки сообщения.');
    });
  };

  const toggleFooter = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (event) => {
    if (footerRef.current && !footerRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <footer ref={footerRef} className={`footer ${expanded ? 'expanded' : ''}`}>
      <div className="footerToggle" onClick={toggleFooter}>
        <p>&copy; SABE</p>
      </div>
      <div className="footerContent">
        <div className="footerInfo">
          <h1>About SABE</h1>
          <h2>SABE - это не один маленький проект. Это экосистема, каждый сайт, каждый проект сделан с любовью к своей работе и к пользователям. Команда SABE трудится каждый день, чтобы вы смогли видеть удобные и приятные глазу приложения и сайты, Здесь представлен один из маленьких проектов команды - магазин курсов программирования, который объединяется с другими магазинами и создаёт свой маркеплейс. С любовью, команда SABE.
          </h2>
        </div>
        <div className="footerForm">
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label>Name:</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="formGroup">
              <label>Email:</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="formGroup">
              <label>Message:</label>
              <textarea name="message" value={form.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submitButton">Send</button>
          </form>
        </div>
      </div>
      {expanded && (
        <div className="logoDescription">
          <text>SABE - a small company with huge prospects.</text>
        </div>
      )}
    </footer>
  );
};

export default Footer;
