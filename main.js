import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 0.6);
sun.position.set(10, 20, 10);
scene.add(sun);

// Block material
const material = new THREE.MeshLambertMaterial({ color: 0x55aa55 });

// Simple voxel ground
const blocks = [];
for (let x = -10; x <= 10; x++) {
  for (let z = -10; z <= 10; z++) {
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      material
    );
    block.position.set(x, 0, z);
    scene.add(block);
    blocks.push(block);
  }
}

camera.position.set(0, 5, 10);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
