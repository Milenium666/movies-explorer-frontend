const getSavedMovieCard = (arr, movie) => {
    return arr.find((item) => {
        return item.movieId === (movie.id || movie.movieId);
      });
}

export default getSavedMovieCard;