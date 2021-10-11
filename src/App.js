import './App.css';
import * as Tone from 'tone'
import React, { useState } from 'react';
import * as d3 from 'd3';
import Legend from './Legend.jsx';
import Cube from './Cube.jsx';
function App() {


  var options = {
    note: 'A',
    mode: "Major",
    tempo: 90,
    scale: [],
    speed: 0.002,
  };


  const [mode, setMode] = useState(options.mode);
  const [note, setNote] = useState(options.note);
  const [tempo, setTempo] = useState(options.tempo);
  let [scale, setScale] = useState(options.scale);
  let start = false;
  let range = [0,9];

  // Control the current scale we're playing in
  const scaleRef = React.useRef(options.scale);
  // Correctly start the simulation/audio
  const startRef = React.useRef(start);
  // Control the minimum speed of cubes
  const speedRef = React.useRef(options.speed);
  // Control the range of notes available to modify
  const rangeRef = React.useRef(range);



  let numCubes = 6;

  // Define some music theory terms
  // Starting at 'C0' and ending at 'G#9'
  const min = 1;
  const max = 9;

  const midpoint = (max-min)/2;

  const modes = ['Major', 'Minor'];
  const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

  // W - Whole step
  // H - Half step
  // 'Final' notes are omitted to avoid duplicates i.e. C major ends at B, not C

  // Major scales follow the pattern of W-W-H-W-W-W-H
  const major = [0,2,4,5,7,9,11];

  // Minor scales follow the pattern of W-H-W-W-H-W-W
  const minor = [0,2,3,5,7,8,10]; 

  
  // On change, calculate a new scale with input values
  function appOnChange() {
  options.scale = [];
  let arr = (mode === "Major") ? major : minor;
  let start = notes.indexOf(note);

  arr.forEach(function(d) {

    options.scale.push(notes[((d + start) % notes.length)]);
     });

  scaleRef.current = options.scale;

}

async function initAudio() {

  if(startRef.current) {
    startRef.current = startRef.current;
  } else {
  await Tone.start();
  startRef.current = true;
  console.log("Audio initialized");
  }
}

  // Discrete color scheme
  let colorC = (d) => d3.schemePaired[d % 10];

  return (
    <>
    <head>

      <title>Cube Notes</title>

    </head>

    <div className="App">

        <Cube 
          color={colorC}
          numCubes={numCubes}
          tone={Tone}
          scaleRef={scaleRef}
          startRef={startRef}
          speedRef={speedRef}

        />

        <Legend onChange = {appOnChange()}
          modes={modes}
          mode={mode}
          note={note}
          setNote={setNote}
          notes={notes}
          setMode={setMode}
          speedRef={speedRef}
          rangeRef={rangeRef}
          setNote={setNote}
          initAudio={initAudio}
          startRef={startRef}

          />

    </div>

    </>
  );
}

export default App;