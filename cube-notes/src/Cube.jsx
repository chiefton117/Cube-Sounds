import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone';
import React, { useState } from 'react';
import * as d3 from 'd3';
function Cube(props) {



function main() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  const max = 4;

  // Create standard box geometry
  var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );


  var bb = new THREE.BoxGeometry(max*Math.E,max*Math.E,max*Math.E);



  const material = new THREE.MeshBasicMaterial( { 
    color: 'purple' } );

  const col = new THREE.Color(0xffffff);
  col.setHex(Math.random() * 0xffffff);
  
  // const m2 = new THREE.MeshLambertMaterial( { color: col } );
  // const m3 = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );

  const cr = new THREE.Color("#" + Math.floor(Math.random()*16777215).toString(16));

  // Create bounding box render
  const bound = new THREE.BoxHelper(new THREE.Mesh(bb, new THREE.MeshBasicMaterial( 0xff0000 )), 0xffffff);


  scene.add(bound);

  // const controls = new THREE.OrbitControls( camera, renderer.domElement );
  const controls = new OrbitControls( camera, renderer.domElement );

  const rv = new THREE.Vector2(scene.getSize);

  camera.position.z = 15;
  //camera.position.y = 15;


  //camera.rotation.z = Math.PI/4;
  console.log(rv);

  var dx = 0.05;
  var dy = 0.05;
  var dz = 0.05;

  var max_speed = 0.1;
  var cubes = [];

  for(var i = 0; i < props.maxCubes; i++) {


    const material = new THREE.MeshBasicMaterial( { 
      color: props.color(i) } );

    const cube = new THREE.Mesh( geometry, material );
    cubes[i] = cube;

    cubes[i].dx = Math.sin((Math.random()-0.5)) * max_speed;
    cubes[i].dy = Math.sin((Math.random()-0.5)) * max_speed;
    cubes[i].dz = Math.sin((Math.random()-0.5)) * max_speed;
   
    scene.add(cube);  

  }


  function animate() {


      cubes.forEach(function(d,idx) {

      //d.rotation.x += dx;
      //d.rotation.y += dx;

      //const synth = new Tone.Synth().toDestination();

      if(Math.abs(d.position.x) >= max) {
        d.position.x = 0;
        console.log((props.scale[idx] + Math.Floor(Math.random()*9)));
        props.synth[idx].triggerAttackRelease((props.scale[idx] + Math.random()*9), "16n");
        d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        d.dz = Math.sin((Math.random()-0.5)) * max_speed;

      }
      if(Math.abs(d.position.y) >= max) {
        d.position.y = 0;
        props.synth[idx].triggerAttackRelease("D4", "16n");
        d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        d.dz = Math.sin((Math.random()-0.5)) * max_speed;
      }
      if(Math.abs(d.position.z) >= max) {
        d.position.z = 0;
        props.synth[idx].triggerAttackRelease("C4", "16n");
        d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        d.dz = Math.sin((Math.random()-0.5)) * max_speed;
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


window.onload = main;


  return (

    <div>
    </div> 
  );
}

export default Cube;