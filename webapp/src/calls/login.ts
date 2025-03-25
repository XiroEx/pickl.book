

export async function login(email: string) {
    const response = await fetch(`${import.meta.env.VITE_LOGIN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })

    if (!response.ok) {
        throw new Error('Failed to login')
    }

    const data = await response.json()
    console.log(data)
    return data
}

export async function authenticate(sessionId: string, secret: string) {
    console.log( sessionId, secret)
    const response = await fetch(`${import.meta.env.VITE_AUTH_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, secret }),
    })

    if (!response.ok) {
        throw new Error('Failed to authenticate')
    }

    const data = await response.json()
    console.log(data)
    return data
}