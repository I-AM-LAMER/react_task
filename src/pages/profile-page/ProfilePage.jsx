import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import NavBar from "../../layouts/navigationBar";

import './ProfilePage.css';

const ProfilePage = () => {
    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchprofile = async () => {
            setError(null);

            try {
                const response = await fetch('https://dummyjson.com/auth/me', {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Pass JWT via Authorization header
                  }, 
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const profile = await response.json();
                setProfile(profile);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchprofile();

    }, [id]);

    if (error) {
        return (
            <Text view="alert" size="xl" weight="bold" color="alert">
                Ошибка загрузки: {error}
            </Text>
        );
    }

    return (
        <div>
            <div className="profile-detail-container">
                <div className="profile-detail-card">
                    <Card className="card-style">
                        {profile ? (
                            <div>
                                {profile.image && (
                                    <img
                                        src={profile.image}
                                        alt={profile.username}
                                        className="profile-image"
                                    />
                                )}
                                <Text size="l" weight="bold" className="profile-name">
                                    {profile.firstName}
                                    {'  '}
                                    {profile.lastName}
                                    {'  '}
                                    {profile.email}
                                    {'  '}
                                    {profile.gender}
                                </Text>
                                <Button label="Назад" onClick={() => window.history.back()} className="back-button" />
                            </div>
                        ) : (
                            <Text size="xl" color="alert" weight="bold" className="no-data-message">
                                Данные не найдены
                            </Text>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
