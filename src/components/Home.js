import React, { Component } from 'react';
import TopRelease from './TopRelease';
import Popular from './Popular';
import axios from 'axios';

const API_KEY = '5fccca9c9526e977331af051c184e3cd';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://api-v3.igdb.com/games';

class Home extends Component {
    state = {
        dataTopRelease: [],
        dataPopularity: []
    }
    componentDidMount() {
        let dateNow = Math.round((new Date()).getTime() / 1000);
        axios({
            url: `${proxyUrl}${targetUrl}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': API_KEY,
            },

            data: `limit 16;
            fields cover.*, name, screenshots.*, release_dates.human, websites.*, involved_companies.company.name, themes.name;
            where popularity > 50 & first_release_date > ${dateNow} & screenshots > 0;
            sort popularity desc;`
        })
            .then(response => {
                console.log(response.data);
                this.setState({ dataTopRelease: response.data })
            })
            .catch(err => {
                console.error(err);
            });
        axios({
            url: `${proxyUrl}${targetUrl}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': API_KEY,
            },

            data: `limit 8;
                fields id, name, screenshots.*, summary, release_dates.human, involved_companies.company.*, themes.*;
                where popularity > 100 & screenshots > 0 & release_dates != null & themes != 42;
                sort popularity desc;`
        })
            .then(response => {
                console.log(response.data);
                this.setState({ dataPopularity: response.data })
            })
            .catch(err => {
                console.error(err);
            });
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



// data: `search "metal gear solid"; fields *, screenshots.*, websites.*, artworks.*;
// where rating >= 80 & release_dates.date > 631152000; `




