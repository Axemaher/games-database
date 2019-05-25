import React from 'react';
import SocialLinks from './SocialLinks';
import { BrowserRouter as Link } from "react-router-dom";
import Carousel from './Carousel';



const TopRelease = props => {

    const data = props.data[Math.floor((Math.random() * props.data.length) + 0)];

    const { id, cover, name, screenshots, release_dates, involved_companies, websites } = data;
    const backgroundUrl = '//images.igdb.com/igdb/image/upload/t_1080p/' + screenshots[Math.floor((Math.random() * screenshots.length) + 0)].image_id + '.jpg';
    const coverUrl = `//images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`;
    const releaseDate = release_dates[0].human;

    return (
        <>
            <section
                className="section top-release"
                style={{ backgroundImage: `url(${backgroundUrl})` }}>
                <div className="cover">
                    <img src={coverUrl} alt="" className="game-cover" />
                </div>
                <div className="header-informations">
                    <div className="informations-row">
                        <div className="name-and-rating">
                            <Link className="game-name" to={`/game/${id}`}>{name}</Link>
                            <p className="release-date">{releaseDate}</p>
                        </div>
                        <SocialLinks data={websites} />
                    </div>
                    <div className="creating">
                        <p>Creating by <b>{involved_companies[0].company.name}</b></p>
                    </div>
                </div>
            </section>
            <Carousel data={props.data} />
        </>
    )


}

export default TopRelease;