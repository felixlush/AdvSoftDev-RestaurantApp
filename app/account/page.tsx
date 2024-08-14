import React from 'react'
import Login from './Login'
import Account from './MyAccount'

export default function Page(){

    const loggedIn = false

    return(
        <section>
            {loggedIn && <Login />}
            {loggedIn && <Account />}
        </section>
    )
}