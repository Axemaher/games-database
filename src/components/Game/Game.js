import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameHeader from '../GameHeader/GameHeader';
import Gallery from '../Gallery/Gallery';
import GameNav from '../GameNav/GameNav';

import { url, method, headers, gameById } from '../../js/api';

const Game = ({ match }) => {

    const [data, setdata] = useState(null);
    const [page, setPage] = useState("pVideo");

    useEffect(() => {
        axios({
            url, method, headers, data: `${gameById}; where id = ${match.params.id};`
        })
            .then(response => {
                setdata(response.data[0]);
            })
            .catch(err => console.error(err));
    }, [])
    const tabsData = {
        info: { name: "Informations", icon: "info", id: "pInfo" },
        desc: { name: "Description", icon: "list", id: "pDesc" },
        video: { name: "Videos", icon: "video", id: "pVideo" },
        screen: { name: "Screenshots", icon: "desktop", id: "pScreen" },
        art: { name: "Artworks", icon: "pencil-ruler", id: "pArt" }
    }

    return (
        <>
            {data === null ?
                <p>loading</p> :
                <>
                    <main className="main">
                        <GameHeader data={data} />
                        <GameNav
                            tabsData={[
                                tabsData.info,
                                (Boolean(data.summary) || Boolean(data.storyline)) && tabsData.desc,
                                Boolean(data.videos) && tabsData.video,
                                Boolean(data.screenshots) && tabsData.screen,
                                Boolean(data.artworks) && tabsData.art
                            ]}
                            pageId={page}
                            setPage={setPage}
                        />
                        {page === tabsData.screen.id && <Gallery data={data.screenshots} sectionTitle={"Screenshots"} videoGallery={false} />}
                        {page === tabsData.art.id && <Gallery data={data.artworks} sectionTitle={"Artworks"} videoGallery={false} />}
                        {page === tabsData.video.id && <Gallery data={data.videos} sectionTitle={"Videos"} videoGallery={true} />}

                    </main>
                </>
            }
        </>
    );
}

export default Game;