  
function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  const max = 2.5;

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

  //var controls = new OrbitControls( camera, renderer.domElement );
  const rv = new THREE.Vector2(scene.getSize);
  //camera.position.x = 3;
  //camera.position.y = 3;
  camera.position.z = 10;
  console.log(rv);

  var dx = 0.05;
  var dy = 0.05;
  var dz = 0.05;

  var max_cubes = 4;
  var cubes = [];

  //let colorC = (d) => d3.interpolateMagma( parseInt(d) / max_cubes );
  let colorC = (d) => d3.interpolateTurbo( parseInt(d) / max_cubes );

  for(var i = 0; i < max_cubes; i++) {

    const material = new THREE.MeshBasicMaterial( { 
      color: colorC(i) } );

    const cube = new THREE.Mesh( geometry, material );
    cubes[i] = cube;
    scene.add(cube);
    cube.position.x = Math.sin(Math.random(max)) * max;
    cube.position.y = Math.sin(Math.random(max)) * max;
    cube.position.z = Math.sin(Math.random(max)) * max;

  }


  function animate() {


      cubes.forEach(function(d) {

      d.rotation.x += dx;
      d.rotation.y += dx;

      if(Math.abs(d.position.x) >= max) dx = -dx;
      if(Math.abs(d.position.y) >= max) dy = -dy;
      if(Math.abs(d.position.z) >= 1) dz = -dz;


      d.position.x += dx;
      d.position.y += dy;
      d.position.z += dz;


    });




    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}


window.onload = main;