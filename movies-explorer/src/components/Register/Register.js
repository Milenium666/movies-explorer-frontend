import React from 'react';

import Auth from '../Auth/Auth';
import Input from '../Input/Input';
import FormValidation from '../../utils/FormValidation';



function Register({onRegister}) {
    const { values, handleChange, errors, isValid } = FormValidation();
  const isDisabled = values.email === '' || values.password === '' || !isValid || values.name === '';
  const registerButton = !isDisabled ? '' : ' button-disabled';

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values.email, values.password, values.name)
        !isDisabled && onRegister(values);

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
            classNameButton={registerButton}
            >
            <Input 
            labelFor='name' 
            labelName='Имя' 
            idInput='name' 
            inputName='name'
            typeInput='text'
            onChange={handleChange}
            autoComplete='name'
            value={values.name || ''}
            spanText={errors.name}
            minLength={2}
            maxLength={30}
            pattern="^[a-zA-Zа-яА-ЯёЁ\-\s]+$"
            />

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

export default Register;