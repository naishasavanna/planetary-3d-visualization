import * as THREE from 'three';
import { createScene } from './scene.js';
import { SOLAR_SYSTEM, createPlanet, createOrbitLine, displayRadius } from './planets.js';
import { angularSpeed } from './physics.js';
import { ui, showInfo, lessonText } from './interface.js';
const { $, fmt } = ui;

const { renderer, scene, camera, controls } = createScene($('scene'));
let planets = [], lines = new Map(), selected = null, playing = true, speed = 1, M = 1, mode = 'explore', extra = 0;

function addPlanet(data) {
  const d = { ...data }; planets.push(d);
  scene.add(createPlanet(d));
  const line = createOrbitLine(d.r); line.visible = $('orbits').classList.contains('on');
  scene.add(line); lines.set(d, line);
}
function reset() {
  planets.forEach((p) => { scene.remove(p.group); scene.remove(lines.get(p)); });
  planets = []; lines.clear(); select(null);
  M = 1; $('mass').value = 1; $('o-mass').textContent = '1,00 M☉'; extra = 0;
  SOLAR_SYSTEM.forEach(addPlanet);
}
function select(p) {
  selected = p; showInfo(p, M);
  $('dist').disabled = $('remove').disabled = !p;
  if (p) { $('dist').value = p.r; $('o-dist').textContent = fmt(p.r) + ' UA'; } else $('o-dist').textContent = '—';
  $('lesson').textContent = lessonText(p, M);
}

// Sélection au clic (sans déclencher lors d'un glissement de caméra)
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
let down = [0, 0];
$('scene').addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
$('scene').addEventListener('pointerup', (e) => {
  if (Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 4) return;
  mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(mouse, camera);
  const hit = ray.intersectObjects(planets.map((p) => p.mesh))[0];
  select(hit ? hit.object.userData.planet : null);
});

$('play').onclick = () => { playing = !playing; $('play').textContent = playing ? 'Pause' : 'Lecture'; };
$('reset').onclick = reset;
$('orbits').onclick = (e) => { e.target.classList.toggle('on'); lines.forEach((l) => (l.visible = e.target.classList.contains('on'))); };
$('speed').oninput = (e) => { speed = +e.target.value; $('o-speed').textContent = fmt(speed, 1) + '×'; };
$('mass').oninput = (e) => { M = +e.target.value; $('o-mass').textContent = fmt(M) + ' M☉'; if (selected) select(selected); };
$('dist').oninput = (e) => {
  if (!selected) return; selected.r = +e.target.value;
  scene.remove(lines.get(selected));
  const l = createOrbitLine(selected.r); l.visible = $('orbits').classList.contains('on');
  scene.add(l); lines.set(selected, l); select(selected);
};
$('add').onclick = () => {
  extra++;
  addPlanet({ name: 'Planète ' + extra, r: 2.5 + extra * 0.8, mass: 1e25, size: 0.6, color: new THREE.Color().setHSL(Math.random(), 0.5, 0.55).getHex(), spin: 1 });
  select(planets[planets.length - 1]);
};
$('remove').onclick = () => {
  const p = selected; scene.remove(p.group); scene.remove(lines.get(p)); lines.delete(p);
  planets = planets.filter((q) => q !== p); select(null);
};
document.querySelectorAll('.modes button').forEach((b) => (b.onclick = () => {
  mode = b.dataset.mode;
  document.querySelectorAll('.modes button').forEach((x) => x.classList.toggle('on', x === b));
  $('sim-controls').hidden = mode !== 'sim'; $('lesson').hidden = mode !== 'learn';
}));

// Boucle : révolution + rotation propre
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  if (playing) planets.forEach((p) => {
    p.angle += angularSpeed(p.r, M) * dt * speed * 0.5; // 1 s ≈ 0,5 an à 1×
    const R = displayRadius(p.r);
    p.group.position.set(Math.cos(p.angle) * R, 0, Math.sin(p.angle) * R);
    p.mesh.rotation.y += p.spin * dt * speed;
  });
  controls.update(); renderer.render(scene, camera);
});
reset();
