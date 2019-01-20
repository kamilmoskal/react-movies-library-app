import React from 'react'

const Movie = (props) => {
    const movie = props.movie
  return (
    <React.Fragment>
        <img className="movies__item__img" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title}/>
        <div className="movies__item__hover">
            <h2>{movie.title || movie.original_name}</h2>
            <p>{movie.release_date}</p>
        </div>
    </React.Fragment>
  )
}

export default Movie
