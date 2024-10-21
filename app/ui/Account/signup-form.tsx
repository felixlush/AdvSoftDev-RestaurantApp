import { useRouter } from 'next/navigation';
import { useState } from 'react';
    
export function SignupForm() {

    const [customerId, setCustomerId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [newErrors, setNewErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {

        setErrors({});

        e.preventDefault()

        if (!validate()){
            return
        }

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
                router.push('/account/login');
            } else {
                console.log(res.json)
                errors.failedLogin = 'Values incorrect please try again'
            }
        } catch (error) {
            errors.failedLogin = 'Failed to connect. Please try again'
        }
    }

    const validate = () => {

        setNewErrors({});

        if (!name.trim()) {
            newErrors.name = "Name is required!";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Invalid email address";
        }

        if (!address.trim()) {
            newErrors.address = "Address is required!";
        }
        
        if (!password.trim()) {
            newErrors.password = "Password is required!";
        }
        else if (password.trim().length < 5) {
            newErrors.password = "Password must be longer than 5";
        }

        if (!postcode.trim()) {
            newErrors.postcode = "Postcode is required!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    </label>
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    </label>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                    />
                    </label>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    <br />
                    <div className='flex-col'>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        </label>
                        {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                        <br />
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Post Code:
                        <input
                            type="text"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 p-3"
                        />
                        </label>
                        {errors.postcode && <p className="mt-2 text-sm text-red-600">{errors.postcode}</p>}
                    </div>
                    <br />
                    <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Account'}</button>
                    {errors.failedLogin && <p className="mt-2 text-sm text-red-600">{errors.failedLogin}</p>}
                </form>
            </div>
        </div>
    )
}