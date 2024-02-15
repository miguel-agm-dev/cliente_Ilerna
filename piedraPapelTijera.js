// Array de posibilidades
var posibilidades = ["piedra", "papel", "tijera"];

// Creación de variables generales
var opcionesJugador = Array.from(document.getElementsByTagName("img"));
var campoNombre = "";
var seleccionMaquina;
var divMaquina = opcionesJugador[opcionesJugador.length - 1];

// Función Primer botón del objeto documento, preparación de partida
document.getElementsByTagName("button")[0].addEventListener("click", function(){
    let nombreJugador = document.getElementsByTagName("input")[0];
    let numPartidas = document.getElementsByTagName("input")[1];

    // Condicionales para añadir campo rojo
    const esNombreValido = validezNombre(nombreJugador.value);
    nombreJugador.classList.toggle("fondoRojo", !esNombreValido);

    const esCantidadValida = numPartidas.value > 0;
    numPartidas.classList.toggle("fondoRojo", !esCantidadValida);

    // Condición de confirmación de datos y preparación de partida
    if (esNombreValido && esCantidadValida) {
        campoNombre = nombreJugador.value;
        nombreJugador.disabled = numPartidas.disabled = true;
        document.getElementById("total").textContent = numPartidas.value;
    }
}, false);

//Función Segundo botón del objeto documento, desarrollo de partida
document.getElementsByTagName("button")[1].addEventListener("click", function(){
    const actualElement = document.getElementById("actual");
    const totalElement = document.getElementById("total");
    const actualValue = Number(actualElement.innerHTML);

    //Condición hasta completar numeros de partidas
    if (actualValue < Number(totalElement.innerHTML)) {
        seleccionMaquina = opcionAleatoria(posibilidades);
        divMaquina.src = rutaDeImagen(seleccionMaquina, "Ordenador"), divMaquina.id = seleccionMaquina;
        actualElement.innerHTML = actualValue + 1;
        resultadoRonda(seleccionMaquina);
    }
}, false);

//Función Tercer botón del objeto documento, restablecer partida
document.getElementsByTagName("button")[2].addEventListener("click", function(){
    let nombreJugador = document.getElementsByTagName("input")[0];
    let numPartidas = document.getElementsByTagName("input")[1];
    opcionesJugador[opcionesJugador.length - 1].src = rutaDeImagen("", "defecto");
    nombreJugador.disabled = numPartidas.disabled = false;
    numPartidas.value = 0;
    document.getElementById("total").innerHTML = document.getElementById("actual").innerHTML = "0";
    document.getElementById("historial").appendChild(document.createElement("li")).textContent = "Nueva partida";
}, false);

// Función para validar el nombre
function validezNombre(campoNombre) {
    return campoNombre.length > 3 && isNaN(campoNombre[0]);
}

// Función para retornar ruta de imagen
function rutaDeImagen(opcion, participante) {
    return `img/${opcion}${participante}.png`;
}

// Función para generar opción aleatoria
function opcionAleatoria(posibilidades) {
    return posibilidades[Math.floor(Math.random() * posibilidades.length)];
}

// Función para establecer resultados
function resultadoRonda(ronda) {
    const seleccionado = opcionesJugador.find(opcion => opcion.classList.contains("seleccionado")).id;
    const resultado = determinarResultado(posibilidades.indexOf(divMaquina.id), posibilidades.indexOf(seleccionado));

    //Switch para generar resultados en historial
    switch (resultado) {
        case "ganar":
            document.getElementById("historial").appendChild(document.createElement("li")).textContent = `Gana ${campoNombre}`;
            break;
        case "empate":
            document.getElementById("historial").appendChild(document.createElement("li")).textContent = "Empate";
            break;
        case "perder":
            document.getElementById("historial").appendChild(document.createElement("li")).textContent = "Gana la máquina";
            break;
    }
}

//Función para determinar el resultado
function determinarResultado(indexMaquina, indexJugador) {
    const totalOpciones = posibilidades.length;

    if (indexMaquina === indexJugador) {
        return "empate";
    } else if ((indexMaquina + 1) % totalOpciones === indexJugador) {
        return "ganar";
    } else {
        return "perder";
    }
}

// Bucle para asignar imágenes de selección y cambiar estilo de selección
for (let i = 0; i < opcionesJugador.length - 1; i++) {
    opcionesJugador[i].id = posibilidades[i], opcionesJugador[i].src = rutaDeImagen(posibilidades[i], "Jugador", ".png");
    opcionesJugador[i].addEventListener("click", function(cambioEstilo){
        cambioEstilo.target.classList.add("seleccionado");
        cambioEstilo.target.classList.remove("noSeleccionado");
        for (const opcion of opcionesJugador.slice(0, -1)) {
            if (opcion !== cambioEstilo.target) {
                opcion.classList.remove("seleccionado");
                opcion.classList.add("noSeleccionado");
            }
        }
    }, false);
}
