// 01-arreglos.js
// Métodos de arreglo más usados en JS/Node — practícalos sobre esta lista
// de talleres (misma forma que la API real de CECyT9). Completa cada TODO.

const talleres = [
  { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
  { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
  { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
  { nombre: 'Desarrollo Web con JS', instructor: 'Ing. María López', cupo: 25, inscritos: 10 },
];

// TODO: forEach — imprime "- <nombre> (<inscritos>/<cupo>)" de cada taller
console.log("aplicando un forEach para imprimir talleres:");
talleres.forEach((t) => console.log(`- ${t.nombre} (${t.inscritos}/${t.cupo})`));
// TODO: map — crea un arreglo `nombres` solo con los nombres de los talleres
console.log("Aplicando funcion Map con solo Nombres");
const nombres = talleres.map((t) => t.nombre);
console.log(nombres);
// TODO: filter — crea un arreglo `llenos` con los talleres donde inscritos >= cupo
console.log("Aplicando la funcion filter en los talleres");
const llenos = talleres.filter((t) => t.inscritos >= t.cupo);
console.log(llenos.map((t) => t.nombre));

// TODO: find — encuentra el PRIMER taller impartido por 'Ing. María López'
console.log("Aplicando find para hallar el primer taller de 'Ing. María López':");
const tallerEncontrado = talleres.find((t) => t.instructor === 'Ing. María López');
console.log(tallerEncontrado);
// TODO: reduce — calcula `totalInscritos`, la suma de inscritos de todos los talleres
console.log('Aplicando reduce para calcular el total de inscritos:');
const sumaInscritos = talleres.reduce((acumulado, t) => acumulado + t.inscritos, 0);
console.log('El total de inscritos hasta el momento es: ' + sumaInscritos);
 
// TODO: filter + map encadenados — nombres de los talleres que SÍ tienen cupo disponible
console.log("Aplicando filter + map para obtener los talleres con cupo disponible:");
const talleresConCupo = talleres
    .filter((t) => t.inscritos < t.cupo)
    .map((t) => t.nombre);
console.log(talleresConCupo.join(' - '));