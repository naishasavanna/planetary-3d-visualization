# Planetary 3D — Interactive Orbital Visualization

[Capture vidéo du 2026-10-04 12-30-43.webm](https://github.com/user-attachments/assets/2c20ed6a-ab5f-4552-84c4-a965c4a4df9a)


Expérience interactive en 3D pour comprendre les mouvements orbitaux : physique (gravitation, lois de Kepler), modélisation 3D (Three.js) et design d'interface.

## Lancer
Les modules ES nécessitent un serveur local :
```bash
python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```

## Fonctionnalités
- Système solaire 3D, orbites animées, rotation propre des planètes
- Caméra libre (rotation, zoom), sélection d'une planète au clic
- Données : distance, masse, vitesse orbitale, période
- Modes : Exploration, Simulation (masse de l'étoile, distance, ajout/suppression), Apprentissage
- Pause, vitesse, affichage des orbites

## Physique
Orbite circulaire : `v = √(GM/r)` et `T = √(r³/M)` (UA, masses solaires, années). Quand r augmente, v diminue.
Les distances affichées suivent une échelle non linéaire (`4·r^0,62`) pour que Neptune reste visible ; les données affichées sont réelles.

## Structure
`src/scene.js` scène/caméra · `planets.js` planètes/orbites · `physics.js` calculs · `interface.js` panneaux · `main.js` boucle et événements.

## Pistes
Textures réalistes, traces orbitales, orbites elliptiques, lunes. Voir `documentation/`.
