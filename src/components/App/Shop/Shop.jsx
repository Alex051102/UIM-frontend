import React, { useState } from 'react';
import info from '../../../assets/navInfo.svg';
import home from '../../../assets/navHome.svg';
import avatar from '../../../assets/avatar.png';
import arrowDown from '../../../assets/arrowDown.svg';
import arrowUp from '../../../assets/arrowUp.svg';
import rightArrow from '../../../assets/rightArrow.svg';
import './Shop.css';
import backPersonal from '../../../assets/backPersonal.png';
import backExercises from '../../../assets/backExercises.png';
import Exercise from '../../UI/Exercise/Exercise';
import Gift from '../../UI/Gift/Gift';
import gift1 from '../../../assets/gift1.png';
import gift2 from '../../../assets/gift2.png';
import gift3 from '../../../assets/gift3.png';
import gift4 from '../../../assets/gift4.png';
import backGifts from '../../../assets/backGifts.png';
export default function Points() {
  const exercises = [
    {
      title: 'Попади в топ 3 месяца',
      text: 'Попади в топ 3 месяца и получи доп.баллы на подарки ',
      points: 100,
    },
    {
      title: 'Веди трекер воды 15 дней',
      text: 'Заполняй трекер воды 15 дней подряд  ',
      points: 15,
    },
    {
      title: 'Веди все трекеры 1 месяц',
      text: 'Заполняй дневник питания, трекер финансов и трекер привычек 1 месяц каждый день',
      points: 790,
    },
    {
      title: 'Веди все трекеры 2 недели',
      text: 'Заполняй дневник питания, трекер финансов и трекер привычек 2 недели каждый день',
      points: 300,
    },
    {
      title: 'Веди трекер воды 30 дней',
      text: 'Заполняй трекер воды 30 дней подряд  ',
      points: 45,
    },
  ];
  const gifts = [
    {
      image: gift1,
      title: 'Скидка 70% на покупку',
      text: 'Промокод на скидку 70% в магазине IRNBY ',
      points: 1500,
    },
    {
      image: gift2,
      title: 'Бесплатное посещение SKY',
      text: 'Бесплатное посещение занятия в клубе SKY',
      points: 1500,
    },
    {
      image: gift3,
      title: 'Бесплатное посещение YOG',
      text: 'Бесплатное посещение занятия на любое направление',
      points: 1500,
    },
    {
      image: gift4,
      title: 'Скидка 25% на одежду бренда',
      text: 'Промокод на скидку 25% в магазине 12stories',
      points: 1500,
    },
  ];
  const [giftActive, setGiftActive] = useState(true);
  return (
    <>
      <div className="shop-wrap">
        <div className="shop">
          <div
            style={{ background: `url(${backPersonal}) center/cover no-repeat` }}
            className="shop__personal-wrap">
            <div className="shop__personal">
              <div className="shop__personal-up">
                <div className="shop__user">
                  <div className="shop__user-avatar-wrap">
                    <img className="shop__user-avatar" src={avatar} alt="" />
                  </div>
                  <div className="shop__user-info">
                    <p className="shop__text shop__text--black shop__text--bigger">Name Surname</p>
                    <p className="shop__text">Статус подписки : Pro</p>
                  </div>
                </div>
                <div className="shop__nav">
                  <div className="shop__nav-item">
                    <img className="shop__nav-item-img" src={info} alt="" />
                  </div>
                  <div className="shop__nav-item shop__nav-item--yellow">
                    <img className="shop__nav-item-img" src={home} alt="" />
                  </div>
                </div>
              </div>
              <div className="shop__personal-points">
                <p className="shop__text shop__text--black shop__text--largest">789 баллов</p>
                <p className="shop__text">Обменивай баллы на ценные подарки</p>
              </div>
              <div className="shop__personal-progress">
                <div className="BAR"></div>
                <p className="shop__text">Твой прогресс</p>
              </div>
              <div className="shop__personal-gift-button-wrap">
                <div
                  onClick={() => setGiftActive((c) => !c)}
                  className={
                    giftActive == false
                      ? 'shop__personal-gift-button'
                      : 'shop__personal-gift-button shop__personal-gift-button--active'
                  }>
                  <div
                    className={
                      giftActive == false
                        ? `shop__personal-gift-button-circle`
                        : 'shop__personal-gift-button-circle shop__personal-gift-button-circle--active'
                    }></div>
                  <p className="shop__text shop__text--black">Выбрать подарок</p>
                  <img
                    className="shop__personal-gift-button-arrow"
                    src={giftActive == false ? arrowDown : arrowUp}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ background: `url(${backExercises}) center/cover no-repeat` }}
            className="shop__exercises-wrap">
            {giftActive == false ? (
              <div className="shop__exercises">
                <div className="shop__exercises-nav">
                  <div className="shop__exercises-nav-text">
                    <p className="shop__text shop__text--white shop__text--largest">Задания</p>
                    <p className="shop__text">Выполняй задания и получай баллы</p>
                  </div>
                  <div className="shop__exercises-nav-next-wrap">
                    <div className="shop__exercises-nav-next">
                      <img className="shop__exercises-nav-next-arrow" src={rightArrow} alt="" />
                    </div>
                  </div>
                </div>
                <div className="shop__exercises-list">
                  {exercises.map((ex) => (
                    <Exercise title={ex.title} text={ex.text} points={ex.points}></Exercise>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{ background: `url(${backGifts}) center/cover no-repeat` }}
                className="shop__gifts-wrap">
                <div className="shop__gifts">
                  {gifts.map((g) => (
                    <Gift image={g.image} title={g.title} text={g.text} points={g.points}></Gift>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
