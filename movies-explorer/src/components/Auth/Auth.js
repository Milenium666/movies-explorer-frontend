import React from 'react';
import { Link } from 'react-router-dom';

import './Auth.css';

import logo from '../../images/logo.svg'

function Auth ({title, children, email, button, text, link, auth, onSubmit, onChange}) {
    
    return(
        <section className='auth'>
            <div className='auth__content'>
                <Link to='/' className='auth__logo-link'>
                    <img className='auth__logo' alt='иконка сайта' src={logo}/>
                </Link>
                <h1 className='auth__welcome'>{title}</h1>
                <form className='auth__form' type='submit' onSubmit={onSubmit}>
                    {children}
                    <label htmlFor='email' className='auth__label'>E-mail</label>
                    <input id='email' type='email' name='email' className='auth__input' value={email} required onChange={onChange} autoComplete="email"/>
                    <span className='error' id='email-error'></span>

                    <label htmlFor='password' className='auth__label'>Пароль</label>
                    <input id='password' type='password' name='password' className='auth__input' required onChange={onChange} autoComplete="current-password"/>
                    <span className='error' id='password-error'></span>

                    <button className='auth__button'>{button}</button>
                </form>
                <p className='auth__text'>{text} <Link to={link} className='auth__link'>{auth}</Link></p>
            </div>
        </section>
    )
}

export default Auth;