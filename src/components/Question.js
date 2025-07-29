import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeRemaining > 1) {
        setTimeRemaining((prev) => prev - 1);
      } else {
        setTimeRemaining(10); // Reset timer
        onAnswered(false);    // Time ran out
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={answer}>
            <button onClick={() => handleAnswer(index === question.correctIndex)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;