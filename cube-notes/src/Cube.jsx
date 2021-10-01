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


  const max = 5;

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
  var max_speed = 0.05;

  // Define base and max speed
  // Then, generate a scalar up to max to multiply the base by
  var max_mult = 20;
  var min_speed = 0.002;
  
  var cubes = [];

  const reverb = new Tone.Reverb(1);
  const delay = new Tone.PingPongDelay("8n", 0.2);

  for(var i = 0; i < props.maxCubes; i++) {


    const material = new THREE.MeshBasicMaterial( { 
      color: props.color(i) } );

    const cube = new THREE.Mesh( geometry, material );
    cubes[i] = cube;

    cubes[i].note = (props.scaleRef.current[i % scale_len] + Math.floor(Math.random() * 7)).toString();
    
    //cubes[i].synth = new Tone.MembraneSynth();
    cubes[i].synth = new Tone.FMSynth();

    cubes[i].synth.chain(reverb, delay, Tone.Destination);

    cubes[i].dx = min_speed * (Math.ceil((Math.random() * max_mult))+1);
    cubes[i].dy = min_speed * (Math.ceil((Math.random() * max_mult))+1);
    cubes[i].dz = min_speed * (Math.ceil((Math.random() * max_mult))+1);

    // Define more random values :)
    // Once the cube's counter reaches an arbitrary maximum, switch notes
    cubes[i].counter = 0;
    cubes[i].max = (Math.ceil((Math.random() * 10))+1);

    //cubes[i].dy = 0;
    //cubes[i].dz = 0;

    scene.add(cube);  

  }

  console.log(props.scaleRef);


  function animate() {


      cubes.forEach(function(d,idx) {

      //d.rotation.x += dx;
      //d.rotation.y += dx;

      //const synth = new Tone.Synth().toDestination();

      if(Math.abs(d.position.x) >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, "8n");
        // d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dz = Math.sin((Math.random()-0.5)) * max_speed;

      }
      if(Math.abs(d.position.y) >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, "8n");
        // d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dz = Math.sin((Math.random()-0.5)) * max_speed;
      }
      if(Math.abs(d.position.z) >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, "8n");
        // d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        // d.dz = Math.sin((Math.random()-0.5)) * max_speed;
      }
      if(d.counter >= d.max) {
        d.note = (props.scaleRef.current[i % scale_len] + Math.floor(Math.random() * 7)).toString();
        d.counter = 0;
      }

      // d.position.x += dx;
      // d.position.y += dy;
      // d.position.z += dz;

      d.position.x += d.dx;
      d.position.y += d.dy;
      d.position.z += d.dz;
      //Math.sin(Math.random(max)) * max

    });


    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}


//window.onload = main;

useEffect(() => {
    main();
  }, [props.anim]);

  return (

    <div>
    </div> 
  
  );
}

export default React.memo(Cube);