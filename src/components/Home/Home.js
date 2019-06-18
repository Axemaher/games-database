import React, { useEffect, useState } from 'react';
import GameHeader from '../GameHeader/GameHeader';
import CardGrid from '../CardGrid/CardGrid';
import Carousel from "../Carousel/Carousel";
import Articles from '../Articles/Articles';
import Loader from '../Loader/Loader';
import axios from 'axios';
import './Home.scss';
import { url, urlFeed, method, headers, topReleases, popular, feed } from '../../js/api';
import moment from 'moment';

const Home = () => {

    const [dataHeader, setDataHeader] = useState(null)
    const [dataTopReleased, setDataTopReleased] = useState(null)
    const [dataPopular, setDataPopular] = useState(null)
    const [dataArticles, setDataArticles] = useState(null)


    useEffect(() => {
        axios({
            url, method, headers, data: topReleases
        })
            /// HEADER DATA
            .then(response => {
                console.log(response.data)
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

        axios({
            url: urlFeed, method, headers, data: feed
        })
            /// ARTICLES DATA
            .then(response => {
                console.log(response.data);
                const articlesData = response.data.map(function (el) {
                    const { created_at } = el;
                    const { author, image, title, summary, website, id } = el.pulse;
                    return {
                        created: moment().calendar(moment.unix(created_at)),
                        url: website.url,
                        author,
                        image,
                        title,
                        summary,
                        id
                    }
                })
                setDataArticles(articlesData)
            })
            .catch(err => {
                console.error(err);
            });
    }, [])

    return (
        <main className="main">
            <>
                {dataHeader === null ? <Loader /> : <GameHeader data={dataHeader} gameNameBefore={true} />}
                {dataTopReleased === null ? "" : <Carousel data={dataTopReleased} sectionTitle="Coming soon" />}
                {dataPopular === null ? "" : <CardGrid data={dataPopular} sectionTitle="Popular" />}
                {dataArticles === null ? "" : <Articles data={dataArticles} sectionTitle="Articles" />}
            </>
        </main>
    );
}

export default Home;