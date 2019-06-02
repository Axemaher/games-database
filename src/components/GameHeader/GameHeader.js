import React from 'react'
import SocialLinks from '../SocialLinks/SocialLinks';
import RatingStars from '../RatingStars/RatingStars';
import './GameHeader.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const GameHeader = ({ data, gameNameBefore }) => {
    console.log(data)
    const { id, cover, name, screenshots, release_dates, involved_companies, websites, rating } = data;

    const backgroundUrl = '//images.igdb.com/igdb/image/upload/t_1080p/' + `${screenshots === undefined ? "" : screenshots[0].image_id}` + '.jpg';
    const coverUrl = `//images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`;
    const releaseDate = release_dates === undefined ? "" : release_dates[0].humans;

    return (
        <section
            className="section game-header"
            style={{ backgroundImage: `url(${backgroundUrl})` }}>
            <div className="cover">
                <img src={coverUrl} alt="" className="game-cover" />
            </div>
            <div className="header-informations">
                <div className="informations-row">
                    <div className="name-and-rating">
                        <Link className={`game-name ${gameNameBefore && 'game-name-before'} `} to={`/game/${id}`}>{name}</Link>
                        {rating && <RatingStars data={rating} />}
                        {!rating && <p className="release-date">{releaseDate}</p>}
                    </div>
                    {websites && <SocialLinks data={websites} />}
                </div>
                <div className="creating">
                    <p>Creating by <b>{involved_companies[0].company.name}</b></p>
                </div>
            </div>
        </section >
    );
}

export default GameHeader;