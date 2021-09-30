
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
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
    scale: []
  };


  const [mode, setMode] = useState(options.mode);
  const [note, setNote] = useState(options.note);
  const [tempo, setTempo] = useState(options.tempo);
  const [scale, setScale] = useState(options.scale);


  // Define some music theory terms
  // Starting at 'C0' and ending at 'G#9'
  const min = 0;
  const max = 9;

  const modes = ['Major', 'Minor'];
  const baseNotes = ['A','B','C','D','E','F','G'];
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
}


  let maxCubes = 50;


  // Continuous color schemes
  //let colorC = (d) => d3.interpolateMagma( parseInt(d) / maxCubes );
  //let colorC = (d) => d3.interpolateTurbo( parseInt(d) / maxCubes );

  // Discrete color scheme
  let colorC = (d) => d3.schemePaired[d % 10];


  // Tone.js implementation
  const synth = new Tone.Synth().toDestination();




  return (
    <>
    <head>

      <title>Cube Notes</title>

    </head>

    <div className="App">

        <Cube 
          color={colorC}
          maxCubes={maxCubes}
        />

        <Legend onChange = {appOnChange()}
          modes={modes}
          mode={mode}
          setMode={setMode}
          note={note}
          notes={notes}
          setNote={setNote}
          tempo={tempo}
          setTempo={setTempo}/>

    </div>

    </>
  );
}

export default App;