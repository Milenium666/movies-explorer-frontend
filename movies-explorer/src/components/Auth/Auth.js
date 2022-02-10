import React from 'react';
import { Link } from 'react-router-dom';

import './Auth.css';

import logo from '../../images/logo.svg'

function Auth ({title, children, button, text, link, auth, onSubmit, classNameButton}) {
    
    return(
        <section className='auth'>
            <div className='auth__content'>
                <Link to='/' className='auth__logo-link'>
                    <img className='auth__logo' alt='иконка сайта' src={logo}/>
                </Link>
                <h1 className='auth__welcome'>{title}</h1>
                <form className='auth__form' type='submit' onSubmit={onSubmit}>
                    {children}

                    <button className={`auth__button ${classNameButton}`}>{button}</button>
                </form>
                <p className='auth__text'>{text} <Link to={link} className='auth__link'>{auth}</Link></p>
            </div>
        </section>
    )
}

export default Auth;