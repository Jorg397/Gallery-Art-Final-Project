import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Profile() {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {isAuthenticated && <img src={user.picture} alt="Profile" />}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={() => logout()}>Log out</button>
        </div>
    );

}
