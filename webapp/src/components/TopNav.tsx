import React from 'react';
import Sidebar from './Sidebar';

const TopNav = ({isApp, user, auth}: any)=> {

    const [open, setOpen] = React.useState(false);

    const toggleMenu = () => {
        const root = document.documentElement;
        const isOpen = root.style.getPropertyValue('--menu-open') === 'true';
        root.style.setProperty('--menu-open', isOpen ? 'false' : 'true');
        setOpen(!open);
    };

    return (
        <div className="relative">
            <nav className={`bg-[var(--primary-color)] p-4 ${isApp ? 'pt-2 h-12' : 'h-14'} flex justify-between items-center border-b border-gray-500`}>
                <div className="text-white text-lg font-bold">pickl.book</div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {document.documentElement.style.getPropertyValue('--menu-open') === 'true' ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </nav>
            {document.documentElement.style.getPropertyValue('--menu-open') === 'true' && <div className="fixed inset-0 bg-black opacity-50 lg:hidden z-[49]" onClick={toggleMenu}></div>}
            <Sidebar {...{user, auth}}/>
        </div>
    );
};

export default TopNav;




const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);