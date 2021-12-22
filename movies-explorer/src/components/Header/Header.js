import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';


function Header() {
    return(
        <header className='header'>
            <Link to='/' className='header__logo-link'>
                <img className='header__logo' alt='Логотип сайта' src={logo}/>
            </Link>
            <div className='header__links'>
                <Link to='/signup' className='header__link-signup'>
                    Регистрация
                </Link>
                <Link to='/signin' className='header__link-signin'>
                    Войти
                </Link>
            </div>
        </header>
    )
}

export default Header;