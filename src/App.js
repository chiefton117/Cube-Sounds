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
    speed: 0.002
  };


  const [mode, setMode] = useState(options.mode);
  const [note, setNote] = useState(options.note);
  const [tempo, setTempo] = useState(options.tempo);
  let [scale, setScale] = useState(options.scale);
  const [speed,setSpeed] = useState(options.speed);
  let start = false;

  const scaleRef = React.useRef(options.scale);
  const startRef = React.useRef(start);
  const speedRef = React.useRef(options.speed);


  let numCubes = 5;

  // Define some music theory terms
  // Starting at 'C0' and ending at 'G#9'
  const min = 1;
  const max = 9;

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
  //setScale(options.scale);
  scaleRef.current = options.scale;

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function initAudio() {

  await Tone.start();
  startRef.current = true;
  console.log("Audio initialized");

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
          maxCubes={numCubes}
          tone={Tone}
          scaleRef={scaleRef}
          startRef={startRef}
          speedRef={speedRef}
          speed={speed}

        />

        <Legend onChange = {appOnChange()}
          modes={modes}
          mode={mode}
          setMode={setMode}
          speed={speed}
          setSpeed={setSpeed}
          speedRef={speedRef}
          note={note}
          notes={notes}
          setNote={setNote}
          tempo={tempo}
          setTempo={setTempo}
          initAudio={initAudio}
          startRef={startRef}

          />

    </div>

    </>
  );
}

export default App;