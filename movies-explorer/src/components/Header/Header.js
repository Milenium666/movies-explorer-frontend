import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';



function Header ({ type }) {
    return (
        <header className={`header header_type_${type}`}>
            <nav className={`header__content header__content_type_${type}`}>
                <Link to='/' className='header__logo-link'>
                    <img className='header__logo' alt='Логотип сайта' src={logo}/>
                </Link>
                { type !== 'loggedIn' && <Navigation />}
                { type === 'loggedIn' && <Navigation type={type}/> }
            </nav>
        </header>
    )
};


export default Header;