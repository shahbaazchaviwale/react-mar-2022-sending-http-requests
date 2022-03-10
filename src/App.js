import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovie] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");

      if (!response.ok) {
        throw new Error("Error : Something went wrong!!", );
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  };

  let content = <p>Found no movie</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <h3>{error}</h3>;
  }
  if (isloading) {
    content = <h3>Loading...</h3>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
