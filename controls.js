import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

export function setupControls(camera, domElement) {
  const keys = {};
  let yaw = 0;
  let pitch = 0;

  document.addEventListener('keydown', e => keys[e.code] = true);
  document.addEventListener('keyup', e => keys[e.code] = false);

  domElement.addEventListener('click', () => {
    domElement.requestPointerLock();
  });

  document.addEventListener('mousemove', e => {
    if (document.pointerLockElement !== domElement) return;
    yaw -= e.movementX * 0.002;
    pitch -= e.movementY * 0.002;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  });

  return () => {
    camera.rotation.set(pitch, yaw, 0);

    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    const right = new THREE.Vector3().crossVectors(camera.up, dir).normalize();
    const speed = 0.1;

    if (keys['KeyW']) camera.position.add(dir.clone().multiplyScalar(speed));
    if (keys['KeyS']) camera.position.add(dir.clone().multiplyScalar(-speed));
    if (keys['KeyA']) camera.position.add(right.clone().multiplyScalar(speed));
    if (keys['KeyD']) camera.position.add(right.clone().multiplyScalar(-speed));
  };
}