import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserDataContext } from '../../js/context';
import './Authentication.scss';
import AuthForm from './AuthForm';

const Authentication = () => {
    const [authMetod, setAuthMetod] = useState('login');

    const userDataContext = useContext(UserDataContext)
    const logged = userDataContext.userData.logged;

    return (
        <main className="main main-auth" >
            <section className="auth">
                {!logged &&
                    <div className="auth-container">
                        <header className="auth-header">
                            <button
                                onClick={() => setAuthMetod('login')}
                                className={`header-btn ${authMetod === 'login' && ' header-btn--active'}`}>
                                <FontAwesomeIcon
                                    className="header-btn-icon" icon={['far', 'user']} />
                                Login
                        </button>
                            <button
                                onClick={() => setAuthMetod('register')}
                                className={`header-btn ${authMetod === 'register' && ' header-btn--active'}`}>
                                <FontAwesomeIcon
                                    className="header-btn-icon" icon={['fas', 'user-plus']} />
                                Register
                        </button>
                        </header>
                        {authMetod === 'login' ?
                            <AuthForm
                                authBtnLabel={'LOG IN'}
                                loginMethod={true}
                                authOptions={true}
                            /> :
                            <AuthForm
                                authBtnLabel={'REGISTER'}
                                registerMethod={true}
                                authOptions={false}
                            />
                        }
                    </div>}




                {/* {logged ?
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
                } */}
            </section>
        </main >
    );
}

export default Authentication;