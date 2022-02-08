import React from 'react';
import './Login.css';

import Auth from '../Auth/Auth';

function Login({onLogin}) {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!data.email || !data.password) {
            return
        }
        const {email, password} = data
        console.log('вход в onLogin', email, password)
        onLogin({email, password})
        
    }
    return(
        <>
            <Auth
            title='Рады видеть!'
            button='Войти'
            text='Ещё не зарегистрированы?'
            link='/signup'
            auth='Регистрация'
            onSubmit={handleSubmit}
            onChange={handleChange}
            >
            </Auth>
        </>
    )
}

export default Login;