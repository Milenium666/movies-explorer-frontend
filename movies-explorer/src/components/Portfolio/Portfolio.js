import React from 'react';
import './Portfolio.css';


function Portfolio() {
    return (
        <section className='portfolio'>
            <h6 className='portfolio__title'>
                Портфолио
            </h6>
            <ul className='list-site'>
                <li className='list-site__title'>
                    Статичный сайт
                    <a className='list-site__link' href='https://milenium666.github.io/how-to-learn/index.html' target='_blank' rel="noreferrer">&#8599;</a>
                </li>
                <li className='list-site__title'>
                    Адаптивный сайт
                    <a className='list-site__link' href='https://milenium666.github.io/russian-travel/index.html' target='_blank' rel="noreferrer">&#8599;</a>
                </li>
                <li className='list-site__title list-site__title_not-line'>
                    Одностраничное приложение
                    <a className='list-site__link' href='http://milenium666.nomoredomains.monster' target='_blank' rel="noreferrer">&#8599;</a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;