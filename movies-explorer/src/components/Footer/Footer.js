import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <h6 className='footer__title'>
                Учебный проект Яндекс.Практикум х BeatFilm.
            </h6>
            <div className='footer__line'></div>
            <div className='footer__list'>
                <p className='footer__copyright'>&#169; 2022 - 2025</p>
                <ul className='links'>
                    <li className='links__item'>
                        <a className='links__text' href='https://practicum.yandex.ru' target="_blank" rel="noreferrer">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className='links__item'>
                        <a className='links__text' href='https://github.com' target="_blank" rel="noreferrer">
                            Github
                        </a>
                    </li>
                    <li className='links__item'>
                        <a className='links__text' href='https://www.facebook.com' target="_blank" rel="noreferrer">
                            Facebook
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;