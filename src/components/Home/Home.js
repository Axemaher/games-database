import React, { useEffect, useState } from 'react';
import GameHeader from '../GameHeader/GameHeader';
import CardGrid from '../CardGrid/CardGrid';
import Carousel from "../Carousel/Carousel";
import Loader from '../Loader/Loader';
import axios from 'axios';
import './Home.scss';
import { url, method, headers, topReleases, popular } from '../../js/api';


const Home = () => {

    const [dataHeader, setDataHeader] = useState(null)
    const [dataTopReleased, setDataTopReleased] = useState(null)
    const [dataPopular, setDataPopular] = useState(null)

    useEffect(() => {
        axios({
            url, method, headers, data: topReleases
        })
            /// HEADER DATA
            .then(response => {
                let headerData = response.data[Math.floor((Math.random() * response.data.length) + 0)];
                const { id, cover, name, screenshots, release_dates, involved_companies, websites, rating } = headerData;
                headerData = {
                    id,
                    cover: cover.image_id,
                    name,
                    screenshots,
                    release_date: release_dates[0].human,
                    involved_companie: involved_companies[0].company.name,
                    websites,
                    rating
                }
                setDataHeader(headerData);
                return response;
            })
            /// TOP RELEASED DATA
            .then(response => {
                const topRelesedData = response.data.map(function (el) {
                    return {
                        id: el.id,
                        name: el.name,
                        cover: el.cover.image_id
                    }
                })
                setDataTopReleased(topRelesedData)
            })
            .catch(err => console.error(err));
        axios({
            url, method, headers, data: popular
        })
            /// POPULAR DATA
            .then(response => {
                const popularData = response.data.map(function (el) {
                    const { id, name, themes, release_dates, summary, screenshots } = el;
                    return {
                        id,
                        screenshot: screenshots[Math.floor((Math.random() * el.screenshots.length) + 0)].image_id,
                        name,
                        theme: themes[0].name,
                        release_date: release_dates[0].human,
                        summary
                    }
                })
                setDataPopular(popularData)
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <main className="main">
            <>
                {dataHeader === null ? <Loader /> : <GameHeader data={dataHeader} gameNameBefore={true} />}
                {dataTopReleased === null ? "" : <Carousel data={dataTopReleased} sectionTitle="Coming soon" />}
                {dataPopular === null ? "" : <CardGrid data={dataPopular} sectionTitle="Popular" />}
            </>

        </main>
    );
}

export default Home;