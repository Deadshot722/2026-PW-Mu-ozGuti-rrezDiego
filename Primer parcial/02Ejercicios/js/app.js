


function pintarTbla(){
    //debe obtener la tabla y rellenarla con los datos de talleres
    const tabla = document.querySelector('#tablas-talleres tbody')

    talleres.forEach((t) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${t.nombre}</td>
            <td>${t.instructor}</td>
            <td>${t.cupo}</td>
            <td>${t.inscritos}</td>
        `;
        tabla.appendChild(fila);
    });
}

const formArreglos = document.getElementById('form-arreglos');
const resultadoArreglos = document.getElementById('resultado-arreglo');
const selectOperacionArreglo = document.getElementById('operacion-arreglo');

formArreglos.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const operacion = selectOperacionArreglo.value;

    let resultado;

    switch(operacion){
         case 'forEach':
            resultado = talleres
                .map((t) => `- ${t.nombre} (${t.inscritos}/${t.cupo})`)
                .join('\n');
            break;

        case 'map':
            resultado = talleres
                .map((t) => t.nombre)
                .join('\n');
            break;

        case 'filter':
            resultado = talleres
                .filter((t) => t.inscritos >= t.cupo)
                .map((t) => t.nombre)
                .join('\n');
            break;

        case 'find':
            const encontrado = talleres.find(
                (t) => t.instructor === 'Ing. María López'
            );

            resultado = encontrado
                ? `${encontrado.nombre} - ${encontrado.instructor}`
                : 'No se encontró el taller';
            break;
    }
    resultadoArreglos.textContent = resultado;
});

// Ejercicio de objeto

const formObjeto = document.getElementById('form-objeto');
const resultadoObjeto = document.getElementById('resultado-objeto');

formObjeto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    //necesitamos construir el objeto del taller
    const taller = {
        nombre : document.getElementById('obj-nombre').value,
        instructor : document.getElementById('obj-instructor').value,
        cupo : Number(document.getElementById('obj-cupo').value),
        inscritos : Number(document.getElementById('obj-inscritos').value)

    };

    const operacion = document.getElementById('operacion-objeto').value;

    let resultado;

    switch(operacion) {
        case 'keys':
            resultado = JSON.stringify(Object.keys(taller));
            break;

        case 'values':
            const valores = Object.values(taller);

            resultado = [valores.join("\n"),'',`tipo: ${typeof valores}`].join("\n");
        break;

        case 'entries':
            const entradas = Object.entries(taller);

            resultado = [entradas.map(([campo, valor]) => `${campo}: ${valor}`),'',`tipo: ${typeof entradas}`].join("\n");
        break;

        case 'stringify':
            // Jimmy
            const textoJson = JSON.stringify(taller, null, 2);
            resultado = `${textoJson}\n \n tipo: ${typeof textoJson}`;
            break;

        case 'roundtrip':
            // Jimmy
            const textoJsons = JSON.stringify(taller, null, 2);
            const objetoDeVuelta = JSON.parse(textoJsons);

            resultado = [
                textoJsons,
                '',
                `tipo:${typeof objetoDeVuelta}`,
                objetoDeVuelta.nombre
            ].join(`\n`);
            break;
    }
    

    resultadoObjeto.textContent = resultado;
});

pintarTbla();