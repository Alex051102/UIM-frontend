import React from 'react';
import './GiftOpen.css';
export default function GiftOpen({ code, time, setterGiftState }) {
  return (
    <>
      <div className="gift-open-wrap">
        <div className="gift-open">
          <div className="gift-open__title">
            <p className="gift-open__title-text">Ваш промокод</p>
          </div>
          <div className="gift-open__main">
            <p className="gift-open__code">{code}</p>
            <p className="gift-open__time">Срок действия : {time}</p>
          </div>

          <button onClick={() => setterGiftState('info')} className="gift-not-enough__button">
            Вернуться назад
          </button>
        </div>
      </div>
    </>
  );
}
