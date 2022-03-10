import React, {useState} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([])

   const fetchMovie = () => {
     fetch('https://swapi.py4e.com/api/films/').then(res => {
       return res.json();
     }).then(data => {
      const transformedMovie = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovie(transformedMovie)
     })
   }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {movies.length == 0 && <MoviesList movies={movies} /> }
      </section>
    </React.Fragment>
  );
}

export default App;
