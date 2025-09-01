import { useCallback, useRef, useState } from "react"
import QUESTIONS from '../questions'
import Question from "./Question"
import Summary from "./Summary";

export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([])
    const activeQuestionIndex = userAnswer.length ;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length
      const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
    if (quizIsComplete) {
        return <Summary userAnswers={userAnswer} />
    }
    return <div id="quiz">
        <Question 
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer} />
    </div>
}