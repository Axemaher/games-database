import React, { useState } from 'react'

const platformFilterCheckboxes = [
    {
        name: "mac",
        key: 14,
        checked: false,
        label: "Mac"
    },
    {
        name: "linux",
        key: 3,
        checked: false,
        label: "Linux"
    },
    {
        name: "pc",
        key: 6,
        checked: false,
        label: "PC (Microsoft Windows)"
    },
    {
        name: "nintendo",
        key: 130,
        checked: false,
        label: "Nintendo Switch"
    },
    {
        name: "ps4",
        key: 48,
        checked: false,
        label: "PlayStation 4"
    },
    {
        name: "xone",
        key: 49,
        checked: false,
        label: "Xbox One"
    },
    {
        name: "x360",
        key: 12,
        checked: false,
        label: "Xbox 360"
    },
    {
        name: "ps3",
        key: 9,
        checked: false,
        label: "PlayStation 3"
    },
]



const PlatformFilter = ({ getQuery }) => {
    const [checkedItems, setCheckedItems] = useState([...platformFilterCheckboxes]);

    const handleChange = (e) => {
        const copy = [...checkedItems];
        const index = copy.findIndex(el => el.name === e.target.name)
        copy[index].checked = e.target.checked;
        setCheckedItems(copy);

        const onlyChecked = copy.filter(el => el.checked);
        if (!onlyChecked.length) {
            getQuery("");
        } else {
            const platformFilterQuery = `platforms = (${onlyChecked.map(el => `${el.key}`)})`
            getQuery(platformFilterQuery);
        }
    }

    return (
        <>
            {
                checkedItems.map(item => (
                    <label key={item.key}>
                        {item.label}
                        <input
                            type="checkbox"
                            name={item.name}
                            checked={checkedItems[item.name]}
                            onChange={handleChange}
                        />
                    </label>
                ))
            }
        </>
    );
}

export default PlatformFilter;

