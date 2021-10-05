import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone';
import React, { useEffect } from 'react';

function Cube(props) {



function main() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // L/W/H of the box - how far does a cube travel before resetting
  const max = 4;

  // Create standard box geometry
  var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );


  var bb = new THREE.BoxGeometry(max*Math.E,max*Math.E,max*Math.E);

  // Create bounding box render
  const bound = new THREE.BoxHelper(new THREE.Mesh(bb, new THREE.MeshBasicMaterial( 0xff0000 )), 0xffffff);

  scene.add(bound);

  // const controls = new THREE.OrbitControls( camera, renderer.domElement );
  const controls = new OrbitControls( camera, renderer.domElement );

  camera.position.z = 15;
  //camera.position.y = 15;

  var dx = 0.05;
  var dy = 0.05;
  var dz = 0.05;

  // scale_len = the length of any major or minor scale
  var scale_len = props.scaleRef.current.length;
  //var max_speed = 0.002;

  // Define base and max speed
  // Then, generate a scalar up to max to multiply the base by
  var max_mult = 5;
  var min_speed = props.speed;
  
  // Each note timing can range from 1-256
  // This can be represented as a random power of 2 as
  // 2**8 == 256 and 2**0 == 1
  const max_note_len = 8;
  // What is the maximum pitch notes can play at
  const max_pitch = 4;
  // What is the minimum pitch notes can play at
  const min_pitch = 2;

  // Notes can be represented by:
  // n - regular note
  // t - triplet
  // n. - dotted note
  // e.g. 4n. is a dotted quarter note
  const note_types = ['n','t'];
  

  var cubes = [];

  const reverb = new Tone.Reverb(2);
  const delay = new Tone.PingPongDelay("8n", 0.2);
  const env = new Tone.Envelope(0.4);
  const vibrato = new Tone.Vibrato();

  env.attackCurve = 'sine';
  //env.triggerAttack();

  for(var i = 0; i < props.maxCubes; i++) {


    const material = new THREE.MeshBasicMaterial( { 
      color: props.color(i) } );

    const cube = new THREE.Mesh( geometry, material );
    cubes[i] = cube;



    let randNote = Math.floor(Math.random() * scale_len);
    let randPitch = Math.floor(Math.random() * max_pitch) + min_pitch;
    let randLen = 2 ** Math.floor(Math.random() * max_note_len);
    let type_idx = Math.floor(Math.random() * note_types.length);

    cubes[i].note = (props.scaleRef.current[randNote] + randPitch);

    cubes[i].note_len = (randLen + note_types[type_idx]);

    //cubes[i].synth = new Tone.MembraneSynth();
    //cubes[i].synth = new Tone.FMSynth();
    cubes[i].synth = new Tone.Synth();

    cubes[i].synth.chain(vibrato, reverb, Tone.Destination);
    //cubes[i].synth.chain(Tone.Destination);

    // Define more random values :)
    // Once the cube's counter reaches an arbitrary maximum, switch notes
    cubes[i].counter = 0;

    // How many times can a note repeat before changing
    // cubes[i].max_repeats = (Math.ceil((Math.random() * 8))+1);
    cubes[i].max_repeats = 1;

    cubes[i].dx = props.speedRef.current * (2**(Math.ceil((Math.random() * max_mult))+1));
    cubes[i].dy = 0;
    cubes[i].dz = 0;

    scene.add(cube);  

  }


  function animate() {

    // Check for start button to be pressed before allowing animation
    if(props.startRef.current) {


      cubes.forEach(function(d,idx) {

      d.rotation.x += dx;
      d.rotation.y += dx;

      //const synth = new Tone.Synth().toDestination();

      if(Math.abs(d.position.x) >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, d.note_len);
        // d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dz = Math.sin((Math.random()-0.5)) * max_speed;

      }
      if(Math.abs(d.position.y) >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, d.note_len);
        // d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dz = Math.sin((Math.random()-0.5)) * max_speed;
      }
      if(Math.abs(d.position.z) >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, d.note_len);
        // d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dz = Math.sin((Math.random()-0.5)) * max_speed;
      }

      if(d.counter >= d.max_repeats) {
        d.note = (props.scaleRef.current[i % scale_len] + (Math.floor(Math.random() * max_pitch) + min_pitch)).toString();
        d.counter = 0;
      }


      // if(d.dx != props.speedRef.current * (2**(Math.ceil((Math.random() * max_mult))+1))) {
      //   d.position.x = 0;
      //   d.dx = props.speedRef.current * (2**(Math.ceil((Math.random() * max_mult))+1));
      // }
      /// TODO Change position to 0 on speed change
      d.dx = props.speedRef.current * (2**(Math.ceil((Math.random() * max_mult))+1));

      d.position.x += d.dx;
      d.position.y += d.dy;
      d.position.z += d.dz;
      //Math.sin(Math.random(max)) * max

    });

    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}

window.onload = main;


  return (

    <div>
    </div> 
  
  );
}

export default React.memo(Cube);