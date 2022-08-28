import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search_icon.svg'

import FormValidation from '../../utils/FormValidation';
import CurrentUserContext from '../../context/CurrentUserContext';


function SearchForm({filter, setFilter, handleSearchSubmit, searchSavedMovies
    // searchTag
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, isValid, setIsValid } = FormValidation();
 
    const location = useLocation();

    const [errorQuery, setErrorQuery] = React.useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);


    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname === '/movies') {
            isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
        } else {
            isValid ? searchSavedMovies(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
        }

        
        // setIsSubmitDisabled(true);
    };

    React.useEffect(() => {
        setErrorQuery('')
    }, [isValid]);

    React.useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - searchResult`)) {
            const searchValue = localStorage.getItem(`${currentUser.email} - searchResult`);
            values.search = searchValue;
            setIsValid(true);
        }
    }, [currentUser]);

    return(
        <>
        <section className='search-form'>
            <form className='search-form__form' name='search' noValidate 
                                    onSubmit={handleSubmit}
                                    >
                <img src={searchIcon} alt='иконка поиска фильма' className='search-form__icon'/>
                <input 
                    placeholder='Фильм' 
                    className='search-form__field-input-movie' 
                    id='search'
                    name='search'
                    required
                    type='text'
                    autoComplete='off'
                    value={values.search  || ''}
                    onChange={handleChange}

                />
                <span className='search-form__error'>
                    {errorQuery}
                </span>
                <button 
                    className='search-form__movie-search-button' 
                    id='movieSearchButton'
                    // disabled={isSubmitDisabled}
                    type='submit'
                >Найти
                </button>
                
            </form>
                <div className='search-form__form-line'></div>
                <FilterCheckbox 
                    filter={filter}
                    setFilter={setFilter}
                />
            </section>
            <div className='line'></div>
        </>
    )
}

export default SearchForm;