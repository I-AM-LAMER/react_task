import './navigationBar.css'
import { Button } from '@consta/uikit/Button';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'

import { getUser, isAuth } from '../components/app/store'


import { useDispatch } from 'react-redux';
import { logout } from '../components/app/slices/authSlice';


export default function NavBar({ children }) {

    const user_data = useSelector(getUser)
    const is_logged_in = useSelector(isAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    const goToServicePage = () => {
        navigate('/services');
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const goToProfilePage = () => {
        navigate('/profile');

    };
    const manage_logout = () => {
        dispatch(logout())
        navigate('/login')
    };
        return (
            <div className="header">
                <div className="header-left">
                    <Button label="Главная" onClick={goToHomePage} size="s" className="header-button" />
                    <Button label="Сервисы" onClick={goToServicePage} size="s" className="header-button" />
                </div>
                <div className="header-right">
                    <Button label={user_data.firstName} onClick={goToProfilePage} size="s" className="profile-button" color='#00000'/>
                    {!is_logged_in ? <Button label="Войти" onClick={goToLoginPage} size="s" className="header-button" /> : <Button label="Выйти" onClick={manage_logout} size="s" className="header-button" />}
                </div>
            </div>
        );
  }