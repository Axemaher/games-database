import React, { Component } from 'react';
import GameHeader from '../GameHeader/GameHeader';
import CardGrid from '../CardGrid/CardGrid';
import Carousel from "../Carousel/Carousel";
import axios from 'axios';
import './Home.scss';
import { url, method, headers, topReleases, popular } from '../../js/api';

class Home extends Component {
    state = {
        dataTopRelease: [],
        dataPopularity: []
    }
    componentDidMount() {
        axios({
            url, method, headers, data: topReleases
        })
            .then(response => {
                // console.log(response.data);
                this.setState({ dataTopRelease: response.data })
            })
            .catch(err => console.error(err));
        axios({
            url, method, headers, data: popular
        })
            .then(response => {
                // console.log(response.data);
                this.setState({ dataPopularity: response.data })
            })
            .catch(err => console.error(err));
    }
    render() {
        const { dataTopRelease, dataPopularity } = this.state;
        return (
            <main className="main">
                {dataTopRelease.length > 5 ?
                    <>
                        <GameHeader data={dataTopRelease[Math.floor((Math.random() * dataTopRelease.length) + 0)]} gameNameBefore={true} />
                        <Carousel data={dataTopRelease} sectionTitle="Coming soon" />
                        <CardGrid data={dataPopularity} sectionTitle="Popular" />
                    </>

                    : "loading"}
            </main>
        );
    }
}

export default Home;




