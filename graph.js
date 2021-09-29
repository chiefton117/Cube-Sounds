  
function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  var geometry = new THREE.BoxGeometry( 1, 1, 1 );


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

  console.log(m2.color);
  console.log(material.color);
  const box = new THREE.Box3();


  const cube = new THREE.Mesh( geometry, material );
  const cube2 = new THREE.Mesh( geometry, material );
  const cube3 = new THREE.Mesh( geometry, m2 );



  scene.add(cube);
  scene.add(cube2);
  //scene.add(cube3);


  console.log(new THREE.Vector2(renderer.getSize));
  const bb = new THREE.BoxHelper(cube2, 0xffffff);
  scene.add(bb);

  const bound = cube2.geometry.computeBoundingBox();

  //var controls = new OrbitControls( camera, renderer.domElement );
  const rv = new THREE.Vector2(scene.getSize);
  camera.position.z = 5;
  console.log(rv);

  var dx = 0.05;
  var dy = 0.05;
  var dz = 0.05;

  function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube2.rotation.x += dx;
    cube2.rotation.y += dx;

    if(Math.abs(cube2.position.x) >= 3) dx = -dx;
    if(Math.abs(cube2.position.y) >= 3) dy = -dy;
    if(Math.abs(cube2.position.z) >= 1) dz = -dz;

    cube2.position.x += dx;
    cube2.position.y += dy;
    cube2.position.z += dz;

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}


window.onload = main;