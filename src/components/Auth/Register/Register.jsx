import React, { useState } from 'react';
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://uim-backend.vercel.app';
export default function Register({ pager, addInfo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const removeUserFromStorage = () => {
    localStorage.removeItem('lifeTrackerUserId');
  };

  function toQuest() {
    addInfo('registerInfo', [email, password, name]);
    pager('questionary');
  }
  const handleLogout = () => {
    removeUserFromStorage();
  };
  return (
    <div>
      <div>
        <div>
          <button onClick={handleLogout}>выйти</button>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Имя (опционально)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <button onClick={toQuest}>{'к опроснику'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
