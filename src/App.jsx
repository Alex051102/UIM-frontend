import React, { useState, useEffect } from 'react';
import AuthStart from './components/Auth/AuthStart/AuthStart';

function App() {
  const [auth, setAuth] = useState(false);

  const checkAuth = () => {
    const savedUserId = localStorage.getItem('lifeTrackerUserId');
    const isAuthenticated = !!savedUserId;

    if (isAuthenticated !== auth) {
      setAuth(isAuthenticated);
    }
  };

  useEffect(() => {
    checkAuth();

    const interval = setInterval(checkAuth, 500);

    const handleStorageChange = (event) => {
      if (event.key === 'lifeTrackerUserId') {
        checkAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [auth]);

  const removeUserFromStorage = () => {
    localStorage.removeItem('lifeTrackerUserId');
    setAuth(false);
  };

  return (
    <>
      <div style={{ maxWidth: '500px', overflow: 'visible' }} className="app">
        {auth ? (
          <>
            <button onClick={removeUserFromStorage}>выйти</button>
            <p>LK</p>
          </>
        ) : (
          <AuthStart onLoginSuccess={() => setAuth(true)} />
        )}
      </div>
    </>
  );
}

export default App;
