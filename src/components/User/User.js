import React, { useContext } from 'react';
import { UserDataContext } from '../../js/context';

const User = () => {

    const userDataContext = useContext(UserDataContext)
    const userEmail = userDataContext.userData.data.email
    return (
        <span>{userEmail}</span>
    );
}

export default User;