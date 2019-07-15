import React, { useContext } from 'react';
import { UserDataContext } from '../../js/context';
import firebase from 'firebase';

const User = () => {

    const userDataContext = useContext(UserDataContext);
    const { email, displayName, uid } = userDataContext.userData.data;

    const handleSignOut = () => {
        firebase.auth().signOut().then(function () {
            window.location.reload();
        }).catch(error => {
            console.log(error)
        });
    }
    console.log(userDataContext)
    return (
        <span>
            {email}
            <button onClick={handleSignOut}>sign out</button>
        </span>
    );
}

export default User;