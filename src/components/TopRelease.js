import React, { Component } from 'react';

class TopRelease extends Component {

    state = {
        data: this.props.data[Math.floor((Math.random() * this.props.data.length) + 0)]
    }

    render() {
        const { cover, name, screenshots, release_dates } = this.state.data;
        const background = {
            backgroundImage: "url('//images.igdb.com/igdb/image/upload/t_720p/" + screenshots[0].image_id + ".jpg')"
        };
        return (
            <>
                {this.state.data === null ? "loading" :
                    <section
                        className="section top-release"
                        style={background}>
                        <div className="cover">
                            <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`} alt="" className="game-cover" />
                        </div>
                        <div className="header-informations">
                            <div className="informations-row">
                                <div className="name-and-rating">
                                    <h1 className="game-name">{name}</h1>
                                    <p>{release_dates[0].human}</p>
                                </div>
                                <ul className="social-links">
                                    <li className="social-link">
                                        <a href="#">
                                            <img className="social-link__icon"
                                                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_twitter-128.png"
                                                alt="tweeter" />
                                        </a>
                                    </li>
                                    <li className="social-link">
                                        <a href="#">
                                            <img className="social-link__icon"
                                                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-128.png"
                                                alt="tweeter" />
                                        </a>
                                    </li>
                                    <li className="social-link">
                                        <a href="#">
                                            <img className="social-link__icon"
                                                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-128.png"
                                                alt="tweeter" />
                                        </a>
                                    </li>
                                    <li className="social-link">
                                        <a href="#">
                                            <img className="social-link__icon"
                                                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-128.png"
                                                alt="tweeter" />
                                        </a>
                                    </li>
                                    <li className="social-link">
                                        <a href="#">
                                            <img className="social-link__icon"
                                                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-128.png"
                                                alt="tweeter" />
                                        </a>
                                    </li>
                                    <li className="social-link">
                                        <a href="#">
                                            <img className="social-link__icon"
                                                src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-128.png"
                                                alt="tweeter" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="creating">
                                <p>Creating by <b>Riot Games</b> and published by <b>EA Games</b></p>
                            </div>
                        </div>
                    </section>

                }
            </>
        )

    }
}

export default TopRelease;


