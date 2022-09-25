import React from "react";

import './InfoTooltip.css';

import successfully from '../../images/union.svg'
import fasle from '../../images/false.svg';


function InfoTooltip({ onClose, status: { isOpen, successful, text } }) {
    return (
        <div className={isOpen ? 'popup popup_opened' : 'popup'}>
            <div className="popup__container">
                <div className="popup__content">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <img className="popup__successfully" alt="" src={successful ? successfully : fasle} />
                    <p className="popup__subtitle">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;