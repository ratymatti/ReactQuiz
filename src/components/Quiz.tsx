import React, { useCallback, useState } from 'react'
import QUESTIONS from '../questions'
import Question from './Question';
import Summary from './Summary';

export type UserAnswer = string | null;

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

    const activeQuestionIndex = userAnswers.length;

    const quizIsOver = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);
    
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    
    if (quizIsOver) {
        return <Summary userAnswers={userAnswers} />
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
