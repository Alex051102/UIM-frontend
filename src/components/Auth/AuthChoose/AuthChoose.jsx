import React from 'react';

export default function AuthChoose({ pager }) {
  return (
    <div>
      <button onClick={() => pager('login')}>login</button>
      <button onClick={() => pager('register')}>register</button>
    </div>
  );
}
