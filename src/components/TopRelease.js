import React, { Component } from 'react';
import { websitesIcons } from '../js/websitesIcons'

class TopRelease extends Component {

    state = {
        data: this.props.data[Math.floor((Math.random() * this.props.data.length) + 0)]
    }

    render() {
        const { cover, name, screenshots, release_dates, involved_companies, websites } = this.state.data;
        const backgroundUrl = '//images.igdb.com/igdb/image/upload/t_1080p/' + screenshots[0].image_id + '.jpg';
        const coverUrl = `//images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`;
        const releaseDate = release_dates[0].human;
        return (
            <>
                {this.state.data === null ? "loading" :
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

                }
            </>
        )

    }
}

export default TopRelease;


