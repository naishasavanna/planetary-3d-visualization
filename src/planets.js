import * as THREE from 'three';

// Valeurs réelles : distance (UA), masse (kg) ; taille visuelle artistique
export const SOLAR_SYSTEM = [
  { name: 'Mercure', r: 0.39, mass: 3.30e23, size: 0.35, color: 0x9c9388, spin: 0.2 },
  { name: 'Vénus',   r: 0.72, mass: 4.87e24, size: 0.55, color: 0xd9b27c, spin: -0.1 },
  { name: 'Terre',   r: 1.00, mass: 5.97e24, size: 0.6,  color: 0x4a8fe0, spin: 1 },
  { name: 'Mars',    r: 1.52, mass: 6.39e23, size: 0.45, color: 0xc2573a, spin: 0.95 },
  { name: 'Jupiter', r: 5.20, mass: 1.90e27, size: 1.5,  color: 0xd2a679, spin: 2.4 },
  { name: 'Saturne', r: 9.58, mass: 5.68e26, size: 1.25, color: 0xe3cf9a, spin: 2.2, ring: true },
  { name: 'Uranus',  r: 19.2, mass: 8.68e25, size: 0.9,  color: 0x8fd6dc, spin: -1.4 },
  { name: 'Neptune', r: 30.1, mass: 1.02e26, size: 0.9,  color: 0x4663d8, spin: 1.5 },
];

// Échelle d'affichage non linéaire pour garder Neptune visible : d = 4 * r^0.62
export const displayRadius = (r) => 4 * Math.pow(r, 0.62);

export function createPlanet(data) {
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(data.size * 0.5, 48, 32),
    new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.85 })
  );
  mesh.userData.planet = data;
  group.add(mesh);
  if (data.ring) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(data.size * 0.4, data.size * 0.75, 64),
      new THREE.MeshBasicMaterial({ color: 0xcdb98a, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);
  }
  data.mesh = mesh; data.group = group; data.angle = Math.random() * Math.PI * 2;
  return group;
}

export function createOrbitLine(r) {
  const R = displayRadius(r), pts = [];
  for (let i = 0; i <= 256; i++) { const a = (i / 256) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R)); }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x3a4a74, transparent: true, opacity: 0.6 }));
}
