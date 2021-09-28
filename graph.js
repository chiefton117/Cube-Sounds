
function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  var geometry = new THREE.BoxGeometry( 1, 1, 1 );

  const material = new THREE.MeshBasicMaterial( { 
    color: 'purple' } );

    const m2 = new THREE.MeshBasicMaterial( { 
    color: 'yellow' } );
      const m3 = new THREE.MeshBasicMaterial( { 
    color: 'red' } );


  console.log(geometry);
  // const material = new THREE.MeshStandardMaterial( { 
  // color: 0x00ff00 } );


  const cube = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, m2 );
const cube3 = new THREE.Mesh( geometry, m3 );



  scene.add( cube );

scene.add(cube2);
scene.add(cube3); 
  console.log(cube);


  //var controls = new OrbitControls( camera, renderer.domElement );

  camera.position.z = 5;


  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}


window.onload = main;