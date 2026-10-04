import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070a12);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
  camera.position.set(0, 38, 62);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.minDistance = 5; controls.maxDistance = 300;

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  scene.add(new THREE.PointLight(0xfff0d0, 6000, 0, 2));
  const star = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 32), new THREE.MeshBasicMaterial({ color: 0xffd98a }));
  scene.add(star);

  // Champ d'étoiles
  const p = new Float32Array(3000);
  for (let i = 0; i < p.length; i += 3) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(600 + Math.random() * 300);
    p.set([v.x, v.y, v.z], i);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xaab4d0, size: 1.2, sizeAttenuation: false })));

  const resize = () => { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
  addEventListener('resize', resize); resize();
  return { renderer, scene, camera, controls, star };
}
