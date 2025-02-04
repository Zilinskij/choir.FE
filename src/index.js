import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, App2 } from './App.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginForm from './components/Auth/LoginForm.js';
import { Dashboard } from './components/Auth/Dashboard.js';
import PrivateRoute from './PrivateRoute.js';
import { AuthProvider } from './components/Auth/AuthContext.js';
import RegisterForm from './components/Auth/RegisterForm.js';
import { PeopleList } from './PeopleBtn.js';
import { Chat } from './components/Auth/Chat.js';

const Root = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/people' element={<PeopleList apiUrl={process.env.REACT_APP_API_URL}/>} />
            <Route path='/dashboard' element={
                <PrivateRoute>
                    <Dashboard customComponent={<App2 />} />
                </PrivateRoute>} />
            <Route path='/open-chat' element={
                <PrivateRoute>
                    <Chat currentUser={'user'} />
                </PrivateRoute>
            } />
        </Routes>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <AuthProvider>
            <Root />
        </AuthProvider>
    </BrowserRouter>
);