import React from "react";
import './App.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Legend(props) {


  return (

    <div>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Scale</InputLabel>
        <Select
          value={props.note} 
          onChange={(event) => {props.setNote(event.target.value)}}
        >
          {props.notes.map((d,idx) => (

            <MenuItem key={d} value={d}>{d}</MenuItem>

          ))};
  
        </Select>
      </FormControl>



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