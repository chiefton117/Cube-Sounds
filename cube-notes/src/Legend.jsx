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

      <p>Tempo</p>
{/*      <input type="range" min="0" max="10" value="0" step="0.1" id="tempo" orient="vertical"></input>*/}
        <hr/>

        <Scale {...props}/>

        <hr/>

    </div> 
  );
}

export default Legend;