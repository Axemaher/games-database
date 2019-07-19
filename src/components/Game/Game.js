import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameHeader from '../GameHeader/GameHeader';
import Gallery from './Gallery/Gallery';
import GameNav from './GameNav/GameNav';
import Info from './Info/Info';
import Desc from './Desc/Desc';
import Carousel from '../Carousel/Carousel';
import Articles from '../Articles/Articles';
import { tabsInformations } from '../../js/utils';
import Loader from '../Loader/Loader';
import moment from 'moment';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';



// import gameData from '../../js/gameData';

import { url, urlPulses, method, headers, gameById, pulses } from '../../js/api';

const Game = ({ match }) => {

    const [dataHeader, setDataHeader] = useState(null);
    const [tabsVisibles, setTabsVisibles] = useState(null);
    const [dataTabs, setDataTabs] = useState(null);
    const [similarGames, setSimilarGames] = useState(null);
    const [dataPulses, setDataPulses] = useState(null);


    useEffect(() => {
        const getData = () => {
            axios({
                url, method, headers, data: `${gameById}; where id = ${match.params.id};`
            })
                /// HEADER DATA
                .then(response => {
                    let dataHeader = response.data[0];
                    const { id, cover, name, screenshots, release_dates, involved_companies, websites, rating } = dataHeader;
                    dataHeader = {
                        id,
                        cover: cover === undefined ? null : cover.image_id,
                        name,
                        screenshots,
                        release_date: (release_dates === undefined ? undefined : release_dates[0].human),
                        involved_companie: (involved_companies === undefined ? undefined : involved_companies[0].company.name),
                        websites,
                        rating
                    }
                    setDataHeader(dataHeader);
                    return response;
                })
                /// TABS VISIBLES
                .then(response => {
                    let tabsVisibles = response.data[0];
                    const { summary, storyline, videos, screenshots, artworks } = tabsVisibles;
                    tabsVisibles = {
                        informations: true,
                        description: Boolean(summary) || Boolean(storyline),
                        videos: Boolean(videos),
                        screenshots: Boolean(screenshots),
                        artworks: Boolean(artworks)
                    };
                    setTabsVisibles(tabsVisibles);
                    return response;
                })

                /// INFO DATA
                .then(response => {
                    let dataTabs = response.data[0];
                    const { themes, genres, game_engines, game_modes, platforms, alternative_names, player_perspectives, status, category, summary, storyline, videos, screenshots, artworks } = dataTabs;
                    dataTabs = {
                        informations: {
                            themes, genres, game_engines, game_modes, platforms, alternative_names, player_perspectives, status, category
                        },
                        description: { summary, storyline },
                        videos,
                        screenshots,
                        artworks
                    };
                    setDataTabs(dataTabs);
                    return response;
                })
                /// SIMILAR GAMES DATA
                .then(response => {
                    let similarGames = response.data[0].similar_games || [];
                    similarGames = similarGames.filter(el => el.cover !== undefined)
                        .map(function (el) {
                            return {
                                id: el.id,
                                name: el.name,
                                cover: el.cover.image_id
                            }
                        })
                    setSimilarGames(similarGames);
                })
                .catch(err => console.error(err));

            // PULSES
            axios({
                url: urlPulses, method, headers, data: `${pulses} where game = ${match.params.id} & pulses.image != null;`
            })
                .then(response => {
                    const pulsesData = response.data.map(function (el) {
                        console.log(response.data)
                        const { created_at, id } = el;
                        const { website, author, title, summary } = el.pulses[0];
                        const filteredImages = el.pulses.filter(el => el.image !== undefined);
                        return {
                            created: moment().calendar(moment.unix(created_at)),
                            url: website.url,
                            author,
                            image: filteredImages[0].image,
                            title,
                            summary,
                            id
                        }
                    })
                    setDataPulses(pulsesData)
                })
                .catch(err => console.error(err));
        }

        getData();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [match.params.id])

    const { tabInfo, tabDesc, tabVideo, tabScreen, tabArt } = tabsInformations;
    return (
        <main className="main">
            {dataHeader === null ? <Loader /> :
                <GameHeader
                    data={dataHeader}
                />}
            {tabsVisibles === null || tabsVisibles.length === 0 ? "" :
                <GameNav
                    dataVisibles={tabsVisibles}
                />}
            {dataTabs &&

                <Element name={tabInfo.name}>
                    <Info
                        data={dataTabs.informations}
                        sectionTitle={tabInfo.name}
                    />
                </Element>}
            {dataTabs && dataTabs.description &&
                <Element name={tabDesc.name}>
                    <Desc
                        summary={dataTabs.description.summary}
                        storyline={dataTabs.description.storyline}
                        sectionTitle={tabDesc.name}
                    />
                </Element>}
            {dataTabs && dataTabs.videos &&
                <Element name={tabVideo.name}>
                    <Gallery
                        data={dataTabs.videos}
                        sectionTitle={tabVideo.name}
                        videoGallery={true}
                    /></Element>}
            {dataTabs && dataTabs.screenshots &&
                <Element name={tabScreen.name}>
                    <Gallery
                        data={dataTabs.screenshots}
                        sectionTitle={tabScreen.name}
                        videoGallery={false}
                    />
                </Element>}
            {dataTabs && dataTabs.artworks &&
                <Element name={tabArt.name}>
                    <Gallery
                        data={dataTabs.artworks}
                        sectionTitle={tabArt.name}
                        videoGallery={false}
                    />
                </Element>}

            {dataPulses === null ? "" :
                <Articles
                    data={dataPulses}
                    sectionTitle="Articles"
                />}
            {similarGames === null ? "" :
                <Carousel
                    data={similarGames}
                    sectionTitle={"Similar games"}
                />}
        </main>
    );
}

export default Game;