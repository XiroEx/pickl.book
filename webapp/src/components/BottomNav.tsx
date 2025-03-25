import React from 'react';
import { NavLink } from "react-router";


const BottomNav = ({isApp}: any) => {
    
    const height = isApp ? '72px' : '56px';
    const paddingBottom = isApp ? '16px' : '';

    return (
        <nav className={`fixed bottom-0 left-0 right-0 bg-[var(--primary-color)] flex justify-around items-center border-t border-gray-500`}
            style={{
            height,
            paddingBottom,
            boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
            }}>
            <NavLink to="/" >
            <div className={'cursor-pointer'}><NavButton icon={<HomeIcon />} label="002" /></div>
            </NavLink>
            <NavLink to="/net" >
            <div className={'cursor-pointer'}><NavButton icon={<NetIcon />} label="Net" /></div>
            </NavLink>
            <NavLink to="/world" >
            <div className={'cursor-pointer'}><NavButton icon={<WorldIcon />} label="World" /></div>
            </NavLink>
            <NavLink to="/groups" >
            <div className={'cursor-pointer'}><NavButton icon={<EventsIcon />} label="Groups" /></div>
            </NavLink>
            <NavLink to="/player" >
            <div className={'cursor-pointer'}><NavButton icon={<UserIcon />} label="001" /></div>
            </NavLink>
        </nav>
    );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <button className="flex flex-col items-center text-white focus:outline-none">
        {icon}
        <span className="text-xs">{label}</span>
    </button>
);


const HomeIcon: React.FC<{ className?: string }> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
);

const WorldIcon: React.FC<{ className?: string }> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/></svg>
);

const EventsIcon: React.FC<{ className?: string }> = () => (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF">

    <path d="m137-160-57-56 164-164q31-31 42.5-77.5T298-600q0-58 26-114t74-104q91-91 201-103t181 61q72 72 60 182T738-478q-48 48-104 74t-114 26q-97 0-142 11t-77 43L137-160Z"/>
    
    <path fillRule="evenodd" d="M720-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113T720-40Zm0-80q33 0 56.5-23.5T800-200q0-33-23.5-56.5T720-280q-33 0-56.5 23.5T640-200q0 33 23.5 56.5T720-120Z"/>

  </svg>
);

const GroupsIcon: React.FC<{ className?: string }> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"/></svg>
);

const UserIcon: React.FC<{ className?: string }> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
);

const NetIcon = () => (<svg
    width="24px"
    height="24px"
    viewBox="0 0 300 200"
    xmlns="http://www.w3.org/2000/svg"
>
    
    <rect x="0" y="0" width="300" height="20" fill="#FFF" />
    <rect x="0" y="150" width="300" height="20" fill="#FFF" />
    <rect x="0" y="0" width="20" height="200" fill="#FFF" />
    <rect x="280" y="0" width="20" height="200" fill="#FFF" />

    <line x1="80" y1="10" x2="80" y2="150" stroke="#FFF" strokeWidth="10" />
    <line x1="150" y1="10" x2="150" y2="150" stroke="#FFF" strokeWidth="10" />
    <line x1="220" y1="10" x2="220" y2="150" stroke="#FFF" strokeWidth="10" />

    
    <line x1="10" y1="60"  x2="290" y2="60"  stroke="#FFF" strokeWidth="10" />
    <line x1="10" y1="105"  x2="290" y2="105"  stroke="#FFF" strokeWidth="10" />
</svg>)


export default BottomNav;