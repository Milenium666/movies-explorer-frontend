import React from "react";

import './InfoTooltip.css';
import successfully from '../../images/union.svg'


function InfoTooltip({ isOpen, onClose }) {
    return(
        <div className={isOpen ? 'popup popup_opened' : 'popup'}>
            <div className="popup__container">
                <div className="popup__content">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <img className="popup__successfully" alt="картинка успешного изменения данных пользователя" src={successfully}/>
                    <p className="popup__subtitle">Ваши данные были успешно обновлены!</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;