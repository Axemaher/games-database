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

    const handleSubmit = e => {
        e.preventDefault();
        console.log(registerMethod)
        if (registerMethod) {
            firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
                .then(result => {
                    setAuthModal(false)
                    const { displayName, email, uid } = result.user;
                    const userData = {
                        logged: true,
                        data: {
                            displayName,
                            email,
                            uid,
                        }
                    };
                    setUserData(userData);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        if (loginMethod) {
            firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)
                .then(result => {
                    setAuthModal(false)
                    const { displayName, email, uid } = result.user;
                    const userData = {
                        logged: true,
                        data: {
                            displayName,
                            email,
                            uid,
                        }
                    };
                    setUserData(userData);
                }).catch(error => {
                    console.log(error)
                });
        }

    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const userDataContext = useContext(UserDataContext)
    const { setAuthModal, setUserData } = userDataContext;
    const logged = userDataContext.userData.data.logged;


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
                console.log(error)
            });
    }

    firebase.auth().getRedirectResult()
        .then(result => {
            const { displayName, email, uid } = result.user;
            const userData = {
                logged: true,
                data: {
                    displayName,
                    email,
                    uid,
                }
            };
            console.log(userData)
            setUserData(userData);
        }).catch(error => {
            console.log(error)
        });


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