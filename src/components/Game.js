import React from 'react'

const Game = props => {
    console.log(props.match.params.id)
    return (<h1>game {<p> id: {props.match.params.id}</p>}</h1>);
}

export default Game;