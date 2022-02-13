import React from 'react';
import './Profile.css';

import CurrentUserContext from '../../context/CurrentUserContext';
import FormValidation from '../../utils/FormValidation';


function Profile({onSignOut,  onEditProfile, onUpdateProfile, onBeingEdited}) {
    const currentUser = React.useContext(CurrentUserContext);
    const currentUserName = currentUser.name
    const [userName, setUserName] = React.useState('');
    const [ userEmail, setUserEmail] = React.useState('');


    React.useEffect(() => {
        setUserName(currentUser.name)
        setUserEmail(currentUser.email)
    }, [currentUser])

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateProfile({
            name: userName,
            email: userEmail
        })
        setUserName()
        setUserEmail()
    }

    const handleChangeName = (e) => {
        setUserName(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value)
    }


 
    return(
        <section className='profile'>
            <h1 className='profile__welcome'>Привет, {currentUserName}!</h1>
            <form className='profile__form' type='submit' onSubmit={handleSubmit}>
                <label className='profile__label' htmlFor='name'>
                    Имя
                    <input className='profile__input' placeholder='Имя' value={userName || ''} id='name' required onChange={handleChangeName} type='text' minLength={2} maxLength={30}/>
                </label>
                <label htmlFor='email' className='profile__label profile__label_not-line'>
                    E-mail
                    <input className='profile__input' placeholder='name@email.ru' value={userEmail || ''} id='email' required onChange={handleChangeEmail} type='email'/>
                </label>
                <button className='profile__submit'>Редактировать</button>
            </form>
            <button className='profile__link-signin' onClick={onSignOut}>Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;