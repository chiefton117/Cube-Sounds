import React from "react";
import './App.css';
function Legend(props) {


  return (

    <div>

      <p>Scale: </p>
      <select value={props.note} 
      name="note" 
      onChange={(event) => {props.setNote(event.target.value)}}>
      {props.notes.map((d,idx) => (

        <option value={d} key={d}>{d}</option>

      ))};
      </select>



      <p>Mode: </p>
      <select 
      value={props.mode} 
      name="mode" 
      onChange = {(event) => {props.setMode(event.target.value)}}>
      {props.modes.map((d,idx) => (

        <option value={d} key={d}>{d}</option>

      ))};
      </select>



    </div> 
  );
}

export default Legend;