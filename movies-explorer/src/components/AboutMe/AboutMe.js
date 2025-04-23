import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/photo1.png';
import TitleLine from '../TitleLine/TitleLine';

function AboutMe() {
    return (
        <section className='about-me'>
            <TitleLine
                title='Студент'
            />
            <div className='about-me__discription'>
                <div className='student'>
                    <h6 className='student__name'>
                        Елена
                    </h6>
                    <h6 className='student__profession'>
                        Фронтенд-разработчик, 30 лет
                    </h6>
                    <p className='student__descrition'>
                        Я родилась в Саратове, в 2015 году переехала в Москву. У меня есть собака. Я люблю слушать музыку, а ещё увлекаюсь фитнесом. Поняла, что хочу чтобы разработка стала моей профессией.
                    </p>
                    <ul className='link'>
                        <li >
                            <a className='link__item indent-right' href='https://www.facebook.com' target="_blank" rel="noreferrer">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a className='link__item' href='https://github.com/Milenium666' target="_blank" rel="noreferrer">
                                Github
                            </a>
                        </li>
                    </ul>

                </div>
                <img className='about-me__photo' alt='фото студента' src={photo} />
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;