import React from 'react';
import './Login.css';

import Auth from '../Auth/Auth';
import Input from '../Input/Input';
import FormValidation from '../../utils/FormValidation';

function Login({onLogin}) {
    const { values, handleChange, errors, isValid } = FormValidation();
  const isDisabled = values.email === '' || values.password === '' || !isValid || values.name === '';
  const loginButton = !isDisabled ? '' : ' button-disabled';

    const handleSubmit = (e) => {
        e.preventDefault();
        !isDisabled && onLogin(values);
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
            classNameButton={loginButton}
            >
              <Input 
            labelFor='email' 
            labelName='Email' 
            idInput='email' 
            inputName='email'
            typeInput='email'
            onChange={handleChange}
            autoComplete='email'
            value={values.email || ''}
            spanText={errors.email}
            />

            <Input 
            labelFor='password' 
            labelName='Пароль' 
            idInput='password' 
            inputName='password'
            typeInput='password'
            onChange={handleChange}
            autoComplete='current-password'
            value={values.password || ''}
            spanText={errors.password}
            minLength={8}
            />
            </Auth>
        </>
    )
}

export default Login;