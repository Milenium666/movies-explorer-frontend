import React from 'react';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search_icon.svg'

function SearchForm() {
    return(
        <>
            <form className='search-form'>
                <img src={searchIcon} alt='иконка поиска фильма' className='search-form__icon'/>
                <input placeholder='Фильм' className='search-form__field-input-movie' id='fieldInputMovie'/>
                <button className='search-form__movie-search-button' id='movieSearchButton'>Найти</button>
                <div className='search-form__form-line'></div>
                <FilterCheckbox />
            </form>
            <div className='search-form__line'></div>
        </>
    )
}

export default SearchForm;