
import { shuffleArray } from "./utils";

// how data response object look like
export type Question = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string
}

// to have both correct and incorrect answers in one array to map through it
// use Question type and add new property of answers as array of strings (use & in TS)
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // first await to fetch data
  // second await to convert it to json
  const data = await (await fetch(endpoint)).json();
  console.log(data)
  return data.results.map((question: Question) => (
    {
    ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }
  ))
}