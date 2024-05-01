import React, { useRef } from 'react'
import { AnswerState } from './Quiz';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const suffledAnswers = useRef<string[]>();

    if (!suffledAnswers.current) {
        suffledAnswers.current = [...answers];
        suffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {answers.map((answer) => {
                const isSelected: boolean = answer === selectedAnswer;
                let cssClasses: string = '';

                if (answerState === AnswerState.Answered && isSelected) {
                    cssClasses = 'selected';
                }

                if ((answerState === AnswerState.Correct || answerState === AnswerState.Wrong) && isSelected) {
                    cssClasses = answerState;
                }

                return (
                    <li key={answer} className='answer'>
                        <button onClick={() => onSelect(answer)} className={cssClasses}>
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
