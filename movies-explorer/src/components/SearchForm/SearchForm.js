import React from 'react';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search_icon.svg'

function SearchForm(
    // {filter, setFilter}
) {
    return(
        <>
        <div className='search-form'>
            <form className='search-form__form'>
                <img src={searchIcon} alt='иконка поиска фильма' className='search-form__icon'/>
                <input placeholder='Фильм' className='search-form__field-input-movie' id='fieldInputMovie' required/>
                <button className='search-form__movie-search-button' id='movieSearchButton'>Найти</button>
                
            </form>
                <div className='search-form__form-line'></div>
                <FilterCheckbox 
                    // filter={filter}
                    // setFilter={setFilter}
                />
            </div>
            <div className='line'></div>
        </>
    )
}

export default SearchForm;