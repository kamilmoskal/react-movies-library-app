import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  state = {
    searchData: ""
  }
  searchMovie = (e) => {
    if (e.target.value.length > 0){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=4bba9cc0bb6eb5b67b64c5a5a057e2fc&query=${e.target.value}`)
      .then(resp => resp.json())
      .then(data => {
          this.setState({
              searchData: data
          })
      })
      .catch(error => console.log(error))
    } else {
      this.setState({
        searchData: ''
      })
    }
  }
  resetState = () => {
    this.setState({searchData: ""});
    document.querySelector('.search-bar__input').value = "";
  }
  render() {
    const results = this.state.searchData.results
    return (
      <header>
        <div className="container">
        <Link to ='/'><img className="logo" src="https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png" alt=""/> </Link>
          <div className="search-bar">
            <input className="search-bar__input" type="text" placeholder="search movie" onChange={this.searchMovie}/>
            <ul className="search-bar__list">
              {results && results.slice(0, 6).map(result => {
                return (
                  <Link to={'/movie/' + result.id} key={result.id}  onClick={this.resetState} className="search-bar__list__link">
                  <li className="search-bar__list__item">{result.original_title}&nbsp;&nbsp;
                    <span>{result.release_date.slice(0, 4)}</span></li>
                  </Link>
                )
              })}
            </ul>
          </div>
          
        </div>
      </header>
    )
  }
}

export default Header

