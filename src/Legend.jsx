import './App.css';
import React from 'react';
import Scale from './Scale.jsx'

function Legend(props) {


  // const legend = d3.select(".legend")
  //   .append("g");

  // legend.append("h4")
  //   .text("Controls");

  return (

    <div id="leg" className="legend">
      <h4>Controls</h4>
        <hr/>

      <p>Min Speed</p>
{/*      <input type="range" min="0" max="10" value="0" step="0.1" id="tempo" orient="vertical"></input>*/}
{/*        <input onChange={(event) => {props.setSpeed(event.target.value)}} value={props.speed} type="number" min="0" max="1" step="0.002"/>*/}
        <input onChange={(event) => {props.speedRef.current = event.target.value}} value={props.speedRef.current.value} placeholder={props.speedRef.current} type="number" min="0" max="1" step="0.0002"/>
        <hr/>
          <Scale {...props}/>
        <hr/>
          <button onClick={props.initAudio}>Start</button>
        <hr/>

    </div> 
  );
}

export default Legend;