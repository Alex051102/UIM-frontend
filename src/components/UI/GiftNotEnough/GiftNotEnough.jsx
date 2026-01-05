import React from 'react';
import './GiftNotEnough.css';
export default function GiftNotEnough({ current, notEnough, setterGiftState }) {
  return (
    <>
      <div className="gift-not-enough-wrap">
        <div className="gift-not-enough">
          <div className="gift-not-enough__main">
            <p className="gift-not-enough__text-big">Не хватает {notEnough} баллов</p>
            <div className="gift-not-enough__balance">
              <p className="gift-not-enough__text">Баланс: {current} баллов</p>
            </div>
          </div>
          <div className="gift-not-enough__descr">
            <p className="gift-not-enough__descr-text">
              Недостаточно баллов для получения скидки. Накопите больше бонусов, чтобы
              воспользоваться предложением.
            </p>
          </div>

          <button onClick={() => setterGiftState('info')} className="gift-not-enough__button">
            Вернуться назад
          </button>
        </div>
      </div>
    </>
  );
}
