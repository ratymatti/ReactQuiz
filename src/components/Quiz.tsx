import React, { useState } from 'react'
import QuizOverImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState<string[]>([])

    const activeQuestionIndex = userAnswers.length;

    const quizIsOver = activeQuestionIndex === QUESTIONS.length;
    
    if (quizIsOver) {
        return (
            <div id='summary'>
                <img src={QuizOverImg} alt='trophy icon' />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const suffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);

    function handleSelectAnswer(answer: string) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer];
        });
    }

    return (
        <div id="quiz">
            <div id='question'>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {suffledAnswers.map((answer) => (
                        <li key={answer} className='answer'>
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
