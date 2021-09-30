
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone'
import * as d3 from 'd3';
function Legend() {


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

    </div> 
  );
}

export default Legend;