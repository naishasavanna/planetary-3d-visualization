import { orbitalPeriodYears, orbitalSpeedKms } from './physics.js';
const $ = (id) => document.getElementById(id);
const fmt = (n, d = 2) => n.toLocaleString('fr-FR', { maximumFractionDigits: d });
export const ui = { $, fmt };

export function showInfo(p, M) {
  if (!p) { $('info').innerHTML = '<p class="empty">Cliquez sur une planète pour afficher ses données.</p>'; return; }
  const T = orbitalPeriodYears(p.r, M);
  $('info').innerHTML = `<h2>${p.name}</h2><dl>
    <dt>Distance</dt><dd>${fmt(p.r)} UA</dd>
    <dt>Masse</dt><dd>${p.mass.toExponential(2).replace('e+', ' × 10^')} kg</dd>
    <dt>Vitesse orbitale</dt><dd>${fmt(orbitalSpeedKms(p.r, M), 1)} km/s</dd>
    <dt>Période orbitale</dt><dd>${T < 2 ? fmt(T * 365.25, 0) + ' jours' : fmt(T, 1) + ' ans'}</dd></dl>`;
}

export const lessonText = (p, M) => p
  ? `Expérience : déplacez ${p.name} avec le curseur de distance (mode Simulation). À ${fmt(p.r)} UA, elle va à ${fmt(orbitalSpeedKms(p.r, M), 1)} km/s. En doublant r, la vitesse d'une orbite circulaire est divisée par √2.`
  : 'Sélectionnez une planète : le système explique comment sa vitesse dépend de sa distance à l’étoile (v = √(GM/r)).';
