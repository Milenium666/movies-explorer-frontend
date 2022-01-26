import React from 'react';
import './Login.css';

import Auth from '../Auth/Auth';

function Login() {
    return(
        <>
            <Auth
            title='Рады видеть!'
            // email='pochta@yandex.ru'
            button='Войти'
            text='Ещё не зарегистрированы?'
            link='/signup'
            auth='Регистрация'
            >
            </Auth>
        </>
    )
}

export default Login;