import React from 'react';

import './Promo.css';
import promo from '../../images/promo.svg';
import { Link } from 'react-router-dom';

function Promo() {
    return(
        <section className='promo'>
            <div className='promo__text-container'>
                <h1 className='promo__title'>
                    Учебный проект студента факультета Веб-разработки.
                </h1>
                <p className='promo__subtitle'>
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
                <Link to='#about-project' className='promo__link'>
                    Узнать больше
                </Link>
            </div>
            <img className='promo__img' alt='Промо логотип' src={promo}/>
        </section>
    )
}

export default Promo;