import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import Home from '../Home/Home';
import Game from "../Game/Game";

const App = () => {
  return (
    <Router>
      <>
        <header className="header">
          <nav>
            <ul className="nav-group">
              <li className="nav-element">
                <Link to="/" className="home-btn">GAMES DATABASE</Link>
              </li>
              <li className="nav-element">
                <p className="search-btn">SEARCH <FontAwesomeIcon icon="search" /></p>
              </li>
            </ul>
          </nav>
          <div className="search">
            <i className="fas fa-search"></i>
          </div>
        </header>

        <Route path="/" exact component={Home} />
        <Route path="/game/:id" component={Game} />

      </>
    </Router>
  );
}

export default App;