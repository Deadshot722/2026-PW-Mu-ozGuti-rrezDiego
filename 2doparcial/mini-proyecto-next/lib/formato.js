// Las fechas del backend llegan como texto 'AAAA-MM-DD'. Si se hiciera new Date('2026-10-26'),
// JavaScript la toma como medianoche UTC y en México (UTC-6) se vería el 25 de octubre.
// Por eso se separa el texto y se construye la fecha en hora local.
function aFechaLocal(texto) {
  const [anio, mes, dia] = String(texto).slice(0, 10).split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

// '2026-10-26' -> 'lunes, 26 de octubre de 2026'
export function formatearFecha(texto) {
  if (!texto) return '';
  return aFechaLocal(texto).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// '2026-10-29 14:05:09' -> '29/10/2026 14:05'
export function formatearFechaHora(texto) {
  if (!texto) return '';
  const [fecha, hora = ''] = String(texto).replace('T', ' ').split(' ');
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}${hora ? ' ' + hora.slice(0, 5) : ''}`;
}

// true si la fecha del taller ya pasó (compara solo el día, no la hora)
export function yaPaso(texto) {
  if (!texto) return false;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return aFechaLocal(texto) < hoy;
}

// La boleta es un dato personal: '2026090001' -> '******0001'
export function ocultarBoleta(boleta) {
  const b = String(boleta || '');
  if (b.length <= 4) return '****';
  return '*'.repeat(b.length - 4) + b.slice(-4);
}
