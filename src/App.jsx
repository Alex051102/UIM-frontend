import React, { useState, useEffect } from 'react';

// Автоматическое определение API_URL для localhost и Vercel
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://uim-backend.vercel.app';

function App() {
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState('sleep');
  const [value, setValue] = useState('8');
  const [telegramUser, setTelegramUser] = useState(null);

  // Состояния для регистрации/логина
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  // ✅ ДОБАВЛЯЕМ LOCALSTORAGE ДЛЯ СОХРАНЕНИЯ
  useEffect(() => {
    // Проверяем сохраненного пользователя при загрузке
    const savedUser = localStorage.getItem('lifeTrackerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Инициализация Telegram Web App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);
        // Автозаполнение email для Telegram пользователя
        setEmail(`tg_${user.id}@telegram.org`);
        setName(user.first_name || '');
      }
    }
  }, []);

  // Функция для сохранения пользователя
  const saveUserToStorage = (userData) => {
    localStorage.setItem('lifeTrackerUser', JSON.stringify(userData));
    setUser(userData);
  };

  // Функция для удаления пользователя
  const removeUserFromStorage = () => {
    localStorage.removeItem('lifeTrackerUser');
    setUser(null);
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
        // ✅ СОХРАНЯЕМ ПОЛЬЗОВАТЕЛЯ В LOCALSTORAGE
        saveUserToStorage(result.user);
        showTelegramAlert('✅ Регистрация успешна!');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setName('');
      } else {
        showTelegramAlert(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      showTelegramAlert(`❌ Ошибка: ${error.message}`);
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
        // ✅ СОХРАНЯЕМ ПОЛЬЗОВАТЕЛЯ В LOCALSTORAGE
        saveUserToStorage(result.user);
        showTelegramAlert(`✅ Добро пожаловать, ${result.user.email}!`);
        setEmail('');
        setPassword('');
      } else {
        showTelegramAlert(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      showTelegramAlert(`❌ Ошибка: ${error.message}`);
    }
  };

  // Выход
  const handleLogout = () => {
    // ✅ УДАЛЯЕМ ПОЛЬЗОВАТЕЛЯ ИЗ LOCALSTORAGE
    removeUserFromStorage();
    showTelegramAlert('👋 Вы вышли из системы');
  };

  const trackActivity = async () => {
    if (!user) {
      showTelegramAlert('⚠️ Сначала войдите в систему');
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
        showTelegramAlert(`✅ Отправлено: ${activity} - ${value} часов`);
      } else {
        showTelegramAlert(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      showTelegramAlert(`❌ Ошибка отправки: ${error.message}`);
    }
  };

  // Получить статистику
  const getStats = async () => {
    if (!user) {
      showTelegramAlert('⚠️ Сначала войдите в систему');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/stats/${user.id}`);
      const result = await response.json();
      showTelegramAlert(`📊 Ваша статистика: ${result.total_entries} записей`);
    } catch (error) {
      showTelegramAlert(`❌ Ошибка загрузки статистики: ${error.message}`);
    }
  };

  // Универсальное уведомление для Telegram и браузера
  const showTelegramAlert = (message) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showPopup({
        title: 'Life Tracker',
        message: message,
      });
    } else {
      alert(message);
    }
  };

  // Стили для Telegram Mini App
  const styles = {
    container: {
      padding: '15px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      background: 'var(--tg-theme-bg-color, #ffffff)',
      color: 'var(--tg-theme-text-color, #000000)',
      minHeight: '100vh',
    },
    button: {
      padding: '12px 16px',
      background: 'var(--tg-theme-button-color, #2481cc)',
      color: 'var(--tg-theme-button-text-color, #ffffff)',
      border: 'none',
      borderRadius: '10px',
      margin: '5px',
      width: '100%',
      fontSize: '16px',
    },
    input: {
      padding: '12px',
      border: '1px solid var(--tg-theme-hint-color, #999999)',
      borderRadius: '10px',
      margin: '5px 0',
      width: '100%',
      background: 'var(--tg-theme-bg-color, #ffffff)',
      color: 'var(--tg-theme-text-color, #000000)',
    },
    section: {
      border: '1px solid var(--tg-theme-section-border-color, #e0e0e0)',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '15px',
    },
  };

  return (
    <div style={styles.container}>
      <h1>🧠 Life Tracker</h1>

      {telegramUser && (
        <div
          style={{ ...styles.section, background: 'var(--tg-theme-secondary-bg-color, #f0f0f0)' }}>
          👋 Привет, {telegramUser.first_name}!
        </div>
      )}

      {/* Блок авторизации */}
      <div style={styles.section}>
        <h3>{user ? `👤 ${user.email}` : '🔐 Авторизация'}</h3>

        {user ? (
          <div>
            <p>✅ Вы вошли как: {user.email}</p>
            <button
              onClick={handleLogout}
              style={{
                ...styles.button,
                background: 'var(--tg-theme-destructive-text-color, #ff3b30)',
              }}>
              Выйти
            </button>
            <button
              onClick={getStats}
              style={{
                ...styles.button,
                background: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
                color: 'var(--tg-theme-text-color, #000000)',
              }}>
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
                style={styles.input}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Имя (опционально)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              </div>
            )}

            <div>
              <button onClick={isLogin ? handleLogin : handleRegister} style={styles.button}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </button>

              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  ...styles.button,
                  background: 'transparent',
                  color: 'var(--tg-theme-link-color, #2481cc)',
                }}>
                {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Трекер активности */}
      {user && (
        <div style={styles.section}>
          <h3>📊 Трекер активности</h3>

          <div style={{ marginBottom: '10px' }}>
            <label>Активность: </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={styles.input}>
              <option value="sleep">💤 Сон</option>
              <option value="work">💼 Работа</option>
              <option value="sport">🏃 Спорт</option>
              <option value="study">📚 Учеба</option>
              <option value="reading">📖 Чтение</option>
            </select>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Часы: </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={trackActivity} style={styles.button}>
            📝 Записать активность
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
