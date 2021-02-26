import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import './App.css';

function App() {
    const [sequencer, setSequencer] = useState(0);
    const [currentNote, setCurrentNote] = useState(0);
    const notes = [];

    for (let i = 0; i < 16; i++) {
        const note = new Pizzicato.Sound({
            source: 'wave',
        });
        note.frequency = 440;
        note.attack = 0.1;
        note.release = 0.1;
        notes.push(note);
    }

    let i = 0;
    const playNextNote = () => {
        notes[i].play();
        setTimeout(() => {
            notes[i].stop();
            i++;
            if (i >= notes.length) i = 0;
            console.log(i);
            setCurrentNote(i);
        }, 100);
    };

    const play = () => {
        setSequencer(window.setInterval(playNextNote, 500));
    };

    const stop = () => {
        window.clearInterval(sequencer);
    };

    return (
        <div className="App">
            <header className="App-header">
                {currentNote}
                <button type="button" onClick={play}>
                    Play
                </button>
                <button type="button" onClick={stop}>
                    Stop
                </button>
                {sequencer}
            </header>
        </div>
    );
}

export default App;
