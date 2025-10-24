import React, { useState } from 'react';
import QuestionaryItem from '../QuestionaryItem/QuestionaryItem';
import questionaryData from '../../../data/questionaryData';
import back from '../../../../public/images/backQuestionary.png';
import logo from '../../../../public/icons/logoGreen.svg';
import './QuestionaryStart.css';
export default function QuestionaryStart({ results, addInfo }) {
  const [questInd, setQuestInd] = useState(0);

  function numOfPage(num) {
    setQuestInd(num);
  }

  return (
    <>
      <div
        style={{
          background: `url(${back}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
        className="questionary">
        <div className="questionary__container">
          <div className="questionary__logo-block">
            <img className="questionary__logo" src={logo} alt="" />
          </div>
          <div className="questionary__nav">
            {[0, 1, 2, 3, 4].map((item) => (
              <div className="questionary__nav-item">
                <div
                  className={
                    questInd == item
                      ? 'questionary__nav-circle questionary__nav-circle--active'
                      : 'questionary__nav-circle'
                  }>
                  {questInd == item ? <div className="questionary__nav-mini-circle"></div> : ''}
                </div>
                {item != 4 ? <div className="questionary__nav-stick"></div> : ''}
              </div>
            ))}
          </div>
          <QuestionaryItem
            questInd={questInd}
            addInfo={addInfo}
            numOfPage={numOfPage}
            data={questionaryData[questInd]}
            results={results}
          />
        </div>
      </div>
    </>
  );
}
