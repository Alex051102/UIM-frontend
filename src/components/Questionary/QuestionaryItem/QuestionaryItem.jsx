import React, { useState } from 'react';

export default function QuestionaryItem({ questInd, addInfo, numOfPage, data }) {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('мужской');
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setCheckedItems((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  function nextQuest() {
    console.log(`📋 Сохраняем данные для: ${data.infoType}`, {
      selectedRadio,
      checkedItems,
      age,
      height,
      weight,
      gender,
    });

    if (data.type === 'baseInfo') {
      addInfo(data.infoType, [age, height, weight, gender]);
    } else if (data.type === 'manyAnswers') {
      addInfo(data.infoType, checkedItems);
    } else if (data.type === 'oneAnswer') {
      addInfo(data.infoType, selectedRadio);
    }

    if (questInd === 4) {
      setCheckedItems([]);
      setSelectedRadio('');
    } else {
      numOfPage(questInd + 1);
      setCheckedItems([]);
      setSelectedRadio('');
    }
  }

  return (
    <div>
      <h2>{data.title}</h2>
      <span>{data.tag}</span>

      {data.type === 'baseInfo' ? (
        <>
          <div className="questionary-item">
            <div className="questionary-item__question">
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Сколько вам лет?"
                type="text"
              />
            </div>
            <div className="questionary-item__question">
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ваш рост"
                type="text"
              />
            </div>
            <div className="questionary-item__question">
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ваш вес"
                type="text"
              />
            </div>
            <div className="questionary-item__question">
              <p>Ваш пол</p>
              <button
                onClick={() => setGender('мужской')}
                style={{ backgroundColor: gender === 'мужской' ? '#007bff' : '#ccc' }}>
                мужской
              </button>
              <button
                onClick={() => setGender('женский')}
                style={{ backgroundColor: gender === 'женский' ? '#007bff' : '#ccc' }}>
                женский
              </button>
            </div>
          </div>
          <button onClick={nextQuest}>{data.buttonText}</button>
        </>
      ) : data.type === 'manyAnswers' ? (
        <>
          <div className="questionary-item">
            {data.answers.map((t, i) => (
              <div key={i}>
                {' '}
                <input
                  value={t}
                  onChange={handleCheckboxChange}
                  id={`checkbox-${i}`}
                  name="checkbox-group"
                  type="checkbox"
                  checked={checkedItems.includes(t)}
                />
                <label htmlFor={`checkbox-${i}`}>{t}</label>
              </div>
            ))}
          </div>
          <button onClick={nextQuest}>{data.buttonText}</button>
        </>
      ) : (
        <>
          <div className="questionary-item">
            {data.answers.map((t, i) => (
              <div key={i}>
                {' '}
                <input
                  value={t}
                  onChange={handleRadioChange}
                  id={`radio-${i}`}
                  name="radio-group"
                  type="radio"
                  checked={selectedRadio === t}
                />
                <label htmlFor={`radio-${i}`}>{t}</label>
              </div>
            ))}
          </div>
          <button onClick={nextQuest}>{data.buttonText}</button>
        </>
      )}
    </div>
  );
}
