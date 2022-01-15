import React from 'react';
import { Link } from 'react-router-dom';

import './Auth.css';

import logo from '../../images/logo.svg'

function Auth ({title, children, email, button, text, auth}) {
    
    return(
        <section className='auth'>
            <div className='auth__content'>
                <Link to='/' className='auth__logo-link'>
                    <img className='auth__logo' alt='иконка сайта' src={logo}/>
                </Link>
                <h1 className='auth__welcome'>{title}</h1>
                <form className='auth__form' type='submit'>
                    {children}
                    <label for='email' className='auth__label'>E-mail</label>
                    <input id='email' type='email' className='auth__input' value={email} required/>
                    <span className='error' id='email-error'></span>

                    <label for='password' className='auth__label'>Пароль</label>
                    <input id='password' type='password' className='auth__input' required />
                    <span className='error' id='password-error'></span>

                    <button className='auth__button'>{button}</button>
                </form>
                <p className='auth__text'>{text} <Link to='/signin' className='auth__link' target='_blank'>{auth}</Link></p>
            </div>
        </section>
    )
}

export default Auth;