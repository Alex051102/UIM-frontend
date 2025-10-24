import React, { useEffect, useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AuthChoose from '../AuthChoose/AuthChoose';
import QuestionaryStart from '../../Questionary/QuestionaryStart/QuestionaryStart';

import LoadingAuth from '../../UI/LoadingAuth/LoadingAuth';
export default function AuthStart() {
  const [page, setPage] = useState('choose');

  function pager(page) {
    setPage(page);
  }
  const [results, setResults] = useState({});
  function addInfo(state, info) {
    setResults((prev) => ({
      ...prev,
      [state]: info,
    }));
  }
  useEffect(() => {
    const requiredFields = ['registerInfo', 'base', 'goals', 'activity', 'habits', 'ai_support'];
    const allFieldsFilled = requiredFields.every((field) => results[field]);

    if (allFieldsFilled) {
      console.log('✅ Все поля заполнены! Автоматически регистрируем...');
      setPage('loading');
      /*  registerWithSurvey(results); */
    }
  }, [results]);

  console.log(results);
  function renderPage() {
    if (page == 'loading') {
      return <LoadingAuth results={results}></LoadingAuth>;
    }
    if (page == 'login') {
      return <Login pager={pager}></Login>;
    }
    if (page == 'register') {
      return <Register addInfo={addInfo} pager={pager}></Register>;
    }
    if (page == 'choose') {
      return <AuthChoose pager={pager}></AuthChoose>;
    }
    if (page == 'questionary') {
      return <QuestionaryStart results={results} addInfo={addInfo}></QuestionaryStart>;
    }
  }

  return <div style={{ width: '100%' }}>{renderPage()}</div>;
}
