
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone'
import * as d3 from 'd3';
import Legend from './Legend.jsx';
function App() {


  
function main() {


  const synth = new Tone.Synth().toDestination();


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

  // const material = new THREE.MeshStandardMaterial( { 
  // color: 0x00ff00 } );
  const cr = new THREE.Color("#" + Math.floor(Math.random()*16777215).toString(16));

  const m2 = new THREE.MeshStandardMaterial( { 
  color: cr } );

  const box = new THREE.Box3();

  // Create bounding box render
  const bound = new THREE.BoxHelper(new THREE.Mesh(bb, new THREE.MeshBasicMaterial( 0xff0000 )), 0xffffff);

  // const cube = new THREE.Mesh( geometry, material );
  // const cube2 = new THREE.Mesh( geometry, material );
  // const cube3 = new THREE.Mesh( geometry, m2 );



  // scene.add(cube);
  // scene.add(cube2);
  //scene.add(cube3);


  console.log(new THREE.Vector2(renderer.getSize));

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

  var max_cubes = 50;
  var max_speed = 0.1;
  var cubes = [];

  let colorC = (d) => d3.interpolateMagma( parseInt(d) / max_cubes );
  //let colorC = (d) => d3.interpolateTurbo( parseInt(d) / max_cubes );


  for(var i = 0; i < max_cubes; i++) {


    const material = new THREE.MeshBasicMaterial( { 
      color: colorC(i) } );

    const cube = new THREE.Mesh( geometry, material );
    cubes[i] = cube;

    cubes[i].dx = Math.sin((Math.random()-0.5)) * max_speed;
    cubes[i].dy = Math.sin((Math.random()-0.5)) * max_speed;
    cubes[i].dz = Math.sin((Math.random()-0.5)) * max_speed;
   
    scene.add(cube);  

    // cube.position.x = Math.sin(Math.random(max)) * max;
    // cube.position.y = Math.sin(Math.random(max)) * max;
    // cube.position.z = Math.sin(Math.random(max)) * max;

  }


  function animate() {


      cubes.forEach(function(d,idx) {

      //d.rotation.x += dx;
      //d.rotation.y += dx;

      // if(Math.abs(d.position.x) >= max) dx = -dx;
      // if(Math.abs(d.position.y) >= max) dy = -dy;
      // if(Math.abs(d.position.z) >= 1) dz = -dz;
      //var clr = colorC(idx);
      //d.material.color.setHex(rgbToHex(clr.r,clr.g,clr.b));

      //d.material.needsUpdate = true;

      // if(Math.abs(d.position.x) >= max) d.position.x = 0;
      // if(Math.abs(d.position.y) >= max) d.position.y = 0;
      // if(Math.abs(d.position.z) >= 1) d.position.z = 0;


      if(Math.abs(d.position.x) >= max) {
        d.position.x = 0;
        d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        d.dz = Math.sin((Math.random()-0.5)) * max_speed;

      }
      if(Math.abs(d.position.y) >= max) {
        d.position.y = 0;
        d.dx = Math.sin((Math.random()-0.5)) * max_speed;
        d.dy = Math.sin((Math.random()-0.5)) * max_speed;
        d.dz = Math.sin((Math.random()-0.5)) * max_speed;
      }
      if(Math.abs(d.position.z) >= max) {
        d.position.z = 0;
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

    <div className="App">
      <head>
      
        <title>3d Cube</title>

      </head>
      <body>
        <Legend/>



      </body>
    </div>
  );
}

export default App;