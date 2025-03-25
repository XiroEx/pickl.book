import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';


function Sidebar({user, auth}: any){
    const isOpen = document.documentElement.style.getPropertyValue('--menu-open') === 'true';

    useEffect(() => {
        console.log(user)
    }
    , []);

    function logOut() {
        signOut(auth)
    }

    const userIcon = user.photoURL || "https://png.pngtree.com/png-clipart/20230807/original/pngtree-pickleball-vector-illustration-isolated-on-white-background-outdoor-illustration-play-vector-picture-image_10070408.png";
    return (
        <div className={`fixed inset-y-0 right-0 bg-[var(--primary-color)] text-white w-64 lg:w-128 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
            <div className="pt-4">
                <div className="flex flex-col items-end p-4 mb-4 border-b border-gray-400 ">
                    <img src={userIcon} alt="User Icon" className="w-10 h-10 rounded-full mb-2 object-cover" />
                    <div className="text-right">
                        <p className="text-sm font-medium">{user.displayName}</p>
                    </div>
                </div>
                
                <ul className="px-4">
                    <li className="mb-2"><a href="#profile" className="block p-2 hover:bg-gray-700 rounded">Profile</a></li>
                    <li className="mb-2"><a href="#settings" className="block p-2 hover:bg-gray-700 rounded">Settings</a></li>
                    <li className="mb-2"><a href="#help" className="block p-2 hover:bg-gray-700 rounded">Help</a></li>
                    <li className="mb-2"><a href="#logout" className="block p-2 hover:bg-gray-700 rounded" onClick={logOut}>Log Out</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;