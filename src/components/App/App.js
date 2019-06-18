import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import Home from '../Home/Home';
import Game from "../Game/Game";
import Search from '../Search/Search';

const App = () => {
  return (
    <Router>
      <>
        <header className="header">
          <nav>
            <ul className="nav-group">
              <li className="nav-element">
                <Link to="/" className="home-btn"><h1 className="logo" >GAMES DATABASE</h1></Link>
              </li>
              <li className="nav-element">
                <Link className="search-btn" to="/search">SEARCH <FontAwesomeIcon icon="search" /></Link>
              </li>
            </ul>
          </nav>
          <div className="search">
            <i className="fas fa-search"></i>
          </div>
        </header>

        <Route path="/" exact component={Home} />
        <Route path="/game/:id" component={Game} />
        <Route path="/search" component={Search} />

      </>
    </Router>
  );
}

export default App;