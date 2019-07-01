import React, { useState, useContext } from 'react';
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
        e.preventDefault()
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const userDataContext = useContext(UserDataContext)
    const { setUserData, userData } = userDataContext;

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
        }).catch(function (error) {
            console.log(error);
        });
    }



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
                <button type="button" className="auth-btn">
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