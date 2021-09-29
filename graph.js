  
function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  var g1 = new THREE.BoxGeometry( 1, 1, 1 );
  var g2 = new THREE.BoxGeometry( 1, 1, 1 );
  var g3 = new THREE.BoxGeometry( 1, 1, 1 );

  const material = new THREE.MeshBasicMaterial( { 
    color: 'purple' } );

  const m2 = new THREE.MeshBasicMaterial( { 
    color: 'yellow' } );
  const m3 = new THREE.MeshBasicMaterial( { 
    color: 'red' } );

  // const material = new THREE.MeshStandardMaterial( { 
  // color: 0x00ff00 } );

  const box = new THREE.Box3();


  const cube = new THREE.Mesh( g1, material );
  const cube2 = new THREE.Mesh( g2, m2 );
  const cube3 = new THREE.Mesh( g3, m3 );



  scene.add(cube);
  scene.add(cube2);
  //scene.add(cube3);

  //cube2.position.setX(200);
  //cube2.position.set(20,20,20);
  //cube3.position.set(200,200,0);

  console.log(cube);
  const bb = new THREE.BoxHelper(cube2, 0xffffff);
  scene.add(bb);

  const bound = cube2.geometry.computeBoundingBox();

  //var controls = new OrbitControls( camera, renderer.domElement );

  camera.position.z = 5;

  console.log(renderer.getSize);
  console.log(window.innerWidth/2);
  console.log(cube.position.x);
  console.log(cube.position.y);
  console.log(cube.position.z);
  
  var dx = 0.05;

  function animate() {
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube2.rotation.x += dx;
    cube2.rotation.y += dx;

    if(Math.abs(cube2.position.x) >= 3) dx = -dx;

    cube2.position.x += dx;


    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}


window.onload = main;