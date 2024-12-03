import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Button } from '@consta/uikit/Button';
import { useDispatch } from 'react-redux';
import { login } from '../../components/app/slices/authSlice';
import { set_user } from '../../components/app/slices/userSlice';
import { useNavigate } from 'react-router-dom';




function LoginPage() {
  let dispatch = useDispatch(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 6 && /[a-zA-Z]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: '',
      password: ''
    });

    if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум одну букву и цифру' }));
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Не удалось войти. Проверьте данные и попробуйте снова.';
        
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors[0].message || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('lastName', data.lastName)

      dispatch(set_user(data));
      dispatch(login())

      setUsername('');
      setPassword('');

      navigate('/')
      console.log('Авторизация успешна');
    } catch (error) {
      console.error('Произошла ошибка:', error);
      handleError(error.message);
    }
  };

  const handleError = (error) => {
    setErrors(prev => ({ ...prev, password: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Вход в систему</h2>
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className={styles.input1}
            required
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
          
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={handleInputChange}
            className={styles.input2}
            required
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          
          <Button type="submit" className={styles.button} label={"Войти"}/>
          <Button label="Назад" onClick={() => navigate('/')} className={styles.button} />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
