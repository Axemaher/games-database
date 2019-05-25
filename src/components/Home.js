import React, { Component } from 'react';
import TopRelease from './TopRelease';
import CardGrid from './CardGrid';
import axios from 'axios';
import { url, method, headers, topReleases, popular } from '../js/api';

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
        return (
            <main className="main">
                {this.state.dataTopRelease.length > 5 ?
                    <>
                        <TopRelease data={this.state.dataTopRelease} />
                        <CardGrid data={this.state.dataPopularity} sectionTitle="Popular" />
                    </>

                    : "loading"}
            </main>
        );
    }
}

export default Home;




