import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as farStar, faPlayCircle, faUser } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons'
import {
    faSearch,
    faStar,
    faInfo,
    faList,
    faVideo,
    faDesktop,
    faPencilRuler,
    faTimes,
    faNewspaper,

} from '@fortawesome/free-solid-svg-icons'

library.add(
    faSearch,
    faStar,
    farStar,
    faPlayCircle,
    faInfo,
    faList,
    faVideo,
    faDesktop,
    faPencilRuler,
    faTimes,
    faNewspaper,
    faUser,
    faFacebookF,
    faGooglePlusG
)


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
