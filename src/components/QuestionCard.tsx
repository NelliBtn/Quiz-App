import React from 'react';

type Props = {
  question: string,
  answers: string[],
  callback: any,
  userAnswer: boolean,
  questionNumber: number,
  totalQuestions: number
}

// tell React it is a type of Functional Component, pass props in <>
const QuestionCard: React.FC<Props> = ({
  question, 
  answers, 
  callback, 
  userAnswer, 
  questionNumber, 
  totalQuestions
}) => (
  <div>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    <div>
      {answers.map(answer => (
        <div>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;