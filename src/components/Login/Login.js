import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../../js/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fbase from '../../js/firebase';
import firebase from 'firebase';
import './Login.scss';

const Login = () => {


    const socialLogin = social => {
        let provider = null;
        switch (social) {
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
        }
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(result.user)
            const { displayName, email, uid } = result.user;
            setUserData({
                logged: true,
                data: {
                    displayName,
                    email,
                    uid,
                }
            })
        }).catch(function (error) {
            console.log(error)
        });
    }

    const userDataContext = useContext(UserDataContext)
    const logged = userDataContext.userData.logged;
    const { setUserData, userData } = userDataContext;
    return (
        <main className="main main-login" >
            <section className="login">
                {logged ?
                    userData.data.displayName :
                    <div className="social-login">
                        <button onClick={() => socialLogin('facebook')} className="social-button social-button--facebook">
                            <FontAwesomeIcon className="social-icon--facebook" icon={['fab', 'facebook-f']} />
                            <span className="social-text">
                                Sign in with facebook
                        </span>
                        </button>
                        <button onClick={() => socialLogin('google')} className="social-button social-button--google">
                            <FontAwesomeIcon className="social-icon--google" icon={['fab', 'google-plus-g']} />
                            <span className="social-text">
                                Sign in with google
                        </span>
                        </button>
                    </div>
                }
            </section>
        </main >
    );
}

export default Login;