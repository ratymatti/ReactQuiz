import React, { useCallback, useState } from 'react'
import QuizOverImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions'
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

export enum AnswerState {
    Correct = 'correct',
    Wrong = 'wrong',
    Answered = 'answered',
    Unanswered = 'unanswered'
}

export default function Quiz() {
    const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.Unanswered)
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([])

    const activeQuestionIndex = answerState === AnswerState.Unanswered ? userAnswers.length : userAnswers.length - 1;

    const quizIsOver = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
        setAnswerState(AnswerState.Answered);
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
        
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState(AnswerState.Correct);
            } else {
                setAnswerState(AnswerState.Wrong);
            }
            setTimeout(() => {
                setAnswerState(AnswerState.Unanswered);
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);
    
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
            <div id='question'>
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={15000}
                    onTimeout={handleSkipAnswer}
                    answerState={answerState} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    answerState={answerState}
                    onSelect={handleSelectAnswer} />
            </div>
        </div>
    )
}
