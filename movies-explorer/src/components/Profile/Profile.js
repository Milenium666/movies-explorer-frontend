import React from 'react';
import './Profile.css';

import CurrentUserContext from '../../context/CurrentUserContext';
import FormValidation from '../../utils/FormValidation';
import { PATTERN_NAME, PATTERN_EMAIL} from '../../constants';


function Profile({ onSignOut, onEditProfile, onUpdateProfile, onBeingEdited }) {
    const currentUser = React.useContext(CurrentUserContext);
    const currentUserName = currentUser.name
    const { values, setValues, handleChange, errors, isValid } = FormValidation();
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

    const checkStatusSubmit = React.useCallback(() => {
        return !isValid || values.name === currentUser.name && values.email === currentUser.email;

    }, [isValid, values, currentUser]);

    React.useEffect(() => {
        setValues({ 'name': currentUser.name, 'email': currentUser.email });
    }, [setValues, currentUser]);

    React.useEffect(() => {
        setIsSubmitDisabled(checkStatusSubmit());
    }, [checkStatusSubmit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);
        onUpdateProfile(values);
        checkStatusSubmit();
    }



    return (
        <section className='profile'>
            <h1 className='profile__welcome'>Привет, {currentUserName}!</h1>
            <form className='profile__form' type='submit'
                onSubmit={handleSubmit}
            >
                <label className='profile__label' htmlFor='name'>
                    Имя
                    <input className='profile__input' placeholder='Имя' value={values.name || ''} id='name' required
                        onChange={handleChange}
                        type='text'
                        name='name'
                        pattern={PATTERN_NAME}
                    />

                </label>
                <span className='error'>

                    {errors.name || ''}
                </span>
                <label htmlFor='email' className='profile__label profile__label_not-line'>
                    E-mail
                    <input className='profile__input' placeholder='name@email.ru' value={values.email || ''} id='email' required
                        onChange={handleChange}
                        type='email'
                        name='email'
                        pattern={PATTERN_EMAIL}
                    />

                </label>
                <span className='error'>

                    {errors.email || ''}
                </span>
                <button className='profile__submit' disabled={isSubmitDisabled}>Редактировать</button>
            </form>
            <button className='profile__link-signin' onClick={onSignOut}  >Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;