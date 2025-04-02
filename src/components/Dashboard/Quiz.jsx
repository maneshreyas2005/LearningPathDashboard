import React, { useState } from 'react';

export default function QuizComponent({ quiz, onComplete }) {
  const [answers, setAnswers] = useState([]);
  
  const calculateScore = () => {
    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    onComplete(score);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Topic Quiz</h2>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6">
          <p className="font-medium mb-3">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((option, oIndex) => (
              <label key={oIndex} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={oIndex}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => {
                    const newAnswers = [...answers];
                    newAnswers[qIndex] = oIndex;
                    setAnswers(newAnswers);
                  }}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={answers.length !== quiz.questions.length}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Submit Quiz
      </button>
    </div>
  );
}