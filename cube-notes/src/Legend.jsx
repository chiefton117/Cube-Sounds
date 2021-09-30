import './App.css';
import React, { useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone'
import * as d3 from 'd3';
import Scale from './Scale.jsx'

function Legend(props) {

  var options = {
    note: "",
    mode: "",
    tempo: 90
  };


  const [mode, setMode] = useState(options.note);
  const [note, setNote] = useState(options.mode);
  const [tempo, setTempo] = useState(options.tempo);

  const legend = d3.select(".legend")
    .append("g");

  legend.append("h4")
    .text("Controls");

  return (

    <div id="leg" className="legend">
      <h4>Controls</h4>
        <hr/>

      <text>Tempo</text>
      <input type="range" min="0" max="10" value="0" step="0.1" id="tempo" orient="vertical"></input>
        <hr/>

        <Scale onChange = {d => console.log(d.event.target)}
          mode={mode}
          setMode={setMode}
          note={note}
          setNote={setNote}
          tempo={tempo}
          setTempo={setTempo}
        />

        <hr/>

    </div> 
  );
}

export default Legend;