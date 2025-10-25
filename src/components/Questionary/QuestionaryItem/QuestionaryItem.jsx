import React, { useState } from 'react';
import butt from '../../../../public/icons/questionButtonNext.svg';
import './QuestionaryItem.css';
import showAlert from '../../../services/showAlert';
export default function QuestionaryItem({ questInd, addInfo, numOfPage, data }) {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('мужской');
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [checkboxInputWrite, setCheckboxInputWrite] = useState('');
  const handleCheckboxChange = (itemz) => {
    setCheckedItems((prev) => {
      if (!checkedItems.includes(itemz) && checkedItems.length < 3) {
        return [...prev, itemz];
      } else {
        return prev.filter((item) => item !== itemz);
      }
    });
  };

  const handleRadioChange = (t) => {
    setSelectedRadio(t);
  };

  function nextQuest() {
    if (data.type === 'baseInfo') {
      if (age.length == 0 || height.length == 0 || weight.length == 0) {
        showAlert('Все поля должны быть заполнены');
        return;
      } else {
        addInfo(data.infoType, [age, height, weight, gender]);
      }
    } else if (data.type === 'manyAnswers') {
      if (checkedItems.length == 0 && checkboxInputWrite.length == 0) {
        showAlert('Выберите хотя бы один из пунктов');
        return;
      } else {
        if (checkboxInputWrite.length > 0) {
          handleCheckboxChange(checkboxInputWrite);
          addInfo(data.infoType, [...checkedItems, checkboxInputWrite]);
        } else {
          addInfo(data.infoType, checkedItems);
        }
      }
    } else if (data.type === 'oneAnswer') {
      if (selectedRadio.length == 0) {
        showAlert('Выберите один из пунктов');
        return;
      } else {
        addInfo(data.infoType, selectedRadio);
      }
    }

    if (questInd === 4) {
      setCheckedItems([]);
      setSelectedRadio('');
    } else {
      if (
        data.type === 'baseInfo' &&
        (age.length == 0 || height.length == 0 || weight.length == 0)
      ) {
        showAlert('Все поля должны быть заполнены');
        return;
      } else {
        numOfPage(questInd + 1);
        setCheckedItems([]);
        setSelectedRadio('');
      }
    }
  }

  return (
    <div>
      {data.type === 'baseInfo' ? (
        <>
          <div className="questionary-item">
            <div className="questionary-item__container">
              <div className="questionary-item__nav">
                <div className="questionary-item__tag">
                  <p className="questionary-item__tag-text">{data.tag}</p>
                </div>
                <div className="questionary-item__nav-button">
                  {/* <p
                    onClick={() => numOfPage(questInd - 1)}
                    className="questionary-item__nav-button-text">
                    Назад
                  </p> */}
                </div>
              </div>
              <div className="questionary-item__questions">
                <p className="questionary-item__title">{data.title}</p>
                <div className="questionary-item__question">
                  <input
                    className="questionary-item__question-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Сколько вам лет?"
                    type="text"
                  />
                </div>
                <div className="questionary-item__question">
                  <input
                    className="questionary-item__question-input"
                    value={height}
                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Ваш рост"
                    type="text"
                  />
                </div>
                <div className="questionary-item__question">
                  <input
                    className="questionary-item__question-input"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Ваш вес"
                    type="text"
                  />
                </div>
                <div className="questionary-item__question">
                  <div className="questionary-item__question-container">
                    <p className="questionary-item__question-name">Ваш пол</p>
                    <div className="questionary-item__question-buttons">
                      <button
                        onClick={() => setGender('мужской')}
                        className="questionary-item__question-button"
                        style={{ backgroundColor: gender === 'мужской' ? '#F5FF82' : 'black' }}>
                        <p
                          className={
                            gender === 'мужской'
                              ? 'questionary-item__question-button-text questionary-item__question-button-text--active'
                              : 'questionary-item__question-button-text'
                          }>
                          Мужской{' '}
                        </p>
                      </button>
                      <button
                        onClick={() => setGender('женский')}
                        className="questionary-item__question-button"
                        style={{ backgroundColor: gender === 'женский' ? '#F5FF82' : 'black' }}>
                        <p
                          className={
                            gender === 'женский'
                              ? 'questionary-item__question-button-text questionary-item__question-button-text--active'
                              : 'questionary-item__question-button-text'
                          }>
                          Женский{' '}
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="questionary-item__questions-button-block">
                <button onClick={nextQuest} className="questionary-item__questions-button">
                  <p className="questionary-item__questions-button-text">{data.buttonText}</p>
                  <img className="questionary-item__questions-button-img" src={butt} alt="" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : data.type === 'manyAnswers' ? (
        <>
          <div className="questionary-item">
            <div
              className={
                data.infoType == 'habits'
                  ? 'questionary-item__container questionary-item__container--gap-min'
                  : 'questionary-item__container'
              }>
              <div className="questionary-item__nav">
                <div className="questionary-item__tag">
                  <p className="questionary-item__tag-text">{data.tag}</p>
                </div>
                <div className="questionary-item__nav-button">
                  <p
                    onClick={() => numOfPage(questInd - 1)}
                    className="questionary-item__nav-button-text">
                    Назад
                  </p>
                </div>
              </div>
              <div className="questionary-item__answers">
                <p className="questionary-item__title">{data.title}</p>
                {data.answers.map((t, i) => (
                  <div
                    onClick={() => handleCheckboxChange(t)}
                    className={
                      checkedItems.includes(t)
                        ? 'questionary-item__answer questionary-item__answer--active'
                        : 'questionary-item__answer'
                    }
                    key={i}>
                    <input
                      value={t}
                      id={`checkbox-${i}`}
                      name="checkbox-group"
                      type="checkbox"
                      checked={checkedItems.includes(t)}
                      className="questionary-item__answer-input"
                    />
                    <p
                      className={
                        checkedItems.includes(t)
                          ? 'questionary-item__answer-text questionary-item__answer-text--active'
                          : 'questionary-item__answer-text'
                      }>
                      {t}
                    </p>
                  </div>
                ))}
                {data.infoType == 'habits' && (
                  <div className={'questionary-item__answer'}>
                    <input
                      onChange={(e) => setCheckboxInputWrite(e.target.value)}
                      placeholder="Свой вариант (впишите)"
                      className="questionary-item__answer-input-write"
                      type="text"
                    />
                  </div>
                )}
              </div>
              <div className="questionary-item__questions-button-block">
                <button onClick={nextQuest} className="questionary-item__questions-button">
                  <p className="questionary-item__questions-button-text">{data.buttonText}</p>
                  <img className="questionary-item__questions-button-img" src={butt} alt="" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="questionary-item">
            <div className="questionary-item__container">
              <div className="questionary-item__nav">
                <div className="questionary-item__tag">
                  <p className="questionary-item__tag-text">{data.tag}</p>
                </div>
                <div className="questionary-item__nav-button">
                  <p
                    onClick={() => numOfPage(questInd - 1)}
                    className="questionary-item__nav-button-text">
                    Назад
                  </p>
                </div>
              </div>
              <div className="questionary-item__answers">
                <p className="questionary-item__title">{data.title}</p>
                {data.answers.map((t, i) => (
                  <div
                    onClick={() => handleRadioChange(t.main)}
                    className={
                      selectedRadio == t.main
                        ? 'questionary-item__answer questionary-item__answer--row questionary-item__answer--active'
                        : 'questionary-item__answer questionary-item__answer--row '
                    }
                    key={i}>
                    <p
                      className={
                        selectedRadio == t.main
                          ? 'questionary-item__answer-text questionary-item__answer-text--active'
                          : 'questionary-item__answer-text'
                      }>
                      {t.main}
                    </p>
                    <p
                      className={
                        selectedRadio == t.main
                          ? 'questionary-item__answer-text questionary-item__answer-text--mini questionary-item__answer-text--active'
                          : 'questionary-item__answer-text questionary-item__answer-text--mini'
                      }>
                      {t.details}
                    </p>
                  </div>
                ))}
              </div>
              <div className="questionary-item__questions-button-block">
                <button onClick={nextQuest} className="questionary-item__questions-button">
                  <p className="questionary-item__questions-button-text">{data.buttonText}</p>
                  <img className="questionary-item__questions-button-img" src={butt} alt="" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
