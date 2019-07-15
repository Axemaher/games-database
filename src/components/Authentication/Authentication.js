import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserDataContext } from '../../js/context';
import './Authentication.scss';
import AuthForm from './AuthForm';

const Authentication = ({ visibility }) => {
    const [authMetod, setAuthMetod] = useState('login');

    const userDataContext = useContext(UserDataContext)
    const { logged } = userDataContext.userData;
    const { setAuthModal } = userDataContext;


    return (
        <div className="main main-auth" style={{ visibility: `${visibility ? 'visible' : 'hidden'}` }}>
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
                                login={true}
                                authOptions={true}
                            /> :
                            <AuthForm
                                authBtnLabel={'REGISTER'}
                                register={true}
                                authOptions={false}
                            />
                        }
                        <FontAwesomeIcon onClick={() => setAuthModal(false)} className="close-ico" icon="times" />
                    </div>}
            </section>
        </div >
    );
}

export default Authentication;