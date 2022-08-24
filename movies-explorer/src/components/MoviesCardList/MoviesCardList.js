import React from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';



function MoviesCardList({items, filter, width, onLikeClick, onDeleteClick}) {

    const [index, setIndex] = React.useState(7);

    const fullScreen = width > 768;
    const mediumScreen = width <= 768 && width >= 480;
    const smallScreen = width < 480;


    React.useEffect(() => {
        if (fullScreen) {
          setIndex(7);
        }
        if (mediumScreen) {
          setIndex(7);
        }
        if (smallScreen) {
          setIndex(5);
        }
      }, [width]);

    


    const movieFilter = items.filter((item) => item.duration <= 40);
    const cardsToRender = filter ? movieFilter.slice(0, index) : items.slice(0, index);

    
    const uploadingCards = () => {
        if (smallScreen) {
            setIndex(index + 5)
        } else {
            setIndex(index + 7)
        }
    }

    const isDisabled = () => {
        return index > cardsToRender.length
    }
    

return(
    <>
        <ul className='cards'>
            {
            cardsToRender.map
            ((item) => (
                
                <MoviesCard 
                    key={item.id || item._id}
                    item={item}
                    onLikeClick={onLikeClick}
                    onDeleteClick={onDeleteClick}
                    saved={item.saved}
                />
            ))}

        </ul>
        <div className='movies__container'>
                <button className={`movies__button 
                    ${index > cardsToRender.length ? 'movies__button_hidden' : ''}
                    `}
                    type='button'
                    onClick={uploadingCards}
                    disabled={isDisabled()}
                 >Еще</button>
        </div>
    </>

    )
}

export default MoviesCardList;