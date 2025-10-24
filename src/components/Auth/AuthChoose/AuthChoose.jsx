import React from 'react';
import logo from '../../../../public/icons/authChooseImg.svg';
import './AuthChoose.css';
export default function AuthChoose({ pager }) {
  return (
    <div className="auth-choose">
      <div className="auth-choose__container">
        <div className="auth-choose__logo-block">
          <div className="auth-choose__logo">
            <img src={logo} alt="" />
            <p className="auth-choose__logo-text">Uim. Tracker</p>
          </div>
        </div>
        <div className="auth-choose__buttons-block">
          <div className="auth-choose__buttons">
            <button onClick={() => pager('login')} className="auth-choose__button">
              Войти
            </button>
            <button
              onClick={() => pager('register')}
              className="auth-choose__button auth-choose__button--green">
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
