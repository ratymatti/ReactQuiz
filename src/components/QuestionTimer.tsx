import React, { useEffect, useState } from 'react'
import { AnswerState } from './Quiz';

export default function QuestionTimer({ timeout, onTimeout, answerState }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => onTimeout(), timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);
    
    useEffect(() => {
        if (answerState !== AnswerState.Unanswered) return;
        
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => {
                return prevRemainingTime - 10;
            });
        }, 10);
    
        return () => {
            clearInterval(interval);
        };
    }, [answerState]);


    return (
        <progress id='question-time' max={timeout} value={remainingTime} />
    )
}
