import React, { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => onTimeout(), timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => {
                return prevRemainingTime - 10;
            });
        }, 10);
    
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <progress id='question-time' max={timeout} value={remainingTime} />
    )
}