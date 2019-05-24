import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import SocialLinks from './SocialLinks';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const TopRelease = props => {

    const data = props.data[Math.floor((Math.random() * props.data.length) + 0)];

    const responsive = {
        0: { items: 2 },
        500: { items: 3 },
        700: { items: 4 },
        900: { items: 5 },
        1024: { items: 6 },
    };

    const { id, cover, name, screenshots, release_dates, involved_companies, websites } = data;
    const backgroundUrl = '//images.igdb.com/igdb/image/upload/t_1080p/' + screenshots[Math.floor((Math.random() * screenshots.length) + 0)].image_id + '.jpg';
    const coverUrl = `//images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`;
    const releaseDate = release_dates[0].human;

    const slidesData = props.data.map((item, i) => (
        <div key={i} className="releasing-item">
            <Link to={`/game/${item.id}`} className="releasing-item-href">
                <div className="releasing-item__image" style={{ backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg)` }}></div>
                <p className="releasing-item__name">{item.name}</p>
            </Link>
        </div>
    ));

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
            <section className="section section-carousel">
                <h2 className="section-title">Coming Soon</h2>
                <AliceCarousel
                    items={slidesData}
                    responsive={responsive}
                    autoPlayInterval={3000}
                    autoPlayDirection="rtl"
                    autoPlay={false}
                    buttonsDisabled={true}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={false}
                    disableAutoPlayOnAction={true}
                    dotsDisabled={true}
                />
            </section>
        </>
    )


}

export default TopRelease;