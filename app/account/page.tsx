import React from 'react'
import Login from './Login'
import Account from './MyAccount'

export default function Page(props: {loggedIn: boolean}){
    
    

    return(
        <section>
            {props.loggedIn && <Login />}
            {props.loggedIn && <Account />}
        </section>
    )
}