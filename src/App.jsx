import React, { useState } from 'react';

const API_URL = 'https://твой-бекенд.vercel.app';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [activity, setActivity] = useState('sleep');
  const [value, setValue] = useState('8');

  const testBackend = async () => {
    try {
      const response = await fetch(`${API_URL}/api/test`);
      const result = await response.json();
      setBackendMessage(`✅ Бекенд работает: ${result.message}`);
    } catch (error) {
      setBackendMessage(`❌ Ошибка бекенда: ${error.message}`);
    }
  };

  const trackActivity = async () => {
    try {
      const response = await fetch(`${API_URL}/api/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activity,
          value: parseInt(value),
        }),
      });
      const result = await response.json();
      alert(`✅ Отправлено: ${activity} - ${value} часов\nОтвет: ${result.message}`);
    } catch (error) {
      alert(`❌ Ошибка отправки: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧠 Life Tracker Test</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={testBackend} style={{ padding: '10px', margin: '5px' }}>
          Тест бекенда
        </button>
        <div>{backendMessage}</div>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>📊 Трекер активности</h3>

        <div style={{ marginBottom: '10px' }}>
          <label>Активность: </label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="sleep">Сон</option>
            <option value="work">Работа</option>
            <option value="sport">Спорт</option>
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

        <button onClick={trackActivity} style={{ padding: '10px 15px' }}>
          📝 Записать активность
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        ⚠️ Не забудь заменить API_URL в коде на свой бекенд URL
      </div>
    </div>
  );
}

export default App;
