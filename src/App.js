import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const fetchMovie = async () => {
    setIsloading(true);
    const response = await fetch("https://swapi.py4e.com/api/films/");
    const data = await response.json();
    const transformedMovie = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovie(transformedMovie);
    setIsloading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length == 0 && <h3>No movie found</h3>}
        {isloading && <h3>Loading...</h3>}
      </section>
    </React.Fragment>
  );
}

export default App;
