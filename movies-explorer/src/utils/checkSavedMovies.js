const checkSavedMovies = (movies, savedMovies) => {
    movies.forEach(movie => {
        movie.saved = false;
        savedMovies.forEach(savedMovie => {
            if (savedMovie.movieId === (movie.id || movie.movieId)) {
                movie.saved = true;
            }
        })
    });
    return movies;
}

export default checkSavedMovies;