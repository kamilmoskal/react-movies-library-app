import React, { Component } from 'react'
import Movie from './Movie'
import { Link } from 'react-router-dom'

class Home extends Component {
    state = {
        movies: []
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=4bba9cc0bb6eb5b67b64c5a5a057e2fc')
        .then(resp => resp.json())
        .then(data => {
          this.setState({
              movies: data.results
          })
        })
        .catch(error => {
          console.log(error)
        })
      }
  render() {
      const { movies } = this.state
    return (
        <main>
            
        {movies && movies[0] ? <div className="bg" style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}')`}}></div> : null}

            <div className="container">
                <h1>Trending movies right now</h1>
                <div className="movies">
                        {movies && movies.map(movie => {
                            return (
                            <Link to={'/movie/' + movie.id} key={movie.id}  query={{ the: 'query' }} className="movies__item__link">
                                <Movie movie={movie}/>
                            </Link>
                            )
                        })}
                </div>
            </div>
        </main>
    )
  }
}

export default Home