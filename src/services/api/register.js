// Чистая функция для регистрации с данными опросника
const registerWithSurvey = async (surveyData) => {
  try {
    const registerInfo = surveyData.registerInfo || [];
    const [email, password, name] = registerInfo;

    if (!email || !password) {
      throw new Error('Email и пароль обязательны');
    }

    console.log('📤 Отправляем данные регистрации:', { email, name });

    const API_URL =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : 'https://uim-backend.vercel.app';

    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        surveyData,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Ошибка регистрации');
    }

    localStorage.setItem('lifeTrackerUserId', result.user.id);

    console.log('✅ Регистрация успешна:', result.user);
    return result;
  } catch (error) {
    console.error('💥 Ошибка регистрации:', error);
    throw error;
  }
};
export default registerWithSurvey;
