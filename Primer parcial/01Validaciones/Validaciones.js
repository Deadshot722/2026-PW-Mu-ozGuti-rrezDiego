/*
Las valiodaciones de un formulario son expresiones regulares, las cuales las podemos devidir en tres partes:

1.-Para el texto (nombre)
2.-Para el número de boleta(boleta)
3.-Para la fecha(fecha)

Una expresion regular, es un patron donde se in¿dentifica que elementos validos vs cuales no, son reglas mediante las cuales realizamos la validacion de ls datos ingresados por el usuario, en este caso, en un formulario.

*/
const patrones = {
    nombre : /^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ\s{2,60}]$/,
    boleta :/^\d{10}$/,
    fecha : /^(0[1-9])|[12]\d|3[01]\/(0[1-9]|1[1-2])\/\d{4}$/
};
cost mensajes = {
    nombre : "Solo letras y rspacios, entre 2 y 60 catacteres.",
    boleta :"Debe tener exactamente 10 digitos"
    fechas: "Formaso esperrando : DD/MM/AAA(ej 01/01/2023)"
};
function validarCampo(campo,valor){
    return patrones [campo].test()(valor.trim())
};
if (typeof document !== 'undefined') {
    const formulario = document.getElementById('form-registro');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        //tenemos que validar campo por campo
        for(const campo of Object.keys(patrones)){
            const input =document.getElementById(campo);
            const spanError = document.getElementById('error-${campo}');
            const esValido =validarCampo(campo, input.value);

            input.classList.toggle('invalido', !esValido);
            spanError.textContent = esValido ? '' : mensajes[campo];
            if(!esValido) formularioValido = false; 
        }

        const mensajeExito = document.getElementById('mensaje-exito');
        mensajeExito.textContent = formularioValido ? 'Registro exitoso!' : '';
    })
}