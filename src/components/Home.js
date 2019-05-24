import React, { Component } from 'react';
import TopRelease from './TopRelease';
import Popular from './Popular';
import axios from 'axios';
import { url, method, headers, topReleases, popular } from '../js/api';

const API_KEY = '5fccca9c9526e977331af051c184e3cd';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://api-v3.igdb.com/games';

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
                console.log(response.data);
                this.setState({ dataTopRelease: response.data })
            })
            .catch(err => console.error(err));
        axios({
            url, method, headers, data: popular
        })
            .then(response => {
                console.log(response.data);
                this.setState({ dataPopularity: response.data })
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <main className="main">
                {this.state.dataTopRelease.length > 5 ?
                    <>
                        <TopRelease data={this.state.dataTopRelease} />
                        <Popular data={this.state.dataPopularity} />
                    </>

                    : "loading"}
            </main>
        );
    }
}

export default Home;




