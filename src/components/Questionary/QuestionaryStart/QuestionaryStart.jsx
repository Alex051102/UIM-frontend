import React, { useState } from 'react';
import QuestionaryItem from '../QuestionaryItem/QuestionaryItem';
import questionaryData from '../../../data/questionaryData';
export default function QuestionaryStart({ results, addInfo }) {
  const [questInd, setQuestInd] = useState(0);

  function numOfPage(num) {
    setQuestInd(num);
  }

  return (
    <>
      <QuestionaryItem
        questInd={questInd}
        addInfo={addInfo}
        numOfPage={numOfPage}
        data={questionaryData[questInd]}
        results={results}
      />
    </>
  );
}
