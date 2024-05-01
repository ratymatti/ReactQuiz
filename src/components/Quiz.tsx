import React, { useCallback, useState } from 'react'
import QuizOverImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions'
import Question from './Question';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([])

    const activeQuestionIndex = userAnswers.length;

    const quizIsOver = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);
    
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    
    if (quizIsOver) {
        return (
            <div id='summary'>
                <img src={QuizOverImg} alt='trophy icon' />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer} />    
        </div>
    )
}
