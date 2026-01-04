import React, { useEffect, useState } from 'react';
import './Home.css';
import avatar from '../../../assets/avatar.png';
import locked from '../../../assets/locked.svg';
import arrow from '../../../assets/foodArrow.svg';

import backFood from '../../../assets/backFood.png';
import backHelp from '../../../assets/backHelp.png';
import backInfo from '../../../assets/backInfo.png';
import backTop from '../../../assets/backTop.png';
import backMiddle from '../../../assets/backMiddle.png';
import { Link } from 'react-router-dom';
export default function Home() {
  const [isPro, setIsPro] = useState(false);
  const width = window.innerWidth;
  const [buttonNext, setButtonNext] = useState('two');
  useEffect(() => {
    if (width < 474) {
      setButtonNext('help');
    }
  }, []);

  console.log(buttonNext);
  return (
    <>
      <div className="home">
        <div className="home__info">
          <div
            style={{ background: `url(${backInfo}) center/cover no-repeat` }}
            className="home__info-stats-wrap">
            <div className="home__info-stats">
              <div className="home__info-stats-main">
                <div className="home__info-stats-main-item">
                  <p className="home__info-text">37 дней</p>
                  <p className="home__info-text home__info-text--small">подряд</p>
                </div>
                <div className="home__info-stats-main-item">
                  <div className="home__info-avatar-wrap">
                    <img className="home__info-avatar" src={avatar} alt="" />
                  </div>
                </div>
                <div className="home__info-stats-main-item">
                  <p className="home__info-text">3000</p>
                  <p className="home__info-text home__info-text--small">баллов</p>
                </div>
                <div className="home__info-stats-main-item home__info-stats-main-item--down">
                  <p className="home__info-text">Name Surname</p>
                  {isPro == false ? (
                    <p className="home__info-text home__info-text--small">Статус : Light</p>
                  ) : (
                    <p className="home__info-text home__info-text--small">
                      Статус : <span className="home__info-text--pro">Pro</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="home__info-buttons">
                <button
                  onClick={() => setIsPro((c) => !c)}
                  className="home__info-button home__info-button--progress">
                  Прогресс
                </button>
                <button className="home__info-button">Пригласить друга</button>
              </div>
            </div>
          </div>
          <div
            style={{ background: `url(${backMiddle}) center/cover no-repeat` }}
            className="home__info-progress-wrap">
            <div className="home__info-progress">
              <div className="home__info-progress-next">
                <div
                  onClick={() =>
                    buttonNext == 'help' ? setButtonNext('top') : setButtonNext('help')
                  }
                  className="home__info-progress-next-button">
                  next
                </div>
              </div>

              <div
                style={{ background: `url(${backHelp}) center/cover no-repeat` }}
                className={
                  buttonNext == 'top'
                    ? 'home__info-progress-help-wrap--none'
                    : 'home__info-progress-help-wrap'
                }>
                <div className="home__info-progress-help">
                  <div className="home__info-progress-user">
                    <div className="home__info-progress-user-avatar-wrap">
                      <img className="home__info-progress-user-avatar" src={avatar} alt="" />
                    </div>
                    <p className="home__info-progress-user-text home__info-progress-user-text--big">
                      Name Surname
                    </p>
                  </div>
                  {isPro == false ? (
                    <>
                      {' '}
                      <p className="home__info-progress-user-text">
                        Получай баллы за выполнение задач Вступай в комьюнити единомышленников
                        Узнавай больше о качественном образе жизни
                      </p>
                      <div className="home__info-progress-button-wrap">
                        <button className="home__info-progress-button">
                          Перейти на UIM.PRO 249 ₽/мес
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="home__info-progress-buttons-wrap">
                      <button className="home__info-progress-button home__info-progress-button--small">
                        UIM.COMMUNITY
                      </button>
                      <Link to='/shop'>
                       <button className="home__info-progress-button home__info-progress-button--small">
                        Обменять баллы
                      </button></Link>
                     
                      <div className="hh">
                        <button className="home__info-progress-button home__info-progress-button--small home__info-progress-button--center">
                          Задать вопрос UIM.mind
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={
                  buttonNext == 'help'
                    ? 'home__info-progress-top-wrap--none'
                    : '"home__info-progress-top-wrap"'
                }>
                {isPro == false ? (
                  <>
                    <div
                      style={{ background: `url(${backTop}) center/cover no-repeat` }}
                      className="home__info-progress-top-locked">
                      <div className="home__info-progress-top-locked-content">
                        <img className="home__info-progress-top-locked-img" src={locked} alt="" />
                        <div className="home__info-progress-top-locked-points-wrap">
                          <p className="home__info-progress-top-locked-points">3000 баллов</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{ background: `url(${backTop}) center/cover no-repeat` }}
                    className="home__info-progress-top-normal">
                    <div className="home__info-progress-top">
                      <div className="home__info-progress-top-info">
                        <div className="home__info-progress-top-logo-wrap">
                          <div className="home__info-progress-top-logo">
                            <p className="home__info-progress-top-logo-text">UIM pro</p>
                          </div>
                        </div>
                        <div className="home__info-progress-top-descr">
                          <h2 className="home__info-progress-top-descr-title">Прогресс</h2>
                          <p className="home__info-progress-top-descr-text">
                            Зарабатывай баллы, попадай в топ и получай подарки от UIM
                          </p>
                        </div>
                      </div>
                      <div className="home__info-progress-top-cards">
                        <div className="home__info-progress-top-card-wrap">
                          <div className="home__info-progress-top-card">
                            <div className="home__info-progress-top-card-person">
                              <div className="home__info-progress-top-card-person-avatar-wrap">
                                <img
                                  className="home__info-progress-top-card-person-avatar"
                                  src={avatar}
                                  alt=""
                                />
                              </div>

                              <div className="home__info-progress-top-card-person-text">
                                <p className="home__info-progress-top-card-person-name">
                                  Name Surname
                                </p>
                                <p className="home__info-progress-top-card-person-days">
                                  78 дней подряд
                                </p>
                              </div>
                            </div>
                            <p className="home__info-progress-top-card-points">799</p>
                          </div>
                        </div>
                        <div className="home__info-progress-top-card-wrap">
                          <div className="home__info-progress-top-card">
                            <div className="home__info-progress-top-card-person">
                              <div className="home__info-progress-top-card-person-avatar-wrap">
                                <img
                                  className="home__info-progress-top-card-person-avatar"
                                  src={avatar}
                                  alt=""
                                />
                              </div>

                              <div className="home__info-progress-top-card-person-text">
                                <p className="home__info-progress-top-card-person-name">
                                  Name Surname
                                </p>
                                <p className="home__info-progress-top-card-person-days">
                                  78 дней подряд
                                </p>
                              </div>
                            </div>
                            <p className="home__info-progress-top-card-points">799</p>
                          </div>
                        </div>

                        <div className="home__info-progress-top-card-wrap home__info-progress-top-card-wrap--current">
                          <div className="home__info-progress-top-card">
                            <div className="home__info-progress-top-card-person">
                              <div className="home__info-progress-top-card-person-avatar-wrap">
                                <img
                                  className="home__info-progress-top-card-person-avatar"
                                  src={avatar}
                                  alt=""
                                />
                              </div>

                              <div className="home__info-progress-top-card-person-text">
                                <p className="home__info-progress-top-card-person-name home__info-progress-top-card-person-name--current">
                                  Вы
                                  <span className="home__info-progress-top-card-person-name--rating">
                                    (16 место)
                                  </span>
                                </p>
                                <p className="home__info-progress-top-card-person-days home__info-progress-top-card-person-days--current">
                                  78 дней подряд
                                </p>
                              </div>
                            </div>
                            <p className="home__info-progress-top-card-points home__info-progress-top-card-points--current">
                              799
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{ background: `url(${backFood}) center/cover no-repeat` }}
            className="home__info-food-wrap">
            <div className="home__info-food">
              <div className="home__info-food-main">
                <p className="home__info-food-text">Состояние | питание</p>
                <p className="home__info-food-text home__info-food-text--big">
                  Отслеживай свое состояние на протяжении всего дня
                </p>
                <button className="home__info-food-button">
                  <p>Перейти к дневнику питания</p>
                  <img className="home__info-food-button-arrow" src={arrow} alt="" />
                </button>
              </div>
              <div className="home__info-food-analyz"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
