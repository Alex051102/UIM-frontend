import React, { useState, useEffect } from 'react';

const API_URL = 'https://uim-backend.vercel.app';

function App() {
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState('sleep');
  const [value, setValue] = useState('8');
  const [telegramUser, setTelegramUser] = useState(null);

  // Инициализация Telegram Web App
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Расширяем на весь экран
      tg.expand();

      // Получаем данные пользователя Telegram
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);

        // Автоматическая "регистрация" через Telegram
        const telegramId = `tg_${user.id}`;
        setUser({
          id: telegramId,
          email: `tg_${user.id}@telegram.org`,
          name: user.first_name || 'Telegram User',
        });
      }

      // Меняем цвет фона Telegram
      tg.setBackgroundColor('#2c2c2c');
    }
  }, []);

  const trackActivity = async () => {
    if (!user) return;

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
          source: 'telegram',
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Показываем уведомление в Telegram
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showPopup({
            title: '✅ Успех!',
            message: `Активность "${activity}" записана: ${value} часов`,
          });
        } else {
          alert(`✅ Записано: ${activity} - ${value} часов`);
        }
      }
    } catch (error) {
      alert(`❌ Ошибка: ${error.message}`);
    }
  };

  const getStats = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_URL}/api/stats/${user.id}`);
      const result = await response.json();

      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showPopup({
          title: '📊 Статистика',
          message: `У вас ${result.total_entries} записей`,
        });
      } else {
        alert(`📊 Статистика: ${result.total_entries} записей`);
      }
    } catch (error) {
      alert(`❌ Ошибка: ${error.message}`);
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
  };

  return (
    <div style={styles.container}>
      <h1>🧠 Life Tracker</h1>

      {telegramUser && (
        <div
          style={{
            marginBottom: '15px',
            padding: '10px',
            background: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
            borderRadius: '10px',
          }}>
          👋 Привет, {telegramUser.first_name}!
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Трекер активности</h3>

        <select value={activity} onChange={(e) => setActivity(e.target.value)} style={styles.input}>
          <option value="sleep">💤 Сон</option>
          <option value="work">💼 Работа</option>
          <option value="sport">🏃 Спорт</option>
          <option value="study">📚 Учеба</option>
          <option value="reading">📖 Чтение</option>
        </select>

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Часы"
          style={styles.input}
        />

        <button onClick={trackActivity} style={styles.button}>
          📝 Записать активность
        </button>

        <button
          onClick={getStats}
          style={{
            ...styles.button,
            background: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
            color: 'var(--tg-theme-text-color, #000000)',
          }}>
          📈 Моя статистика
        </button>
      </div>
    </div>
  );
}

export default App;
