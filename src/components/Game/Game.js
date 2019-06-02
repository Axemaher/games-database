import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameHeader from '../GameHeader/GameHeader';
import Gallery from './Gallery/Gallery';
import GameNav from './GameNav/GameNav';
import Info from './Info/Info';
import Desc from './Desc/Desc';
import Carousel from '../Carousel/Carousel'

// import gameData from '../../js/gameData';

import { url, method, headers, gameById } from '../../js/api';

const Game = ({ match }) => {

    const [data, setdata] = useState(null);
    const [page, setPage] = useState(null);
    useEffect(() => {
        const getData = () => {
            axios({
                url, method, headers, data: `${gameById}; where id = ${match.params.id};`
            })
                .then(response => {
                    setdata(response.data[0]);
                    console.log(response.data[0])
                })
                .catch(err => console.error(err));
            // setdata(gameData);
        }
        getData();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setPage(null);
    }, [match.params.id])


    const tabsData = {
        info: { name: "Informations", icon: "info", id: "pInfo" },
        desc: { name: "Description", icon: "list", id: "pDesc" },
        video: { name: "Videos", icon: "video", id: "pVideo" },
        screen: { name: "Screenshots", icon: "desktop", id: "pScreen" },
        art: { name: "Artworks", icon: "pencil-ruler", id: "pArt" }
    }
    const { info, desc, video, screen, art } = tabsData;

    return (
        <>
            {data === null ?
                <p>loading</p> :
                <>
                    <main className="main">
                        <GameHeader data={data} />
                        <GameNav
                            tabsData={[
                                info,
                                (Boolean(data.summary) || Boolean(data.storyline)) && desc,
                                Boolean(data.videos) && video,
                                Boolean(data.screenshots) && screen,
                                Boolean(data.artworks) && art
                            ]}
                            pageId={page}
                            setPage={setPage}
                        />
                        {page === desc.id && <Desc summary={data.summary} storyline={data.storyline} sectionTitle={desc.name} />}
                        {page === info.id && <Info data={data} sectionTitle={info.name} />}
                        {page === screen.id && <Gallery data={data.screenshots} sectionTitle={screen.name} videoGallery={false} />}
                        {page === art.id && <Gallery data={data.artworks} sectionTitle={art.name} videoGallery={false} />}
                        {page === video.id && <Gallery data={data.videos} sectionTitle={video.name} videoGallery={true} />}
                        <Carousel data={data.similar_games.filter(el => el.cover !== undefined).map(function (el) { return { id: el.id, name: el.name, cover: el.cover.image_id } })} sectionTitle={"Similar games"} />
                    </main>
                </>
            }
        </>
    );
}

export default Game;