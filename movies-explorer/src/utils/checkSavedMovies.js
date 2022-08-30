const checkSavedMovies = (movies, savedMovies) => {
    movies.forEach(movie => {
        movie.saved = false;
        savedMovies.forEach( savedMovie => {
            // console.log('CHECKING', movie.id, movie.movieId, savedMovie.movieId);
            if(savedMovie.movieId ===(movie.id || movie.movieId)){
            movie.saved = true;
            }
        })
    });
    return movies
}

export default checkSavedMovies;