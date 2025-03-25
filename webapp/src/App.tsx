import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Route, Routes } from 'react-router';
import { authenticate } from './calls/login';
import BottomNav from './components/BottomNav';
import { Loading } from './components/Loading';
import ProfileInfo from './components/ProfileInfo';
import SignIn from './components/SignIn';
import TopNav from './components/TopNav';
import firebaseConfig from './firebaseConfig.json';
import Map from './pages/net/Map';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, 'picklbook');

const App: React.FC = () => {

  const [user, loading, error] = useAuthState(auth);
  const [userData, loadingData, errorData] = useDocumentData(doc(db, `users/${user?.uid}`));

  const [isApp, setApp] = React.useState(false);
  const [ycl, setYcl] = React.useState(false);

  useEffect(() => {
    setApp(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  useEffect(() => {
    if (!loading && !user ) {
      checkAuth(auth, setYcl);
    } else if (!loading && user) {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  }, [loading]);

  const paddingBottom = isApp ? '72px' : '56px';

  return (<>
    {ycl && <YouCanCloseThisPage />}
    {loading && <Loading {...{full: true}} />}
    {!loading && user && <>
      {!userData && !loadingData && <div>
        <ProfileInfo {...{user, auth, db}} />
      </div>}
      {userData && <div className="h-[calc(100vh+1px)] flex flex-col">
        <TopNav {...{isApp, user, auth}}/>
        {/* Other components can be added here */}
        <div className="h-full lg:pr-128 bg-[var(--background-color)]" style={{ paddingBottom }}>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/net" element={<Map />} />
            <Route path="/world" element={<Loading {...{full: false}} />} />
            <Route path="/groups" element={<Loading {...{full: false}} />} />
            <Route path="/profile" element={<Loading {...{full: false}} />} />
            <Route path="/settings" element={<Loading {...{full: false}} />} />
            <Route path="/help" element={<Loading {...{full: false}} />} />
          </Routes>
        </div>
        <BottomNav {...{isApp}}/>
      </div>}
    </>}

    {!loading && !user && <div className='h-screen flex justify-center items-center'>

      <SignIn {...{user, auth, db}} />

    </div>}
  </>);
};

export default App;

function setRandomShadeOfGreen() {
  const root = document.documentElement;
  const randomGreen = Math.floor(Math.random() * 256);
  root.style.setProperty('--primary-color', `rgb(0, ${randomGreen}, 0)`);
}

async function checkAuth(auth: any, setYcl: any) {
  const pathname = window.location.pathname.split('?')[0];

  if (pathname === '/authenticate') {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('sessionId');
    const secret = params.get('secret');

    if (sessionId && secret) {
      const response = await authenticate(sessionId, secret);
      if (response) {
        window.opener = null;
        window.open("", "_self");
        window.close();
        setYcl(true);
      }
    }
  }
  
}

function YouCanCloseThisPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
      <h1 className="text-[var(--primary-color)] text-2xl">You can close this page</h1>
      <p className="text-[var(--primary-color)]">You have successfully signed in</p>
    </div>
  );
}