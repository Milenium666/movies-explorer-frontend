import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [userName, setUserName] = React.useState('Виталий');
    const [email, setEmail] = React.useState('pochta@yandex.ru');
    return(
        <section className='profile'>
            <h1 className='profile__welcome'>Привет, Виталий!</h1>
            <form className='profile__form' type='submit'>
                <label className='profile__label' for='name'>
                    Имя
                    <input className='profile__input' placeholder='Имя' value={userName} id='name'/>
                </label>
                <label for='email' className='profile__label profile__label_not-line'>
                    E-mail
                    <input className='profile__input' placeholder='E-mail' value={email} id='email'/>
                </label>
                <button className='profile__submit'>Редактировать</button>
            </form>
            <Link to='/signin' className='profile__link-signin'>Выйти из аккаунта</Link>
        </section>
    )
}

export default Profile;