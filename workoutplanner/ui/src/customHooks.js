import { useState } from 'react';

export const useTwoNumberInputs = ({ initialMins, initialSecs }) => {

    const [minutes, setMinutes] = useState(initialMins)
    const [seconds, setSeconds] = useState(initialSecs)

    const total = (String(minutes) * 60) + String(seconds)

    return [
        minutes,
        e => setMinutes(e.target.value),
        seconds,
        e => setSeconds(e.target.value),
        total]
} 