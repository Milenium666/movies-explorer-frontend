import React from "react";
import './TitleLine.css';

function TitleLine ({title}) {
    return(
        <div>
            <h2 className='title-line__title'>
                {title}
            </h2>
            <div className='title-line__line'></div>
        </div>
    )
}
export default TitleLine;


