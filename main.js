// palabras para el juego, agregar las que quieran siempre de 5 letras
// es un array de strings (dict por dictionary)
let dict = [
  'gatos',
  'papas',
  'fuego',
  'huevo',
  'color',
  'casas',
  'arbol',
  'nueve',
  'zorro',
  'remar',
  'locro',
  'jamon',
  'feliz',
  'cinco',
  'tonto',
  'cuero',
  'volar',
  'vuelo',
  'avion',
  'genio',
  'pibes',
  'ratas',
  'sapos',
  'patos',
  'temas',
  'cazar',
  'matar',
  'robar',
  'siete',
  'trece',
  'casar',
  'almas',
  'alaba',
  'carta',
  'sopas',
  'raton',
  'pozos',
  'cebra',
  'dados',
  'darlo',
  'marte',
  'pizza',
  'copas',
  'metal',
  'limon',
  'sobra',
  'juego',
  'dardo',
  'termo',
  'metro',
  'litro',
  'kilos',
  'calor',
  'vasos',
  'boton',
  'besar',
  'nacer',
  'comer',
  'lente',
  'negro',
  'dedos',
  'pacto',
  'parto',
  'trato',
  'actor',
  'pista',
  'poste',
  'punta',
  'punto',
  'trata',
  'rosal',
  'armar',
  'quita',
  'bolsa',
  'parte',
  'surco',
  'burdo',
  'zurdo',
  'bidon',
  'vigor',
  'cauto',
  'urnas',
  'solar',
  'burla',
  'parra',
  'pardo',
  'pieza',
  'carro',
  'caldo',
  'mango',
  'morro',
  'canto',
  'sordo',
  'prima',
  'prisa',
  'bruma',
  'pluma',
  'casco',
  'brazo',
  'brote',
  'siglo',
  'silla',
  'sigla',
  'signo',
  'brisa',
  'poder',
  'armas',
  'atlas',
  'cardo',
  'karma',
  'bulto',
  'ascua',
  'perro',
  'topos',
  'bolso',
  'crios',
  'mando',
  'palta',
  'falta',
  'truco',
  'union',
  'disco',
  'ratos',
  'sazon',
  'ricos',
  'motor',
  'tazon'
];
// ocultar perdiste y Ganaste
document.getElementById('win').style.display = 'none';
document.getElementById('perdiste').style.display = 'none';
//boton de recargar
let boton_recargar = document.getElementById('Boton_Recargar');
boton_recargar.hidden = true;
let text = document.getElementById('res');
// intentos
let indice = Math.trunc(Math.random() * 127);
let bien = dict[indice];
console.log(bien);
let respuesta = document.getElementById('res').value;
let intentos = 0;

function handleChange(e) {
  let respuesta = document.getElementById('res').value;
  let res = respuesta.toLowerCase();
  if (res.length != 5) {
    alert("Tienen que ser 5 letras");
    return;
  }

  let wordle = document.getElementById('game');
  let letrasCorrectas = new Set(); // Conjunto para almacenar las letras que ya han sido marcadas como correctas en la palabra correcta

  // Contar la cantidad de veces que cada letra aparece en la palabra correcta
  let countBien = {}; // Objeto para contar las ocurrencias de letras en la palabra correcta
  bien.split('').forEach(letter => {
    countBien[letter] = (countBien[letter] || 0) + 1;
  });

  for (let i = 0; i < 1; i++) {
    let row = document.createElement("div");
    row.className = "tabla";

    // Primero procesamos las letras marcadas como correctas (verdes)
    for (let j = 0; j < 5; j++) {
      let caja = document.createElement("div");
      caja.textContent = res[j];
      if (res[j] == bien[j]) {
        caja.style.backgroundColor = 'green';
        letrasCorrectas.add(res[j]); // Agregar la letra marcada como correcta al conjunto
      }
      caja.className = "cajas";
      row.appendChild(caja);
    }

    // Luego procesamos las letras restantes para marcarlas como amarillas si corresponde
    for (let j = 0; j < 5; j++) {
      let caja = row.children[j];
      if (caja.style.backgroundColor !== 'green') {
        if (bien.includes(res[j]) && countBien[res[j]] == 1 && !letrasCorrectas.has(res[j])) {
          // Verificar si la letra aparece solo una vez en la palabra correcta y no ha sido marcada como amarilla previamente
          caja.style.backgroundColor = 'yellow'; // Marcar la letra como amarilla si aparece en la palabra correcta
          letrasCorrectas.add(res[j]); // Marcar la letra como ya marcada para evitar repetirla
        } else if (bien.includes(res[j]) && !letrasCorrectas.has(res[j])) {
          // Verificar si la letra está en la palabra correcta y no ha sido marcada como correcta previamente ni como amarilla
          caja.style.backgroundColor = 'yellow'; // Marcar la letra como amarilla si aparece en la palabra correcta
        } else {
          caja.style.backgroundColor = 'gray'; // Si la letra no está en la palabra correcta, marcarla como gris
        }
      }
    }

    // Agregar la fila al juego
    wordle.appendChild(row);

    // Verificar si se ha ganado el juego
    if (bien === res) {
      document.getElementById('win').style.display = 'block';
      boton_recargar.hidden = false;
      text.hidden = true;
    }

    // Incrementar el número de intentos
    intentos++;

    // Verificar si se ha perdido el juego
    if (intentos == 6) {
      document.getElementById('perdiste').style.display = 'block';
      boton_recargar.hidden = false;
      text.hidden = true;
    }
  }
}

function recargar() {
  location.reload()
}
