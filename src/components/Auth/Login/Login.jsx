import React, { useState } from 'react';
import login from '../../../services/api/login';
import back from '../../../../public/images/backAuth.png';
import next from '../../../../public/icons/authNext.svg';
import logo from '../../../../public/icons/logo.svg';
import './Login.css';
import showAlert from '../../../services/showAlert';
export default function Login({ pager }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function checkInfo() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) == false) {
      showAlert('Email введен некорректно');
      return;
    }
    if (email.length == 0 || password.length == 0) {
      showAlert('Поля не должны быть пустыми');
      return;
    }
    if (password.length < 6) {
      showAlert('Пароль должен состоять минимум из 6 символов');
      return;
    } else {
      login(email, password);
    }
  }
  return (
    <div
      style={{
        background: `url(${back}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
      className="login">
      <div className="login__container">
        <p className="login__text">MANY TASKS</p>
        <div className="login__main">
          <div className="login__main-content">
            <div className="login__main-content-container">
              <div className="login__main-content-nav">
                <div className="login__main-content-nav-img">
                  <img src={logo} alt="" />
                </div>
                <div className="login__main-content-nav-swape">
                  <p
                    onClick={() => pager('register')}
                    className="login__main-content-nav-swape-text">
                    Регистрация
                  </p>
                </div>
              </div>
              <div className="login__main-content-info">
                <div className="login__main-content-questions">
                  <h2 className="login__main-content-questions-title">Войти</h2>
                  <div className="login__main-content-input-block">
                    <div className="login__main-content-input-outer">
                      <div className="cirlce"></div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login__main-content-input"
                      />
                    </div>
                  </div>
                  <div className="login__main-content-input-block">
                    <div className="login__main-content-input-outer login__main-content-input-outer--forgot">
                      <div className="cirlce"></div>
                      <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login__main-content-input"
                      />
                      <div className="login__main-content-input-forgot">
                        <p className="login__main-content-input-forgot-text">Забыли?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="login__main-content-next">
                  <div className="login__main-content-next-text-block">
                    <p className="login__main-content-next-text">
                      Нажимая «Далее», вы подтверждаете, что ознакомились и принимаете условия
                      Пользовательского соглашения и Политики конфиденциальности, а также даёте
                      согласие на обработку ваших персональных данных.
                    </p>
                  </div>
                  <div className="login__main-content-next-button-block">
                    <img
                      onClick={checkInfo}
                      className="login__main-content-next-button"
                      src={next}
                      alt=""
                    />
                  </div>
                </div>
                <p className="login__main-content-details">Нажмите, чтобы узнать подробнее</p>
              </div>
              {/*    <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button onClick={() => login(email, password)}>{'Войти'}</button>

                <button>Войти</button>
              </div> */}
            </div>
          </div>
        </div>
        <p className="login__text">ONE SOLUTION</p>
      </div>
    </div>
  );
}
