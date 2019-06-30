import React from 'react';

const initialData = {
    logged: true,
    data: {
        name: "Adam",
        uid: "sdhfiushdfiu34u5h34",
        watchedId: "122"
    }
}

export const UserDataContext = React.createContext(initialData);
