import React from 'react';

import Auth from '../Auth/Auth';



function Register({onRegister}) {
    const [data, setData] = React.useState({
        email: '',
        password:'',
        name: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, name } = data;

        onRegister({ email, password, name })
    }


    
    return(
        <>
            <Auth
            title='Добро пожаловать!'
            button='Зарегистрироваться'
            text='Уже зарегистрированы?'
            link='/signin'
            auth='Войти'
            onSubmit={handleSubmit}
            onChange={handleChange}
            >
                <label htmlFor='name' className='auth__label'>Имя</label>
                <input id='name' name='name' type='text' className='auth__input' required onChange={handleChange}/>
                <span className='error' id='name-error'></span>

            </Auth>
        </>
    )
}

export default Register;