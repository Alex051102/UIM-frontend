import React, { useState } from 'react';
import login from '../../../services/api/login';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <div>
        <div>
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

          {!isLogin && (
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Имя (опционально)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <button onClick={() => login(email, password)}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>

            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
