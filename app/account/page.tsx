import React from 'react'
import Login from './login'
import Account from './myaccount'

export default function Page(props: {loggedIn: boolean}){
    
    
    
    return(
        <section>
            {props.loggedIn && <Login />}
            {props.loggedIn && <Account />}
        </section>
    )
}