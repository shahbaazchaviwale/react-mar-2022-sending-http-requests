import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  const dateFormat = new Date(props.releaseDate);
  const fullDate = `${dateFormat.getDate()}-${month[dateFormat.getMonth()]}-${dateFormat.getFullYear()}`;

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{fullDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
