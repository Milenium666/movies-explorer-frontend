import React from 'react';

import Auth from '../Auth/Auth';



function Register() {
    const [name, setName] = React.useState('Виталий');
    
    return(
        <>
            <Auth
            title='Добро пожаловать!'
            email='pochta@yandex.ru'
            button='Зарегистрироваться'
            text='Уже зарегистрированы?'
            link='/signin'
            auth='Войти'
            >
                <label for='name' className='auth__label'>Имя</label>
                <input id='name' type='text' className='auth__input' required value={name}/>
                <span className='error' id='name-error'></span>

            </Auth>
        </>
    )
}

export default Register;