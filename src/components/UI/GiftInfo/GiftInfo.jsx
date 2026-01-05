import React from 'react';
import exit from '../../../assets/exit.svg';
import './GiftInfo.css';
export default function GiftInfo({
  title,
  text,
  image,
  descr,
  points,
  isEnough,
  setterGiftState,
  exitGiftInfo,
}) {
  return (
    <>
      <div className="gift-info-wrap">
        <div className="gift-info">
          <div className="gift-info__exit-wrap">
            <img onClick={() => exitGiftInfo()} className="gift-info__exit" src={exit} alt="" />
          </div>
          <div className="gift-info__main-wrap">
            <div className="gift-info__main">
              <div className="gift-info__image-wrap">
                <img className="gift-info__image" src={image} alt="" />
              </div>

              <div className="gift-info__states">
                <p className="gift-info__title">{title}</p>
                <p className="gift-info__text">{text}</p>
                <div className="gift-info__points">
                  <p className="gift-info__points-text">{points} баллов</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gift-info__descr">
            <p className="gift-info__descr-text">{descr}</p>
          </div>

          <button
            onClick={() =>
              isEnough == false ? setterGiftState('notEnough') : setterGiftState('open')
            }
            className="gift-info__button">
            Получить промокод
          </button>
        </div>
      </div>
    </>
  );
}
