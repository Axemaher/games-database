import React, { useState } from 'react';
import './Search.scss'


const Filter = ({ data, getQuery, queryStart, title }) => {

    const shortListCount = 5;

    const [checkedItems, setCheckedItems] = useState([...data]);

    const handleChange = (e) => {
        const copy = [...checkedItems];
        const index = copy.findIndex(el => el.name === e.target.name)
        copy[index].checked = e.target.checked;
        setCheckedItems(copy);

        const onlyChecked = copy.filter(el => el.checked);
        if (!onlyChecked.length) {
            getQuery("");
        } else {
            const query = `& ${queryStart} = (${onlyChecked.map(el => `${el.key}`)})`
            getQuery(query);
            console.log(query)
        }
    }
    const [showAll, setShowMore] = useState(false);
    return (
        <div>
            <span className="filter-list-title">{title}</span>
            <ul className="filter-list">
                {
                    checkedItems.map(item => (
                        <li key={item.id} className={
                            `checkbox-container
                            ${showAll ?
                                "checkbox-container--show-all" :
                                "checkbox-container--short-ver "
                            }`
                        }>
                            <input
                                id={item.id}
                                type="checkbox"
                                name={item.name}
                                checked={checkedItems[item.name]}
                                onChange={handleChange}
                            />
                            <label className="agree" htmlFor={item.id}>
                                <span className="v-sign"></span>
                                {item.label}
                            </label>
                        </li>
                    ))
                }
            </ul>
            {checkedItems.length > shortListCount &&
                <span
                    className="show-more-btn"
                    onClick={() => setShowMore(!showAll)}
                >{showAll ? "show less" : `show more (${checkedItems.length - shortListCount})`}
                </span>
            }
        </div>
    );
}

export default Filter;
