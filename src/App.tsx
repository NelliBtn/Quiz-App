import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
//Types
import { QuestionState, Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async() => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer value from Question card userAnswer btn
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject ])
    }
  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>Start game</button>
      ) : null}
      {!gameOver && <p className="score">Score: </p>}
      {loading && <p className="loading">Loading questions...</p>}
      {!loading && !gameOver &&      
        (<QuestionCard 
        questionNumber={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />)}
      {/* second from last condition -- only if user already gave an answer for current question */}
      {/* last condition -- only if it is not the last question */}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
      (<button className="next" onClick={nextQuestion}>Next question</button>)}
    </div>
  );
}

export default App;
