import React, { useState, useEffect } from 'react';
import './LoadingAuth.css';
import registerWithSurvey from '../../../services/api/register';
import logo from '../../../../public/icons/logoInAuthLoading.svg';
export default function LoadingAuth({ results }) {
  const [load, setLoad] = useState(0);
  const texts = ['Анализируем ответы', 'Считаем калории', 'Строим прогноз', 'Готовим профиль'];
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad((c) => {
        if (c > 34) {
          setStage(1);
        }
        if (c > 69) {
          setStage(2);
        }
        if (c > 89) {
          setStage(3);
        }
        if (c >= 100) {
          clearInterval(interval);
          registerWithSurvey(results);
          return 100;
        }
        return c + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-auth">
      <div className="loading-auth__container">
        <img src={logo} className="loading-auth__logo" />
        <div className="loading-auth__info">
          <div className="loading-auth__info-main">
            <h2 className="loading-auth__info-text--green">{load}%</h2>
            <h3 className="loading-auth__info-text--big">Составляем ваш план</h3>
          </div>

          <div className="loading-auth__info-stages">
            {texts.map((t, i) => (
              <p
                className={
                  i == stage
                    ? 'loading-auth__info-stage loading-auth__info-stage--active'
                    : 'loading-auth__info-stage'
                }>
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
