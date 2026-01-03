import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

export function setupTouchControls(camera) {
  const move = { x: 0, y: 0 };
  let yaw = 0;
  let pitch = 0;
  let lookTouch = null;

  // ===== LOOK CONTROLS =====
  window.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      lookTouch = e.touches[0];
    }
  });

  window.addEventListener('touchmove', e => {
    if (!lookTouch) return;

    const t = e.touches[0];
    yaw -= (t.clientX - lookTouch.clientX) * 0.003;
    pitch -= (t.clientY - lookTouch.clientY) * 0.003;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

    lookTouch = t;
  });

  window.addEventListener('touchend', () => {
    lookTouch = null;
  });

  // ===== MOVE JOYSTICK =====
  const joystick = document.createElement('div');
  joystick.style = `
    position: fixed;
    left: 20px;
    bottom: 20px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    touch-action: none;
  `;

  const stick = document.createElement('div');
  stick.style = `
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.4);
    border-radius: 50%;
    position: absolute;
    left: 30px;
    top: 30px;
  `;

  joystick.appendChild(stick);
  document.body.appendChild(joystick);

  let stickTouch = null;

  joystick.addEventListener('touchstart', e => {
    stickTouch = e.touches[0];
  });

  joystick.addEventListener('touchmove', e => {
    if (!stickTouch) return;
    const t = e.touches[0];

    const rect = joystick.getBoundingClientRect();
    const dx = t.clientX - (rect.left + rect.width / 2);
    const dy = t.clientY - (rect.top + rect.height / 2);

    const dist = Math.min(40, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx);

    stick.style.left = `${30 + Math.cos(angle) * dist}px`;
    stick.style.top = `${30 + Math.sin(angle) * dist}px`;

    move.x = Math.cos(angle) * (dist / 40);
    move.y = Math.sin(angle) * (dist / 40);
  });

  joystick.addEventListener('touchend', () => {
    stickTouch = null;
    stick.style.left = '30px';
    stick.style.top = '30px';
    move.x = move.y = 0;
  });

  // ===== UPDATE FUNCTION =====
  return () => {
    camera.rotation.set(pitch, yaw, 0);

    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    const right = new THREE.Vector3().crossVectors(camera.up, dir).normalize();
    const speed = 0.08;

    camera.position.add(dir.multiplyScalar(-move.y * speed));
    camera.position.add(right.multiplyScalar(-move.x * speed));
  };
}