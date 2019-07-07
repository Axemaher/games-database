import React, { useContext } from 'react';
import { UserDataContext } from '../../js/context';

const User = () => {

    const userDataContext = useContext(UserDataContext);
    const { email, displayName, uid } = userDataContext.userData.data;

    return (
        <span>
            {email}
        </span>
    );
}

export default User;