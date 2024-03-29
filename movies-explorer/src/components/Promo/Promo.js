import React from 'react';

import './Promo.css';
import promo from '../../images/promo.svg';

function Promo() {
    return (
        <section className='promo'>
            <div className='promo__text-container'>
                <h1 className='promo__title'>
                    Учебный проект студента факультета Веб-разработки.
                </h1>
                <p className='promo__subtitle'>
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
                <a href='#about-project' className='promo__link'>
                    Узнать больше
                </a>
            </div>
            <img className='promo__img' alt='Промо логотип' src={promo} />
        </section>
    )
}

export default Promo;