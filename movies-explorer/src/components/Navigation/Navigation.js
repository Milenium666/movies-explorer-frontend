import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import Nav from '../Nav/Nav';
import MobileMenu from '../MobileMenu/MobileMenu';

import accountLogo from '../../images/account-logo.svg';


function Navigation ({ type }) {
    return(
        <>
        { type !== 'loggedIn' &&
        <li className='navigation__links'>
                <Link to='/signup' className='navigation__link-signup'>
                    Регистрация
                </Link>
                <Link to='/signin' className='navigation__link-signin'>
                    Войти
                </Link>
            </li>
        }

        { type === 'loggedIn' &&
        <>
            <Nav />
            <MobileMenu />
            <Link className={`navigation__button-account navigation__button-account_type_${type}`} to='/profile'>
                <p className='navigation__name'>
                    Аккаунт
                </p>
                <img className='navigation__account-logo' src={accountLogo} alt='иконка входа в аккаунт'/>
            </Link>
        </>
        }

        </>
    )
}

export default Navigation;