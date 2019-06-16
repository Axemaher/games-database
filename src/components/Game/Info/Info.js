import React from 'react';
import './Info.scss';
import { gameCategory, gameStatus } from '../../../js/utils.js'

const Info = ({ data, sectionTitle }) => {


    const { themes, genres, game_engines, game_modes, platforms, alternative_names, player_perspectives, status, category } = data;

    let infoContainerData = [
        { data: themes, categoryName: "Themes", id: 0 },
        { data: genres, categoryName: "Genres", id: 1 },
        { data: game_engines, categoryName: "Game engines", id: 2 },
        { data: game_modes, categoryName: "Game modes", id: 3 },
        { data: platforms, categoryName: "Platforms", id: 4 },
        { data: alternative_names, categoryName: "Alternative names", id: 5 },
        { data: player_perspectives, categoryName: "Player perspectives", id: 6 },
        { data: gameStatus(status), categoryName: "Status", id: 7 },
        { data: gameCategory(category), categoryName: "Category", id: 8 },
    ]

    infoContainerData = infoContainerData.filter(data => data.data !== undefined)

    return (
        <section className="section section-info">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="informations">
                {infoContainerData.map(contData => (
                    <InformationContainer
                        key={contData.id}
                        label={contData.categoryName}
                        dataNames={contData.data.map(el => el.name)}
                    />
                ))}
            </div>

        </section>
    );
}

const InformationContainer = ({ label, dataNames }) => {
    return (
        <div className="information-container">
            <p className="information-category">{label}:</p>
            <ul>
                {dataNames.map((el, index) => <li key={index} >{el}</li>)}
            </ul>
        </div>
    )
}

export default Info;