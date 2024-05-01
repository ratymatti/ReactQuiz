import React, { useState } from 'react'
import QuestionTimer from './QuestionTimer'
import Answers from './Answers'
import QUESTIONS from '../questions'

export enum AnswerState {
    Correct = 'correct',
    Wrong = 'wrong',
    Answered = 'answered',
    Unanswered = 'unanswered'
}

interface Answer {
    selectedAnswer: string | null;
    isCorrect: boolean | null;
}

interface QuestionProps {
    questionIndex: number;
    onSelectAnswer: (selectedAnswer: string) => void;
    onSkipAnswer: () => void;
}

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer}: QuestionProps) {
    const [answer, setAnswer] = useState<Answer>({
        selectedAnswer: null,
        isCorrect: false
    });

    function handleSelectAnswer(answer: string) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            const isCorrect = answer === QUESTIONS[questionIndex].answers[0];
            setAnswer({
                selectedAnswer: answer,
                isCorrect
            });
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState: AnswerState;

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? AnswerState.Correct : AnswerState.Wrong;
    } else if (answer.selectedAnswer) {
        answerState = AnswerState.Answered;
    } else {
        answerState = AnswerState.Unanswered;
    }


    return (
        <div id='question'>
            <QuestionTimer
                timeout={15000}
                onTimeout={answer.selectedAnswer === null ? onSkipAnswer : undefined}
                answerState={answerState}
            />
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <Answers
                answers={QUESTIONS[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}
