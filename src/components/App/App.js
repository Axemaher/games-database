import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.scss';
import '../../globalStyles/button.scss';
import Home from '../Home/Home';
import Game from "../Game/Game";
import Search from '../Search/Search';
import Authentication from '../Authentication/Authentication'
import { UserDataContext } from '../../js/context';
import User from '../User/User';
import InfoModal from '../InfoModal/InfoModal';
import firebase from 'firebase';
import axios from 'axios';
import { url, method, headers, apiCheck, getToken } from '../../js/api';


const initialUserData = {
  logged: false,
  data: {
    displayName: "",
    uid: "",
    watchedId: ""
  }
}

const App = () => {


  // IN CONTEXT
  const [authModal, setAuthModal] = useState(false);
  const [infoModal, setInfoModal] = useState({
    visible: false,
    error: false,
    content: ""
  });


  const [userData, setUserData] = useState(initialUserData);

  const { Provider } = UserDataContext;

  // checking logged user
  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        const { displayName, email, uid } = user;
        firebase.database().ref('/users/' + user.uid)
          .once('value')
          .then(result => {
            if (result.val() !== null) {
              const { watchedGamesId } = result.val();
              setUserData({
                logged: true,
                data: {
                  displayName,
                  email,
                  uid,
                  watchedGamesId
                }
              });
            }
          })
      }
    });

    axios({
      url, method, headers, data: apiCheck
    })
      .catch(err => {
        if (err.response.status === 403) {
          axios.post(getToken)
            .then(res => {
              localStorage.setItem('access_token', res.data.access_token)
            }).catch(err => console.log(err))
        }
      });

  }, [])



  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        userData.logged ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
      }
    />
  );

  return (
    <Provider value={{ userData, setUserData, setAuthModal, setInfoModal }}>
      <Router>
        <>
          <p className={'api-info'}>API V4 introduced restrictive request rate limits. If the page does not load, please try again later.</p>
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
          <PrivateRoute path="/user" component={User} />

        </>
      </Router>
    </Provider >
  );
}

export default App;