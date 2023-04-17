import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui'; 

window.addEventListener('load', function () {
  init();
});

function init() {
  const options = {
    color: 0x00ffff,
  };

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

  camera.position.set(0, 0, 5);

  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);

  const cubeGeometry = new THREE.IcosahedronGeometry(1);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff, emissive: 0x111111 });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2, 0);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.1,
    color: 0xaaaaaa
  });

  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  
  scene.add(skeleton);
  scene.add(cube);

  const light = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(light);

  const clock = new THREE.Clock();

  render();

  function render() {
    const elapsedTime = clock.getElapsedTime();

    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime;

    skeleton.rotation.x = elapsedTime * 1.5;
    skeleton.rotation.y = elapsedTime * 1.5;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', handleResize);

  const gui = new GUI();

  // gui.add(cube.position, 'y', -3, 3, 0.01);
  gui
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01);

  gui.add(cube, 'visible');

  gui
  .addColor(options, 'color')
  .onChange(value => {
    cube.material.color.set(value);
  });
}