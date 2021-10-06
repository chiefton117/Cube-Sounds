import './App.css';
import React from 'react';
import Scale from './Scale.jsx'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


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
          <input onChange={(event) => {props.speedRef.current = event.target.value}} value={props.speedRef.current.value} placeholder={props.speedRef.current} type="number" min="0" max="0.1" step="0.0002"/>
        <hr/>
          <p>Note Range</p>
          <Box sx={{ width: 250 }}>
            <Slider
            getAriaLabel={() => 'Note Range'}
            value={props.rangeRef.current}
            min={props.rangeRef.current[0]}
            max={props.rangeRef.current[1]}
            step={1}
            style={{position: "relative"}}
            onChange={(event) => {props.rangeRef.current = event.target.value}}
            valueLabelDisplay="auto"
            />
          </Box>
          <Scale {...props}/>
        <hr/>
          <Button variant="outlined" onClick={props.initAudio}>Start</Button>
        <hr/>

    </div> 
  );
}

export default Legend;