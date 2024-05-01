import React from 'react'
import QuizOverImg from '../assets/quiz-complete.png'
import { UserAnswer } from './Quiz';
import QUESTIONS from '../questions';

interface SummaryProps {
    userAnswers: UserAnswer[];
}

export default function Summary({ userAnswers }: SummaryProps) {
    const totalAnswers = userAnswers.length;

    const { correctAnswers, incorrectAnswers, skippedAnswers } = userAnswers.reduce((acc, userAnswer, index) => {
        if (userAnswer === QUESTIONS[index].answers[0]) {
            acc.correctAnswers++;
        } else if (userAnswer === null) {
            acc.skippedAnswers++;
        } else {
            acc.incorrectAnswers++;
        }
        return acc;
    }, { correctAnswers: 0, incorrectAnswers: 0, skippedAnswers: 0 });

    const correctAnswerPercentage = (correctAnswers / totalAnswers) * 100;
    const incorrectAnswersPercentage = (incorrectAnswers / totalAnswers) * 100;
    const skippedAnswersPercentage = (skippedAnswers / totalAnswers) * 100;

    return (
        <div id='summary'>
            <img src={QuizOverImg} alt='trophy icon' />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{correctAnswerPercentage.toFixed()}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className='number'>{incorrectAnswersPercentage.toFixed()}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
                <p>
                    <span className='number'>{skippedAnswersPercentage.toFixed()}%</span>
                    <span className="text">skipped</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((userAnswer, index) => {
                    let cssClasses: string = 'user-answer';

                    if (userAnswer === null) {
                        cssClasses += ' skipped';
                    } else if (userAnswer === QUESTIONS[index].answers[0]) {
                        cssClasses += ' correct';
                    } else {
                        cssClasses += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClasses}>{userAnswer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
