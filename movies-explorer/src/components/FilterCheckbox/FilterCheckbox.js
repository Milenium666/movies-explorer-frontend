import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return(
        <div className="checkbox">
            <label className="checkbox__name" htmlFor="checkbox">Короткометражки</label>
            <input type="checkbox" id="checkbox" className="checkbox__image" />
        </div>
    )
}

export default FilterCheckbox;