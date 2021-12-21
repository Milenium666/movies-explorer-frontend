import React from 'react';
import './Portfolio.css';
import Site from "../Site/Site";

function Portfolio() {
    return(
        <section className='portfolio'>
            <h6 className='portfolio__title'>
                Портфолио
            </h6>
            <Site title=' Статичный сайт ' link='https://vk.com'/>
            <Site title=' Адаптивный сайт ' link="https://milenium666.github.io/russian-travel/index.html" />
            <Site title= 'Одностраничное приложение' link='http://milenium666.nomoredomains.monster/'/>
        </section>

    )
}

export default Portfolio;