import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

import CurrentUserContext from '../../context/CurrentUserContext';

function Profile({onSignOut, loggedIn}) {
    const currentUser = React.useContext(CurrentUserContext);
    const userName = currentUser.name;
    const userEmail = currentUser.email;

 
    return(
        <section className='profile'>
            <h1 className='profile__welcome'>Привет, {userName}!</h1>
            <form className='profile__form' type='submit'>
                <label className='profile__label' htmlFor='name'>
                    Имя
                    <input className='profile__input' placeholder='Имя' value={userName || ''} id='name'/>
                </label>
                <label htmlFor='email' className='profile__label profile__label_not-line'>
                    E-mail
                    <input className='profile__input' placeholder='E-mail' value={userEmail || ''} id='email'/>
                </label>
                <button className='profile__submit'>Редактировать</button>
            </form>
            <Link to='/' className='profile__link-signin' onClick={onSignOut}>Выйти из аккаунта</Link>
        </section>
    )
}

export default Profile;