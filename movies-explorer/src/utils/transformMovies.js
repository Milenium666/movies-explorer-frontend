const transformMovies = (movies,
  //  savedMovies
  ) => {
    movies.forEach(movie => {
        if (!movie.image) {
          movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
          movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
        } else {
          movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
          movie.image = `https://api.nomoreparties.co${movie.image.url}`
        }
        if(!movie.country) {
          movie.country = 'Russia';
        }
        if(!movie.nameEN) {
          movie.nameEN = movie.nameRU;
        } 
        // movie.saved = false;
        // savedMovies.forEach( savedMovie => {
        //   // console.log('CHECKING', movie.id, movie.movieId, savedMovie.movieId);
        //   if(savedMovie.movieId ===(movie.id || movie.movieId)){
        //     movie.saved = true;
        //   }
        // })
      });
      return movies
}

export default transformMovies;