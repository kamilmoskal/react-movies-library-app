import React, { Component } from 'react'

class MovieDetails extends Component {
    state = {
        dataMovieDetails: '', dataCastDetails: ''
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
           this.componentDidMount()
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4bba9cc0bb6eb5b67b64c5a5a057e2fc&append_to_response=videos`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                dataMovieDetails: data
            })
        })
        .catch(error => console.log(error))

        fetch(`https://api.themoviedb.org/3/movie/${id}/casts?api_key=4bba9cc0bb6eb5b67b64c5a5a057e2fc`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                dataCastDetails: data
            })
        })
        .catch(error => console.log(error))
    }
    render() {
        const movie = this.state.dataMovieDetails
        const cast = this.state.dataCastDetails.cast
        const crew = this.state.dataCastDetails.crew
        return (
            <main>
                <div className="bg" style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`}}></div>

                <div className="container">

                    <div className="movie-details">
                        <div className="movie-details__poster"><img className="movie-details__poster__img" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title}/>
                        </div>
                        <div className="movie-details__details">
                            
                            <h1>{movie.original_title}</h1><h2>({movie.release_date && movie.release_date.slice(0, 4)})</h2>
                            <h2>{movie.runtime} min.</h2>
                            <p>{movie.overview}</p>
                    
                            <ul>
                                <li><p>Genres:</p> 
                                {movie.genres && movie.genres.map(genre => {
                                    return <strong key={genre.id}>{genre.name},</strong>
                                })}
                                </li>
                                <li><p>Premiere:</p><strong>{movie.release_date}</strong></li>
                                <li><p>Production:</p> 
                                {movie.production_countries && movie.production_countries.map(country => {
                                    return <strong key={Math.random()*10}>{country.iso_3166_1},</strong>
                                })}
                                </li>
                                <li><p>Rating:</p><strong>{movie.vote_average}/10</strong></li>
                                {/* <li><strong>Budget:&nbsp;</strong><p>${movie.budget}</p></li> */}
                            </ul>
                        </div>
                    </div>

                    <div className="movie-videos">
                        <h1 className="movie-videos__title">Trailers</h1>
                        {movie.videos && movie.videos.results.slice(0, 2).map(video => {
                            return (
                                <iframe className="movie-videos__frame"  style={{border: "none"}}
                                src={'https://www.youtube.com/embed/'+ video.key} key={video.id}
                                allowFullScreen="allowfullscreen"
                                mozallowfullscreen="mozallowfullscreen" 
                                msallowfullscreen="msallowfullscreen" 
                                oallowfullscreen="oallowfullscreen" 
                                webkitallowfullscreen="webkitallowfullscreen"
                                sandbox="allow-scripts allow-same-origin allow-presentation"
                                frameBorder="0">
                                </iframe>  
                            )
                        })}
                    </div>  

                    <div className="movie-cast">
                        <h1 className="movie-cast__title">Cast</h1>
                        {cast && cast.slice(0, 6).map(cast => {
                            return (
                                <div className="movie-cast__item" key={cast.id}>
                                    <img className="movie-cast__img" src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`} alt={cast.name}/>
                                    <p className="movie-cast__name"><strong>{cast.name}</strong></p>
                                    <p className="movie-cast__character"><span style={{color:"grey"}}>as:</span>&nbsp;{cast.character}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="movie-crew">
                        <h1 className="movie-crew__title">Crew</h1>
                        {crew && crew.slice(0, 6).map(crew => {
                            return (
                                <div className="movie-crew__item" key={Math.random()*10}>
                                    {crew.profile_path !== null ? <img className="movie-crew__img" src={`https://image.tmdb.org/t/p/w300/${crew.profile_path}`} alt={crew.name}/> : <img className="movie-crew__img" src="https://via.placeholder.com/300x450" alt={crew.name}/>}
                                    
                                    <p className="movie-crew__name"><strong>{crew.name}</strong></p>
                                    <p className="movie-crew__job">{crew.job}</p>
                                </div>
                                

                            )
                        })}
                    </div>
                    
                </div>
            </main>
        )
    }
}

export default MovieDetails