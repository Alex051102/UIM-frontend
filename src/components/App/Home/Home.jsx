import React, { useState } from 'react';
import './Home.css';
import avatar from '../../../assets/avatar.png';
import locked from '../../../assets/locked.svg';
export default function Home() {
  const [isPro, setIsPro] = useState(false);
  return (
    <>
      homee
      <div className="home">
        <div className="home__info">
          <div className="home__info-stats-wrap">
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
                  <p className="home__info-text home__info-text--small">Статус : Light</p>
                </div>
              </div>
              <div className="home__info-buttons">
                <button className="home__info-button home__info-button--progress">Прогресс</button>
                <button className="home__info-button">Пригласить друга</button>
              </div>
            </div>
          </div>
          <div className="home__info-progress-wrap">
            <div className="home__info-progress">
              <div className="home__info-progress-help-wrap">
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
                        <button className="home__info-progress-button home__info-progress-button--big">
                          Перейти на UIM.PRO 249 ₽/мес
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="home__info-progress-buttons-wrap">
                      <button className="home__info-progress-button">UIM.COMMUNITY</button>
                      <button className="home__info-progress-button">Обменять баллы</button>
                      <button className="home__info-progress-button">Задать вопрос UIM.mind</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="home__info-progress-top-wrap">
                {isPro == false ? (
                  <>
                    <div className="home__info-progress-top-locked">
                      <div className="home__info-progress-top-locked-content">
                        <img className="home__info-progress-top-locked-img" src={locked} alt="" />
                        <div className="home__info-progress-top-locked-points-wrap">
                          <p className="home__info-progress-top-locked-points">3000 баллов</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
