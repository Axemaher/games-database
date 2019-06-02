import React, { useEffect } from 'react';
import './Info.scss';
import { gameCategory, gameStatus } from '../../../js/utils.js'

const Info = ({ data, sectionTitle }) => {
    console.log(data)

    const myRef = React.createRef();
    useEffect(() => {
        window.scrollTo({
            top: myRef.current.offsetTop,
            behavior: 'smooth',
        })
    }, [myRef])

    let infoContainerData = [
        { data: data.themes, categoryName: "Themes", id: 0 },
        { data: data.genres, categoryName: "Genres", id: 1 },
        { data: data.game_engines, categoryName: "Game engines", id: 2 },
        { data: data.game_modes, categoryName: "Game modes", id: 3 },
        { data: data.platforms, categoryName: "Platforms", id: 4 },
        { data: data.alternative_names, categoryName: "Alternative names", id: 5 },
        { data: data.player_perspectives, categoryName: "Player perspectives", id: 6 },
        { data: gameStatus(data.status), categoryName: "Status", id: 7 },
        { data: gameCategory(data.category), categoryName: "Category", id: 8 },
    ]

    infoContainerData = infoContainerData.filter(data => data.data !== undefined)

    return (
        <section ref={myRef} className="section section-info">
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
    console.log(dataNames)
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