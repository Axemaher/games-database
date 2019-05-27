import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameHeader from '../GameHeader/GameHeader'

import { url, method, headers, gameById } from '../../js/api';

const Game = ({ match }) => {

    const [data, setdata] = useState(null);


    useEffect(() => {
        axios({
            url, method, headers, data: `${gameById}; where id = ${match.params.id};`
        })
            .then(response => {
                setdata(response.data)
            })
            .catch(err => console.error(err));
    }, [])

    console.log(match.params.id)
    console.log(data)

    return (
        <>
            {data === null ?
                <p>loading</p> :
                <>
                    <main className="main">
                        <GameHeader data={data[0]} />
                    </main>
                </>
            }
        </>
    );
}

export default Game;