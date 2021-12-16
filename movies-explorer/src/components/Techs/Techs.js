import React from 'react';
import './Techs.css';

function Techs() {
    return(
        <section className='techs'>
            <h2 className='techs__title'>
                Технологии
            </h2>
            <div className='techs__line'></div>
            <div className='decription'>
                <h4 className='decription__title'>
                    7 технологий
                </h4>
                <p className='decription__subtitle'>
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
            </div>
            <ul className='stack'>
                <li className='stack__item stack__item_html'>
                    HTML
                </li>
                <li className='stack__item stack__item_css'>
                    CSS
                </li>
                <li className='stack__item stack__item_js'>
                    JS
                </li>
                <li className='stack__item stack__item_react'>
                    React
                </li>
                <li className='stack__item stack__item_git'>
                    Git
                </li>
                <li className='stack__item stack__item_express'>
                    Express.js
                </li>
                <li className='stack__item stack__item_express'>
                    mongoDB
                </li>
            </ul>
        </section>
    )
}

export default Techs;