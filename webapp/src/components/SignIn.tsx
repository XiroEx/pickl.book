import { createRef, useEffect, useState } from "react";
import { authenticate, login } from "../calls/login";
import { signInWithCustomToken } from "firebase/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { Loading } from "./Loading";


export default function SignIn({user, auth, db}: any) {

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [secret, setSecret] = useState('');
    const [loading, setLoading] = useState(false);

    async function getEmail() {
        setLoading(true)
        const data = await login(email)
        const { sessionId } = data;
        if (!sessionId) {
            alert('Error logging in');
            return;
        }
        setSessionId(sessionId);
        setLoading(false)
    }

    async function signIn() {
        setLoading(true)
        const data = await authenticate(sessionId!, secret)
    }

    return <>

        {!sessionId && !loading && <>
            {!open && <button
                onClick={() => setOpen(true)}
            className="bg-[var(--secondary-color)] text-[var(--primary-color)] py-2 px-4 rounded"
            >
                Sign in with Email
            </button>}
            
            {open && <div className="flex flex-col gap-4">
                <input type="email" placeholder="Email" autoFocus className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-[var(--secondary-color)] text-[var(--primary-color)] py-2 px-4 rounded"
                    onClick={() => getEmail()}>
                    Sign In
                </button>
            </div>}
        </>}

        {sessionId && <SecretLogin {...{setSecret, signIn, secret, sessionId, db, auth, setLoading}} />}
        {loading && <Loading loading={true}/>}

    </>
}

function SecretLogin({setSecret, signIn, secret, sessionId, db, auth, setLoading}: any) {

    const [session, sessionLoading, sessionError] = useDocumentData(
        doc(db, `sessions/${sessionId}`)
    );

    useEffect(() => {
        if (session && session.token) {
            console.log('signing in')
            signInWithCustomToken(auth, session.token)
            setLoading(false)
        }
        if (sessionError) {
            console.log(sessionError)
            setLoading(false)
        }
    }, [session])

    return <div className="flex flex-col gap-4">
    <input type="email" placeholder="6-digit code" autoFocus className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" 
        value={secret} onChange={(e) => setSecret(e.target.value)}
    />
    <button className="bg-[var(--secondary-color)] text-[var(--primary-color)] py-2 px-4 rounded"
        onClick={() => signIn()} disabled={secret.length < 6}>
        Sign In
    </button>
</div>
}