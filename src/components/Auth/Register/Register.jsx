import React, { useState } from 'react';

import back from '../../../../public/images/backAuth.png';
import next from '../../../../public/icons/authNext.svg';
import logo from '../../../../public/icons/logo.svg';
import './Register.css';
import showAlert from '../../../services/showAlert';
export default function Register({ pager, addInfo }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetry, setPasswordRetry] = useState('');
  console.log(email.indexOf('@'));
  function checkInfo() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) == false) {
      showAlert('Email введен некорректно');
      return;
    }
    if (email.indexOf('@') < 6) {
      showAlert('Email слишком короткий');
      return;
    }
    if (
      email.length == 0 ||
      password.length == 0 ||
      passwordRetry.length == 0 ||
      name.length == 0
    ) {
      showAlert('Поля не должны быть пустыми');
      return;
    }
    if (password.length < 6) {
      showAlert('Пароль должен состоять минимум из 6 символов');
      return;
    }
    if (password != passwordRetry) {
      showAlert('Повторите пароль правильно');
      return;
    } else {
      addInfo('registerInfo', [email, name, password]);
      pager('questionary');
    }
  }
  return (
    <div
      style={{
        background: `url(${back}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
      className="register">
      <div className="register__container">
        <p className="register__text">MANY TASKS</p>
        <div className="register__main">
          <div className="register__main-content">
            <div className="register__main-content-container">
              <div className="register__main-content-nav">
                <div className="register__main-content-nav-img">
                  <img src={logo} alt="" />
                </div>
                <div className="register__main-content-nav-swape">
                  <p
                    onClick={() => pager('login')}
                    className="register__main-content-nav-swape-text">
                    Войти
                  </p>
                </div>
              </div>
              <div className="register__main-content-info">
                <div className="register__main-content-questions">
                  <h2 className="register__main-content-questions-title">Регистрация</h2>
                  <div className="register__main-content-input-block">
                    <div className="register__main-content-input-outer">
                      <div className="cirlce"></div>
                      <input
                        type="text"
                        placeholder="Ваше имя и фамилия"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register__main-content-input"
                      />
                    </div>
                  </div>
                  <div className="register__main-content-input-block">
                    <div className="register__main-content-input-outer">
                      <div className="cirlce"></div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register__main-content-input"
                      />
                    </div>
                  </div>

                  <div className="register__main-content-input-block">
                    <div className="register__main-content-input-outer">
                      <div className="cirlce"></div>
                      <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register__main-content-input"
                      />
                    </div>
                  </div>
                  <div className="register__main-content-input-block">
                    <div className="register__main-content-input-outer">
                      <div className="cirlce"></div>
                      <input
                        type="password"
                        placeholder="Повторите пароль"
                        value={passwordRetry}
                        onChange={(e) => setPasswordRetry(e.target.value)}
                        className="register__main-content-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="register__main-content-next">
                  <div className="register__main-content-next-text-block">
                    <p className="register__main-content-next-text">
                      Нажимая «Далее», вы подтверждаете, что ознакомились и принимаете условия
                      Пользовательского соглашения и Политики конфиденциальности, а также даёте
                      согласие на обработку ваших персональных данных.
                    </p>
                  </div>
                  <div className="register__main-content-next-button-block">
                    <img
                      onClick={checkInfo}
                      className="register__main-content-next-button"
                      src={next}
                      alt=""
                    />
                  </div>
                </div>
                <p className="register__main-content-details">Нажмите, чтобы узнать подробнее</p>
              </div>
            </div>
          </div>
        </div>
        <p className="register__text">ONE SOLUTION</p>
      </div>
    </div>
  );
}
