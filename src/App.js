import React, { Component } from 'react';
import Home from './components/Home'
import Header from './components/Header'
import MovieDetails from './components/MovieDetails'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/movie/:id' component={MovieDetails} />
            </Switch>   
        </div>
      </Router>
    );
  }
}

export default App;
