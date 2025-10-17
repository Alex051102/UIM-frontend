import React, { useState } from 'react';

const API_URL = 'https://uim-backend.vercel.app';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [activity, setActivity] = useState('sleep');
  const [value, setValue] = useState('8');
  const [user, setUser] = useState(null);

  // Состояния для регистрации/логина
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const testBackend = async () => {
    try {
      const response = await fetch(`${API_URL}/api/test`);
      const result = await response.json();
      setBackendMessage(`✅ Бекенд работает: ${result.message}`);
    } catch (error) {
      setBackendMessage(`❌ Ошибка бекенда: ${error.message}`);
    }
  };

  // Регистрация
  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      const result = await response.json();

      if (result.success) {
        alert('✅ Регистрация успешна! Теперь войдите.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setName('');
      } else {
        alert(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Ошибка: ${error.message}`);
    }
  };

  // Логин
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setUser(result.user);
        alert(`✅ Добро пожаловать, ${result.user.email}!`);
        setEmail('');
        setPassword('');
      } else {
        alert(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Ошибка: ${error.message}`);
    }
  };

  // Выход
  const handleLogout = () => {
    setUser(null);
    alert('👋 Вы вышли из системы');
  };

  const trackActivity = async () => {
    if (!user) {
      alert('⚠️ Сначала войдите в систему');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activity,
          value: parseInt(value),
          user_id: user.id,
        }),
      });
      const result = await response.json();

      if (result.success) {
        alert(`✅ Отправлено: ${activity} - ${value} часов\nОтвет: ${result.message}`);
      } else {
        alert(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Ошибка отправки: ${error.message}`);
    }
  };

  // Получить статистику
  const getStats = async () => {
    if (!user) {
      alert('⚠️ Сначала войдите в систему');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/stats/${user.id}`);
      const result = await response.json();
      alert(`📊 Ваша статистика: ${result.total_entries} записей`);
    } catch (error) {
      alert(`❌ Ошибка загрузки статистики: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧠 Life Tracker</h1>

      {/* Тест бекенда */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testBackend} style={{ padding: '10px', margin: '5px' }}>
          Тест бекенда
        </button>
        <div>{backendMessage}</div>
      </div>

      {/* Блок авторизации */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
        }}>
        <h3>{user ? `👤 ${user.email}` : '🔐 Авторизация'}</h3>

        {user ? (
          <div>
            <p>✅ Вы вошли как: {user.email}</p>
            <button onClick={handleLogout} style={{ padding: '8px 15px', margin: '5px' }}>
              Выйти
            </button>
            <button onClick={getStats} style={{ padding: '8px 15px', margin: '5px' }}>
              📊 Моя статистика
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '8px', margin: '5px', width: '200px' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '8px', margin: '5px', width: '200px' }}
              />
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Имя (опционально)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: '8px', margin: '5px', width: '200px' }}
                />
              </div>
            )}

            <div>
              <button
                onClick={isLogin ? handleLogin : handleRegister}
                style={{ padding: '10px 15px', margin: '5px' }}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </button>

              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{ padding: '8px 12px', margin: '5px', background: 'transparent' }}>
                {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Трекер активности */}
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>📊 Трекер активности {user && '✅'}</h3>

        <div style={{ marginBottom: '10px' }}>
          <label>Активность: </label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="sleep">Сон</option>
            <option value="work">Работа</option>
            <option value="sport">Спорт</option>
            <option value="study">Учеба</option>
            <option value="reading">Чтение</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Часы: </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '60px' }}
          />
        </div>

        <button onClick={trackActivity} style={{ padding: '10px 15px' }} disabled={!user}>
          {user ? '📝 Записать активность' : '⚠️ Сначала войдите'}
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        ⚠️ Не забудь заменить API_URL в коде на свой бекенд URL
      </div>
    </div>
  );
}

export default App;
