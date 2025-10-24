import showAlert from '../showAlert';

const login = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email и пароль обязательны');
    }

    console.log('🔐 Пытаемся войти:', email);

    const API_URL =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : 'https://uim-backend.vercel.app';

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

    if (!result.success) {
      showAlert('Ошибка входа');
      throw new Error(result.error || 'Ошибка входа');
    }

    localStorage.setItem('lifeTrackerUserId', result.user.id);

    console.log('✅ Вход успешен:', result.user);
    return result;
  } catch (error) {
    console.error('💥 Ошибка входа:', error);
    throw error;
  }
};

export default login;
