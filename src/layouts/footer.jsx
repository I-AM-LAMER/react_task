import './navigationBar.css'

import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { useNavigate } from 'react-router-dom';


export default function Footer({ children }) {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    const goToServicePage = () => {
        navigate('/services');
    };
        return (
            <div className="header">
                <div className="header-left">
                    <Button label="Главная" onClick={goToHomePage} size="s" className="header-button" />
                    <Button label="Сервисы" onClick={goToServicePage} size="s" className="header-button" />
                </div>
                <div className="header-right">
                   <Text>
                        {'Ⓒ 2024 Моя Компания' }
                   </Text>
                </div>
            </div>
    );
}
