import React, { useState, useContext, useEffect } from 'react';
import { UserDataContext } from '../../js/context';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './User.scss';
import axios from 'axios';
import { url, method, headers } from '../../js/api';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const User = () => {

    const userDataContext = useContext(UserDataContext);
    const { email } = userDataContext.userData.data;

    const { watchedGamesId } = userDataContext.userData.data;

    const [data, setData] = useState(null);

    useEffect(() => {
        let dataCopy = watchedGamesId;
        dataCopy = dataCopy.filter(el => el !== "");
        dataCopy = dataCopy.join(', ');
        axios({
            url, method, headers, data: `fields *, cover.*, platforms.*; where id = (${dataCopy});`
        })
            .then(response => {
                setData(response.data)
            })
            .catch(err => console.error(err));
    }, [watchedGamesId])


    const handleSignOut = () => {
        firebase.auth().signOut().then(function () {
            window.location.reload();
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <main className="main main-user">
            <header className="user-header">
                <span>{email}</span>
                <button className="btn btn--sign-out" onClick={handleSignOut}> <FontAwesomeIcon className="btn__ico" icon="sign-out-alt" />sign out</button>
            </header>
            <section className="results">
                <p className="result-label">Watched games:</p>
                <ul className="results-list">
                    {data &&
                        data.map(el =>
                            <li key={el.id} className="result">
                                <img className="result__cover" src={el.cover !== undefined ? `//images.igdb.com/igdb/image/upload/t_cover_big/${el.cover.image_id}.jpg` : ""} alt="" />
                                <Link
                                    className="result__game-name"
                                    to={`/game/${el.id}`}>{el.name}</Link>
                                <ul className="platform-list">
                                    {el.platforms && <>{
                                        el.platforms.map(el => (
                                            <li key={el.id} className="platform-label">{el.abbreviation}</li>
                                        ))}
                                    </>}
                                </ul>
                                <div className="rating">
                                    {el.aggregated_rating &&
                                        <>
                                            <FontAwesomeIcon className="rating__icon" icon={['fa', 'star']} /> <p>{el.aggregated_rating.toFixed()}/100</p>
                                        </>
                                    }

                                </div>
                            </li>
                        )
                    }
                </ul>
            </section>
        </main>
    );
}

export default User;