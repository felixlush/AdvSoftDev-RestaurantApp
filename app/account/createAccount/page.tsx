'use client'
import { SignupForm } from '@/app/ui/Account/signup-form'
import Header  from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import React from 'react'

export default function CreateAccount() {
    return (
        <>
            <Header />
            <SignupForm />
            <Footer />
        </>
    )
}