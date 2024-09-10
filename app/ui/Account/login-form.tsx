'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })


            if (res.ok) {
                router.push('/account/dashboard');
            } else {
                console.log(res.json)
                setError('Email & Password are not in our system')
            }

        } catch (error) {
            setError('Failed to connect. Please try again')
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm mb-20">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    </label>
                    <br />
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    </label>
                    <br />
                    <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </form>
                <div className="flex flex-col items-center justify-center self-center mt-10">
                    <p className="text-sm text-center text-gray-500 mb-3">
                        Not A Member?
                    </p>
                    <button 
                            type="button" 
                            className="font-semibold text-green-600 hover:text-green-700 "
                            onClick={() => router.push('/account/createAccount')}
                        >
                            Create An Account
                    </button>
                </div>
            </div>
        </div>
    )
}