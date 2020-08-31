import React, { useContext, useState, useEffect } from 'react'
import SocialLinks from '../SocialLinks/SocialLinks';
import RatingStars from '../RatingStars/RatingStars';
import './GameHeader.scss';
import firebase from 'firebase';
import { UserDataContext } from '../../js/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const GameHeader = ({ data, gameNameBefore }) => {

    const { id, cover, name, screenshots, release_date, involved_companie, websites, rating } = data;

    const backgroundUrl = '//images.igdb.com/igdb/image/upload/t_1080p/' + `${screenshots === undefined ? "" : screenshots[0].image_id}` + '.jpg';
    const coverUrl = `//images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg`;
    const releaseDate = release_date === undefined ? "" : release_date;


    const userDataContext = useContext(UserDataContext)
    const { userData, setAuthModal, setInfoModal } = userDataContext;

    const handleWatch = () => {
        if (!userData.logged) {
            setAuthModal(true)
        } else {
            const { displayName, email, uid, watchedGamesId } = userData.data;
            let watchedGamesCopy = watchedGamesId;
            const index = watchedGamesCopy.findIndex(el => el === id);
            if (index === -1) {
                if (watchedGamesCopy.length > 10) {
                    setInfoModal({
                        visible: true,
                        error: true,
                        content: 'you have reached the limit of observed items'
                    })
                } else {
                    watchedGamesCopy.push(id);
                    setWatched(true);
                }
            } else {
                const index = watchedGamesCopy.findIndex(el => el === id)
                watchedGamesCopy.splice(index, 1);
                setWatched(false)
            }
            firebase.database().ref('users/' + uid).set({
                displayName,
                email,
                uid,
                watchedGamesId: watchedGamesCopy
            });
        }
    }

    useEffect(() => {
        const { watchedGamesId } = userDataContext.userData.data;
        if (watchedGamesId !== undefined &&
            watchedGamesId.findIndex(el => el === id) !== -1) {
            setWatched(true)
        } else {
            setWatched(false)
        }
    }, [userDataContext, data])

    const [watched, setWatched] = useState(false);
    return (
        <section
            className="section game-header"
            style={{ backgroundImage: `url(${backgroundUrl})` }}>
            <button onClick={handleWatch} className="watch-btn">
                <FontAwesomeIcon
                    className={`watch-ico ${watched ? 'watch-ico--watched' : 'watch-ico--not-watched'}`}
                    icon={['fas', 'eye']} />
            </button>
            <div className="cover">
                {cover !== null && <img src={coverUrl} alt="" className="game-cover" />}
            </div>
            <div className="header-informations">
                <div className="informations-row">
                    <div className="name-and-rating">
                        <Link className={`game-link ${gameNameBefore && 'game-name-before'} `} to={`/game/${id}`}><h3 className="game-name">{name}</h3></Link>
                        {rating && <RatingStars data={rating} />}
                        {!rating && <p className="release-date">{releaseDate}</p>}
                    </div>
                    {websites && <SocialLinks data={websites} />}
                </div>
                <div className="creating">
                    <p>Creating by <b>{involved_companie}</b></p>
                </div>
            </div>
        </section >
    );
}

export default GameHeader;