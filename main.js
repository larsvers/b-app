import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Base
const pixelRatio = Math.min(window.devicePixelRatio, 2);
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

// Texture loader
const textureLoader = new THREE.TextureLoader();
const bakedCinemaTexture = textureLoader.load("../assets/cinema-bake.jpg");
bakedCinemaTexture.flipY = false;
bakedCinemaTexture.encoding = THREE.sRGBEncoding;

// Materials
const bakedCinemaMaterial = new THREE.MeshBasicMaterial({ map: bakedCinemaTexture });

// GLTF loader
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath("/draco_decoder/")
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load("../assets/cinama-merged-draco.glb", gltf => {
  console.log(gltf)
  gltf.scene.children[0].material = bakedCinemaMaterial;
  scene.add(gltf.scene.children[0]);



});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
camera.position.x = -23;
camera.position.y = 31;
camera.position.z = -74;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas,
  antialias: true
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(pixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor('#ffffff');

function tick() {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();
