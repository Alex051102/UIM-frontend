import React from 'react';
import './Exercise.css';
export default function Exercise({ title, text, points }) {
  return (
    <>
      <div className="exercise-wrap">
        <div className="exercise">
          <div className="exercise__info">
            <p className="exercise__title">{title}</p>
            <p className="exercise__text">{text}</p>
          </div>
          <div className="exercise__points">
            <p className="exercise__points-text">{points} б</p>
          </div>
        </div>
      </div>
    </>
  );
}
