
// shuffle the array of answers so that the correct answer is not always on the same place
export const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
}