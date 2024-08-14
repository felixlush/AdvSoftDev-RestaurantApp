'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleLogin } from '@/app/lib/actions'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    return (
        <div>
            <form>
                <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </label>
                <br />
                <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}