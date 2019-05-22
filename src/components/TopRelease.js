import React, { Component } from 'react';
import { websitesIcons } from '../js/websitesIcons';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"



class TopRelease extends Component {

    state = {
        data: this.props.data[Math.floor((Math.random() * this.props.data.length) + 0)],
        slidesData: this.props.data.map((item, i) => (
            <div key={i} className="releasing-item">
                <a href="#" className="releasing-item-href">
                    <div className="releasing-item__image" style={{ backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg)` }}></div>
                    <p className="releasing-item__name">{item.name}</p>
                </a>
            </div>
        ))
    }
    responsive = {
        0: { items: 2 },
        500: { items: 3 },
        900: { items: 4 },
        1024: { items: 6 },
    }

    render() {
        const { cover, name, screenshots, release_dates, involved_companies, websites } = this.state.data;
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
                                <h1 className="game-name">{name}</h1>
                                <p className="release-date">{releaseDate}</p>
                            </div>
                            <ul className="social-links">
                                {websites.map((link, index) => (
                                    <li key={index} className="social-link">
                                        {websitesIcons(link.category, link.url)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="creating">
                            <p>Creating by <b>{involved_companies[0].company.name}</b></p>
                        </div>
                    </div>
                </section>
                <section className="section section-carousel">
                    <h2 className="seciton-title">Coming Soon</h2>
                    <AliceCarousel
                        items={this.state.slidesData}
                        responsive={this.responsive}
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
}

export default TopRelease;