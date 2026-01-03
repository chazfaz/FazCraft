import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

export function createWorld(scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x55aa55 });

  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
      const block = new THREE.Mesh(geometry, material);
      block.position.set(x, 0, z);
      scene.add(block);
    }
  }
}