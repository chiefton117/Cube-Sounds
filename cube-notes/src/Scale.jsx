import React from "react";
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone'
import * as d3 from 'd3';
function Legend(props) {

  // Define some music theory terms
  const min = 0;
  const max = 9;

  const modes = ['Major', 'Minor'];
  const baseNotes = ['A','B','C','D','E','F','G'];
  const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

  // W - Whole step
  // H - Half step
  // Final notes are omitted to avoid duplicate notes


  // Major scales follow the pattern of W-W-H-W-W-W-H
  const major = [0,2,4,5,7,9,11];

  // Minor scales follow the pattern of W-H-W-W-H-W-W
  const minor = [0,2,3,5,7,8,10]; 

  let scale = [];
  

  const legend = d3.select(".legend")
    .append("g");

  legend.append("h4")
    .text("Controls");

  function setScale() {

    let arr = props.mode == "Major" ? major : minor;
    let start = notes.indexOf(props.note);
    scale.append(notes[start]);

    arr.forEach(d => (
      //// TODO fix wrapping for notes
      scale.append(notes[(d + start)]);

       ));
  }

  return (

    <div>

      <text>Scale: </text>
      <select name="note">
      {notes.map((d) => (

        <option value={d} onChange = {props.setNote(d); setScale();}>{d}</option>

      ))};
      </select>



      <text>Mode: </text>
      <select name="mode">
      {modes.map((d) => (

        <option value={d} onChange = {props.setMode(d); setScale();}>{d}</option>

      ))};
      </select>



    </div> 
  );
}

export default Legend;