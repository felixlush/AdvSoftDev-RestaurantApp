import { useRouter } from 'next/navigation';
import { useState } from 'react';
    
export function SignupForm() {

    const [customerId, setCustomerId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form)
        
        try{
            const res = await fetch('/api/auth/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    address,
                    postcode,
                    password
                })
            })


            if (res.ok) {
                router.push('/login');
            } else {
                console.log(res.json)
                setError('Values incorrect please try again')
            }
        } catch (error) {
            setError('Failed to connect. Please try again')
        }
    }

    return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  shadow-md">
            
            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm mb-20">
            <h1 className='mb-7'>Create An Account</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    </label>
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
                    <div className='flex-col'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        </label>
                        <br />
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Post Code:
                        <input
                            type="text"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        </label>
                    </div>
                    <br />
                    <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Account'}</button>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    )
}