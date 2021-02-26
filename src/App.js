import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import './App.css';

function App() {
    const [sequencer, setSequencer] = useState(0);
    const [currentNote, setCurrentNote] = useState(0);
    const [release, setRelease] = useState(0.5);
    const [frequency, setFrequency] = useState(440);
    const notes = [];
    const settings = { release: 0.5, frequency: 440 };

    for (let i = 0; i < 16; i++) {
        const note = new Pizzicato.Sound({
            source: 'wave',
            options: { type: 'sine' },
        });
        notes.push(note);
    }

    let i = 0;
    const playNextNote = () => {
        notes[i].attack = 0.1;
        notes[i].release = settings.release;
        notes[i].frequency = (Math.random() + 0.5) * 440;
        notes[i].play();
        setTimeout(() => {
            notes[i].stop();
            i++;
            if (i >= notes.length) i = 0;
            setCurrentNote(i);
        }, 200);
    };

    const play = () => {
        setSequencer(window.setInterval(playNextNote, 500));
    };

    const stop = () => {
        window.clearInterval(sequencer);
    };

    const changeRelease = (event) => {
        settings.release = parseFloat(event.target.value);
        console.log(settings);
        setRelease(settings.release);
    };

    const changeFrequency = (event) => {
        settings.frequency = parseFloat(event.target.value);
        console.log(settings);
        setFrequency(settings.frequency);
    };

    return (
        <div className="App">
            <header className="App-header">
                {currentNote}
                <input type="number" value={release} onChange={changeRelease} step=".1"></input>
                <input type="number" value={frequency} onChange={changeFrequency} step="10"></input>
                <button type="button" onClick={play}>
                    Play
                </button>
                <button type="button" onClick={stop}>
                    Stop
                </button>
            </header>
        </div>
    );
}

export default App;
