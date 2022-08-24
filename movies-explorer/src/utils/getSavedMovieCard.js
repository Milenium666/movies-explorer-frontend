const getSavedMovieCard = (arr, movie) => {
    return arr.find((item) => {
      // console.log(item.movieId, 'movieId')
      // console.log(item.movieId === (movie.id || movie.movieId), 'сравнение')
      // console.log(movie.id || movie.movieId, 'значения')
        return   (movie.id || movie.movieId) === item.movieId ;
      });
}

export default getSavedMovieCard;