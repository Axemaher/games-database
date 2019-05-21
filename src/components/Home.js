import React, { Component } from 'react';
import TopRelease from './TopRelease';
import axios from 'axios'

const API_KEY = '5fccca9c9526e977331af051c184e3cd';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://api-v3.igdb.com/games';

class Home extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        let dateNow = Math.round((new Date()).getTime() / 1000);

        console.log(dateNow)
        axios({
            url: `${proxyUrl}${targetUrl}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': API_KEY,
            },

            data: `limit 10;
            fields *, screenshots.*, cover.*, release_dates.*, websites.*, involved_companies.company.*;
            where popularity > 80 & first_release_date > ${dateNow};
            sort popularity desc;`
        })
            .then(response => {
                console.log(response.data);
                this.setState({ data: response.data })
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <main className="main">
                {this.state.data.length > 5 ? <TopRelease data={this.state.data} /> : "null"}
            </main>
        );
    }
}

export default Home;



// data: `search "metal gear solid"; fields *, screenshots.*, websites.*, artworks.*;
// where rating >= 80 & release_dates.date > 631152000; `




