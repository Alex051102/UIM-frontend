import React from 'react';
import './Gift.css';

export default function Gift({ image, title, text, points }) {
  return (
    <>
      <div className="gift">
        <div className="gift__main-wrap">
          <div className="gift__main">
            <img className="gift__image" src={image} alt="" />
            <div className="gift__descr">
              <p className="gift__title">{title}</p>
              <p className="gift__text">{text}</p>
            </div>
          </div>
        </div>
        <div className="gift__points-wrap">
          <div className="gift__points">
            <p className="gift__points-text">{points} б</p>
          </div>
        </div>
      </div>
    </>
  );
}
