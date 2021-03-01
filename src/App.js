import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import useInterval from './useInterval';
import './App.css';

function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const [note, setNote] = useState(
        new Pizzicato.Sound({
            source: 'wave',
            options: { type: 'sine', attack: 0.1, release: 0.5 },
        }),
    );
    const [sequence] = useState(() => {
        const s = [];
        for (let i = 0; i < 16; i++) {
            s.push(440 * 1.059463 ** i);
        }
        return s;
    });
    const [play, setPlay] = useState(false);

    useInterval(() => {
        if (play) {
            note.frequency = sequence[currentStep];
            note.play();
            setTimeout(() => {
                note.stop();
                let i = currentStep;
                if (i + 1 >= sequence.length) i = 0;
                else i++;
                setCurrentStep(i);
            }, 50);
        }
    }, 500);

    const togglePlay = () => {
        console.log(note);
        setPlay(!play);
    };

    const changeOption = (value, option) => {
        note.detached = true;
        setNote(
            new Pizzicato.Sound({
                source: 'wave',
                options: { ...note.options, [option]: value },
            }),
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                {currentStep}
                <input
                    type="number"
                    value={note.release}
                    onChange={(e) => changeOption(Number(e.target.value), 'release')}
                    step="0.1"
                    min="0.1"
                ></input>
                <select value={note.sourceNode.type} onChange={(e) => changeOption(e.target.value, 'type')}>
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                    <option value="sawtooth">Saw</option>
                </select>
                <button type="button" onClick={togglePlay}>
                    {play ? 'Pause' : 'Play'}
                </button>
            </header>
        </div>
    );
}

export default App;
