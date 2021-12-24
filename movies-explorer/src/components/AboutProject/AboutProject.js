import React from 'react';
import './AboutProject.css';
import TitleLine from '../TitleLine/TitleLine';

function AboutProject() {
    return(
        <section className='about-project' id='about-project'>
            <TitleLine
            title='О проекте'
            />
            <div className='about-project__description-project'>
                <div className='diplom'>
                    <h2 className='diplom__title'>
                        Дипломный проект включал 5 этапов
                    </h2>
                    <p className='diplom__subtitle'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className='diplom indent'>
                    <h2 className='diplom__title'>
                        На выполнение диплома ушло 5 недель
                    </h2>
                    <p className='diplom__subtitle'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div >
            <div className='progress-bar'>
                <div className='progress-bar__week'>
                    <p className='progress-bar__subtitle'>
                        1 неделя
                    </p>
                    <h3 className='progress-bar__title'>
                        Back-end
                    </h3>
                </div>
                <div className='progress-bar__specialization'>
                   
                    <p className='progress-bar__subtitle progress-bar__subtitle_front'>
                        4 недели
                    </p>
                    <h3 className='progress-bar__title progress-bar__title_indent'>
                        Front-end
                    </h3>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;