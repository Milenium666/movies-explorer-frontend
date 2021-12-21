import React from 'react';
import './Site.css';

function Site({title, link}) {
    return (
        <section className='site'>
            <div className='site__section'>
                <h8 className='site__title'>
                    {title}
                </h8>
                <a className='site__link' href={link} target='_blank'>
                    &#8599;
                </a>
            </div>
            <div className='site__line'></div>
        </section>

    )
}

export default Site;