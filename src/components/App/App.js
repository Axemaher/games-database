import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import Home from '../Home/Home';
import Game from "../Game/Game";
import Search from '../Search/Search';
import Authentication from '../Authentication/Authentication'
import { UserDataContext } from '../../js/context';
import User from '../User/User';
import InfoModal from '../InfoModal/InfoModal';

const App = () => {



  // IN CONTEXT
  const [authModal, setAuthModal] = useState(false);
  const [infoModal, setInfoModal] = useState({
    visible: false,
    error: false,
    content: ""
  });

  const initialUserData = {
    logged: false,
    data: {
      displayName: "",
      uid: "",
      watchedId: ""
    }
  }
  const [userData, setUserData] = useState(initialUserData);

  const { Provider } = UserDataContext;
  return (
    <Provider value={{ userData, setUserData, setAuthModal, setInfoModal }}>
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
                  <Link className="nav-btn" to="/search"> <FontAwesomeIcon className="nav-btn-ico" icon="search" /></Link>
                </li>
                <li className="nav-element">
                  {userData.logged ?
                    <Link className="nav-btn" to="/user"> <FontAwesomeIcon icon={['fas', 'user-cog']} /></Link> :
                    <button
                      onClick={() => setAuthModal(true)}
                      className="nav-btn">
                      <FontAwesomeIcon className="nav-btn-ico" icon={['far', 'user']} />
                    </button>}
                </li>
              </ul>
            </nav>
            <div className="search">
              <i className="fas fa-search"></i>
            </div>
            {!userData.logged &&
              <Authentication visibility={authModal} />
            }
            {
              infoModal.visible &&
              <InfoModal
                content={infoModal.content}
                error={infoModal.error}
              />
            }
          </header>

          <Route path="/" exact component={Home} />
          <Route path="/game/:id" component={Game} />
          <Route path="/search" component={Search} />
          <Route path="/user" component={User} />


        </>
      </Router>
    </Provider >
  );
}

export default App;