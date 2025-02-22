import React, { useEffect } from 'react';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';


const App: React.FC = () => {

  useEffect(() => {
    alert(window.matchMedia('(display-mode: standalone)').matches)

  }, []);

  return (
    <div>
      <TopNav />
      <BottomNav />
      {/* Other components can be added here */}
      {window.matchMedia('(display-mode: standalone)').matches && (
        <div className='bg-[var(--primary-color)] pb-4' />
      )}
    </div>
  );
};

export default App;