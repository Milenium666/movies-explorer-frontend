import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';



function Header ({ type, loggedIn}) {
    console.log(loggedIn)
    const headerModificator = loggedIn ?  'header header_type_loggedIn'  :   'header';
    return (
        <header className={`header header_type_${headerModificator}`}>
            <nav className={`header__content header__content_type_${type}`}>
                <Link to='/' className='header__logo-link'>
                    <img className='header__logo' alt='Логотип сайта' src={logo}/>
                </Link>
                {  !loggedIn && <Navigation />}
                {  loggedIn  && <Navigation type='loggedIn' /> }
            </nav>
        </header>
    )
};


export default Header;