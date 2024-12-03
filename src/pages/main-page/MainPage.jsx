import { useState, useEffect } from 'react';

import { Card } from '@consta/uikit/Card';
import { List } from '@consta/uikit/ListCanary';
import { Text } from '@consta/uikit/Text';
import NavBar from '../../layouts/navigationBar';
import Footer from '../../layouts/footer';

import './MainPage.css';

const MainPage = () => {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main')
            .then((response) => response.json())
            .then((data) => setCards(data));
    }, []);

    return (
        <div>
            <NavBar/>
            <List
                items={cards}
                renderItem={(item) => (
                    <Card verticalSpace="m" horizontalSpace="m" className="card-style">
                        <Text weight="bold" lineHeight="l" size="2xl">{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text align="right" view="ghost" size="s">{item.createdAt}</Text>
                    </Card>
                )}
            />
            <Footer/>
        </div>
    );
}

export default MainPage;
