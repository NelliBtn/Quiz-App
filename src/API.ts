export enum Difficulty {
  EASY = 'easy,',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
) => {
  const endpoint = `http://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // first await to fetch data
  // second await to convert it to json
  const data = await (await fetch(endpoint)).json();
  console.log(data)
}