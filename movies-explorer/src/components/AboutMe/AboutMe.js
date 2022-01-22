import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/photo.png';
import TitleLine from '../TitleLine/TitleLine';

function AboutMe() {
    return(
        <section className='about-me'>
           <TitleLine
           title='Студент'
           />
            <div className='about-me__discription'>
                <div className='student'>
                    <h6 className='student__name'>
                        Виталий
                    </h6>
                    <h6 className='student__profession'>
                        Фронтенд-разработчик, 30 лет
                    </h6>
                    <p className='student__descrition'>
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <ul className='link'>
                        <li >
                            <a className='link__item indent-right' href='https://www.facebook.com' target="_blank">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a className='link__item' href='https://github.com' target="_blank">
                                Github
                            </a>
                        </li>
                    </ul>
                    
                </div>
                <img className='about-me__photo' alt='фото студента' src={photo}/>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;