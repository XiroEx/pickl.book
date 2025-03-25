import { updatePassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"


export default function ProfileInfo({user, auth, db} : any) {

    async function updateUser() {
        const profileData: {displayName?: string, photoURL?: string} = {}

        if ((document.getElementById('name') as HTMLInputElement).value) {
            profileData['displayName'] = (document.getElementById('name') as HTMLInputElement).value
        }
        if ((document.getElementById('photo') as HTMLInputElement).value) {
            profileData['photoURL'] = (document.getElementById('photo') as HTMLInputElement).value
        }
        if (!profileData.displayName && !profileData.photoURL) return

        await updateProfile(auth.currentUser, profileData)
        
        const user = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            photo: (document.getElementById('photo') as HTMLInputElement).value,
            dob: (document.getElementById('dob') as HTMLInputElement).value,
            location: (document.getElementById('location') as HTMLInputElement).value,
            bio: (document.getElementById('bio') as HTMLInputElement).value,
            ranking: (document.getElementById('ranking') as HTMLInputElement).value,
        }

        await setDoc(doc(db, `users/${auth.currentUser.uid}`), user)

        const password = (document.getElementById('password') as HTMLInputElement).value
        if (password) {
            await updatePassword(auth.currentUser, password)
        }

    }

    return (<div className="flex flex-col items-center justify-center h-[90vh]">
        <form className="flex flex-col gap-2 items-center justify-center">
            <div className="flex items-center justify-center gap-2 p-4">
                {!user.displayName && <div className="flex-4">
                    <label htmlFor="name" className="block">Picklbook Name*</label>
                    <input type="text" id="name" required className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded w-[100%]" />
                </div>}

                {!user.photoUrl && <div className="flex-1 items-center flex flex-col p-0 h-full" onClick={
                    () => (document.getElementById('photo') as HTMLInputElement).click()
                }>
                    <label htmlFor="photo" className="block">Photo</label>
                    <input type="file" id="photo" className="hidden" />
                    <Upload className="mx-auto"/>
                </div>}

            </div>
            
            <div>
                <label htmlFor="password" className="block">Password*</label>
                <input type="password" id="password" required className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" />
            </div>

            <div>
                <label htmlFor="dob" className="block">Date of Birth*</label>
                <input type="date" id="dob" required className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" />
            </div>

            <div>
                <label htmlFor="location" className="block">Location</label>
                <input type="text" id="location" className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" />
            </div>

            <div>
                <label htmlFor="ranking" className="block">Ranking</label>
                <input type="number" id="ranking" className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" />
            </div>

            <div>
                <label htmlFor="bio" className="block">Bio</label>
                <textarea id="bio" className="border border-gray-300 bg-[var(--background-color)] text-[var(--primary-color)] p-2 rounded" />
            </div>

            <button type="button" onClick={updateUser} className="bg-blue-500 text-white p-2 rounded m-4">
                Update Profile
            </button>

        </form>
    </div>)
}

const Upload = ({className}: any)=> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" className={className}/></svg>