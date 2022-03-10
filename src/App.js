import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovie] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [loadData, setLoadData] = useState(false);


  const fetchMovie = useCallback(async () => {
    console.log("log-1");

    setIsloading(true);
    setError(null);

    try {
      // const response = await fetch("https://swapi.py4e.com/api/films/");
      const response = await fetch("https://rct-mar-22-sending-http-req-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Error : Something went wrong!!");
      }
      const data = await response.json();
      const loadedMovies = [];

      for(const key in data){
        loadedMovies.unshift({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
        
      }
      console.log('loadedMovies >>', loadedMovies)
      const transformedMovie = loadedMovies.map((movieData) => {
        return {
          id: movieData.id,
          title: movieData.title,
          openingText: movieData.openingText,
          releaseDate: movieData.releaseDate,
        };
      });
      setMovie(transformedMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);



  useEffect(() => {
    fetchMovie();
    console.log("log-2");
  }, [fetchMovie,loadData]);



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


  const addMovieHandler = async (movie) =>{
    const response = await fetch("https://rct-mar-22-sending-http-req-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data =  await response.json();
    console.log('data >>', data)
    setLoadData(true);
  }
  
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
