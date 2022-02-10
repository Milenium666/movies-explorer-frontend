import React from 'react';

function Input ({labelFor, labelName, idInput, inputName, typeInput, onChange, spanText, value, maxLength, minLength, autoComplete, pattern}) {
    return(
        <>
                <label htmlFor={labelFor} className='auth__label'>{labelName}</label>
                <input id={idInput} name={inputName} type={typeInput} className='auth__input' required onChange={onChange} value={value} minLength={minLength} maxLength={maxLength} autoComplete={autoComplete} pattern={pattern}/>
                <span className='error'>{spanText}</span>
        </>
    )
}

export default Input;