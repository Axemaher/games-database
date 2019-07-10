import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fbase from '../../js/firebase';
import firebase from 'firebase';
import { UserDataContext } from '../../js/context';

const AuthForm = ({ authOptions, authBtnLabel, loginMethod, registerMethod }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const modalHandler = (visible, error, content) => {
        setInfoModal({
            visible,
            error,
            content
        })
    }

    // checking if uid is in databse
    const uidExist = uid => {
        firebase.database().ref('/users/' + uid)
            .once('value')
            .then(function (result) {
                return result.val() === null ? false : true;
            })
    }

    // 
    const setUserDataHandler = data => {

        const { displayName, email, uid } = data;

        // getting user data from database to app context
        firebase.database().ref('/users/' + uid)
            .once('value')
            .then(function (result) {
                setUserData({
                    logged: true,
                    data: {
                        displayName,
                        email,
                        uid,
                        watchedGamesId: result.val().watchedGamesId
                    }
                });
            })

        // if user is not in database add new user to database
        if (uidExist(uid)) {
            firebase.database().ref('users/' + uid).set({
                displayName,
                email,
                uid,
                watchedGamesId: ['asn', 'ddd']
            });
        }

    }


    // email and password login/register
    const handleSubmit = e => {
        e.preventDefault();
        if (registerMethod) {
            firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
                .then(result => {
                    modalHandler(true, false, "logged in successfully")
                    setAuthModal(false)
                    setUserDataHandler(result.user)
                })
                .catch(error => {
                    modalHandler(true, true, "the email address is already in use by another account")
                });
        }
        if (loginMethod) {
            firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)
                .then(result => {
                    modalHandler(true, false, "logged in successfully")
                    setAuthModal(false)
                    setUserDataHandler(result.user)
                }).catch(error => {
                    modalHandler(true, true, "the password is invalid or the user does not exist")
                });
        }

    }

    // social login
    const socialLogin = social => {
        let provider = null;
        switch (social) {
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case 'github':
                provider = new firebase.auth.GithubAuthProvider();
                break;
        }
        firebase.auth().signInWithRedirect(provider)
            .then(() => {
                return firebase.auth().getRedirectResult();
            }).catch(error => {
                modalHandler(true, true, "authentication error")
            });
    }

    useEffect(() => {
        firebase.auth().getRedirectResult()
            .then(result => {
                setUserDataHandler(result.user)
                modalHandler(true, false, "logged in successfully")
            }).catch(err => {
                if (err.code === 'auth/account-exists-with-different-credential') {
                    modalHandler(true, true, "an account already exists associated with this email address")
                }
            });
    }, [])


    const userDataContext = useContext(UserDataContext)
    const { setAuthModal, setUserData, setInfoModal } = userDataContext;

    return (
        <>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-row">
                    <label className="input-label" htmlFor="email">
                        <FontAwesomeIcon className="input-icon" icon={['fas', 'envelope']} />
                    </label>
                    <input
                        onChange={handleInputChange}
                        value={inputs.email}
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Your email"
                    />
                </div>
                <div className="input-row">
                    <label className="input-label" htmlFor="password">
                        <FontAwesomeIcon className="input-icon" icon={['fas', 'lock']} />
                    </label>
                    <input
                        onChange={handleInputChange}
                        value={inputs.password}
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Your password"
                        minLength="6"
                        required
                    />
                </div>
                <button type="submit" className="auth-btn">
                    <FontAwesomeIcon className="submit-icon" icon={['fas', 'sign-in-alt']} />{authBtnLabel}</button>
            </form>
            <section className="social-auth-section">
                <div className="social-auth-label"><span>or use existing account:</span></div>
                <div className="social-options">
                    <button
                        onClick={() => socialLogin('google')}
                        className="social-option-btn">
                        <FontAwesomeIcon className="social-icon-google" icon={['fab', 'google-plus-g']} />
                    </button>
                    <button
                        onClick={() => socialLogin('facebook')}
                        className="social-option-btn">
                        <FontAwesomeIcon className="social-icon-facebook" icon={['fab', 'facebook-f']} />
                    </button>
                    <button
                        onClick={() => socialLogin('github')}
                        className="social-option-btn">
                        <FontAwesomeIcon className="social-icon-github" icon={['fab', 'github']} />
                    </button>
                </div>
            </section>
            {authOptions &&
                <div className="auth-options">
                    <span className="auth-option">Forgot password?</span>
                </div>
            }
        </>
    );
}

export default AuthForm;