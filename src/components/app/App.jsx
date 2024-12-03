import React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/MainPage';
import ServicesPage from '../../pages/services-page/ServicesPage';
import ServicePage from '../../pages/service-page/ServicePage';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import NotFound from '../../pages/not_found/not_found.jsx';
import LoginPage from '../../pages/login-page/LoginPage';
import AuthRoute from '../../components/app/AuthRoute';
import MainLayout from '../../layouts/Main';

import { store } from './store'
import { Provider } from 'react-redux'



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element= { <MainLayout/> }>
              <Route index element= { <MainPage/> } />
              <Route path='/services' element = { <AuthRoute> <ServicesPage/> </AuthRoute> } />
              <Route path='/login' element = { <LoginPage/> } />
              <Route path='/services/:id' element = { <AuthRoute> <ServicePage/> </AuthRoute> } />
              <Route path='/profile' element = { <AuthRoute> <ProfilePage/> </AuthRoute>  } />
              <Route path='*' element={ <NotFound/> } />
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
