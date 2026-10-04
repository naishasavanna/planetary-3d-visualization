// Unités : distance en UA, masse en masses solaires, temps en années.
// Orbite circulaire : T = sqrt(r^3 / M)  et  v = sqrt(GM / r)
export const G = 6.674e-11, M_SUN = 1.989e30, AU = 1.496e11;

export const orbitalPeriodYears = (r, M = 1) => Math.sqrt(r ** 3 / M);
export const orbitalSpeedKms = (r, M = 1) => Math.sqrt(G * M * M_SUN / (r * AU)) / 1000;
export const angularSpeed = (r, M = 1) => (2 * Math.PI) / orbitalPeriodYears(r, M); // rad / an
