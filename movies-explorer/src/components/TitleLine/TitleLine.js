import React from "react";
import './TitleLine.css';

function TitleLine({ title }) {
    return (
        <div className="title-line">
            <h2 className='title-line__title'>
                {title}
            </h2>
            <div className='title-line__line'></div>
        </div>
    )
}
export default TitleLine;


