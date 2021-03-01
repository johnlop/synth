import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import useInterval from './useInterval';
import './App.css';

function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const [sound, setSound] = useState(
        new Pizzicato.Sound({
            source: 'wave',
            options: { type: 'sine', attack: 0.1, release: 0.5 },
        }),
    );
    const notes = [
        {
            name: 'C',
            frequency: 261.63,
        },
        {
            name: 'C#',
            frequency: 277.18,
        },
        {
            name: 'D',
            frequency: 293.66,
        },
        {
            name: 'D#',
            frequency: 311.13,
        },
        {
            name: 'E',
            frequency: 329.63,
        },
        {
            name: 'F',
            frequency: 349.23,
        },
        {
            name: 'F#',
            frequency: 369.99,
        },
        {
            name: 'G',
            frequency: 392.0,
        },
        {
            name: 'G#',
            frequency: 415.3,
        },
        {
            name: 'A',
            frequency: 440.0,
        },
        {
            name: 'A#',
            frequency: 466.16,
        },
        {
            name: 'B',
            frequency: 493.88,
        },
    ];
    const octaves = [
        {
            name: 0,
            multiplier: 0.0625,
        },
        {
            name: 1,
            multiplier: 0.125,
        },
        {
            name: 2,
            multiplier: 0.25,
        },
        {
            name: 3,
            multiplier: 0.5,
        },
        {
            name: 4,
            multiplier: 1,
        },
        {
            name: 5,
            multiplier: 2,
        },
        {
            name: 6,
            multiplier: 4,
        },
        {
            name: 7,
            multiplier: 8,
        },
        {
            name: 8,
            multiplier: 16,
        },
    ];
    const [sequence] = useState(() => {
        const s = [];
        for (let i = 0; i < 16; i++) {
            s.push(notes[Math.floor(Math.random() * 12)]);
        }
        return s;
    });
    const [play, setPlay] = useState(false);
    const [octave, setOctave] = useState(1);

    useInterval(() => {
        if (play) {
            sound.frequency = sequence[currentStep].frequency * octave;
            sound.play();
            setTimeout(() => {
                sound.stop();
                let i = currentStep;
                if (i + 1 >= sequence.length) i = 0;
                else i++;
                setCurrentStep(i);
            }, 50);
        }
    }, 500);

    const togglePlay = () => {
        setPlay(!play);
    };

    const changeOption = (value, option) => {
        sound.detached = true;
        setSound(
            new Pizzicato.Sound({
                source: 'wave',
                options: { ...sound.options, [option]: value },
            }),
        );
    };

    const changeOctave = (event) => {
        setOctave(Number(event.target.value));
    };

    return (
        <div className="App">
            <header className="App-header">
                <select value={octave} onChange={changeOctave}>
                    {octaves.map((o) => (
                        <option value={o.multiplier}>Octave {o.name}</option>
                    ))}
                </select>
                {sequence.map((s) => (
                    <select value={s.frequency}>
                        {notes.map((n) => (
                            <option value={n.frequency}>{n.name}</option>
                        ))}
                    </select>
                ))}
                {currentStep}
                <input
                    type="number"
                    value={sound.release}
                    onChange={(e) => changeOption(Number(e.target.value), 'release')}
                    step="0.1"
                    min="0.1"
                ></input>
                <select value={sound.sourceNode.type} onChange={(e) => changeOption(e.target.value, 'type')}>
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
