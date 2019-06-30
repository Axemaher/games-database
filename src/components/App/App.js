import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import Home from '../Home/Home';
import Game from "../Game/Game";
import Search from '../Search/Search';
import Login from '../Login/Login'
import { UserDataContext } from '../../js/context';

const App = () => {

  const initialUserData = {
    logged: false,
    data: {
      displayName: "War",
      uid: "sdhfiushdfiu34u5h34",
      watchedId: "122"
    }
  }
  const [userData, setUserData] = useState(initialUserData);


  const { Provider } = UserDataContext;
  return (
    <Provider value={{ userData: userData, setUserData: setUserData }}>
      <Router>
        <>
          <header className="header">
            <nav className="nav">
              <ul className="nav-group">
                <li className="nav-element">
                  <Link to="/" className="home-btn"><h1 className="logo" >GAMES DATABASE</h1></Link>
                </li>
              </ul>
              <ul className="nav-group">
                <li className="nav-element">
                  <Link className="nav-btn" to="/search"> <FontAwesomeIcon icon="search" /></Link>
                </li>
                <li className="nav-element">
                  <Link className="nav-btn" to="/login"> <FontAwesomeIcon icon={['far', 'user']} /></Link>
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
          <Route path="/login" component={Login} />


        </>
      </Router>
    </Provider >
  );
}

export default App;