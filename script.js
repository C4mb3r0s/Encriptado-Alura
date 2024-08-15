
// Obtener elementos del DOM
const textArea = document.querySelector('.mensaje');
const mensaje = document.querySelector('.mens-enc');
const divMensajes = document.querySelector('.mensajes'); // Obtener el div mensajes
const btnEncriptar = document.querySelector('.btn-encrip');
const btnDesencriptar = document.querySelector('.btn-desencrip');
const btnCopiar = document.querySelector('.btn-copiar');
const mensajeError = document.createElement('div'); // Crear un elemento para el mensaje de error

// Agregar estilos al mensaje de error
mensajeError.style.color = 'red';
mensajeError.style.fontSize = '14px';
mensajeError.style.marginTop = '5px';
mensajeError.textContent = ''; // Inicialmente, el mensaje está vacío
textArea.parentNode.insertBefore(mensajeError, textArea.nextSibling); // Insertar el mensaje de error después del textarea

// Función para verificar y prevenir caracteres no permitidos
function verificarTexto(event) {
  const texto = textArea.value;
  const textoNormalizado = normalizarTexto(texto);

  if (texto !== textoNormalizado) {
    mensajeError.textContent = 'No se permiten letras mayúsculas ni acentos.';
    textArea.value = textoNormalizado; // Normalizar automáticamente el texto
  } else {
    mensajeError.textContent = ''; // Limpiar el mensaje de error si el texto es válido
  }
}

// Función para normalizar el texto (eliminar acentos y convertir a minúsculas)
function normalizarTexto(texto) {
  return texto
    .toLowerCase() // Convertir a minúsculas
    .normalize("NFD") // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, ""); // Eliminar diacríticos (acentos)
}

// Función de encriptación
function encriptar(texto) {
  texto = normalizarTexto(texto); // Normalizar el texto antes de encriptar
  const reglas = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };
  return texto.split('')
    .map(char => reglas[char] || char)
    .join('');
}

// Función de desencriptación
function desencriptar(texto) {
  const reglas = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
  };
  let resultado = texto;
  for (const [clave, valor] of Object.entries(reglas)) {
    resultado = resultado.split(clave).join(valor);
  }
  return resultado;
}

// Función para actualizar la visibilidad de los elementos
function actualizarElementos() {
  if (mensaje.value.trim() === '') {
    mensaje.classList.remove('ocultar-imagen');  // Muestra la imagen de fondo
    btnCopiar.style.display = 'none';  // Ocultar el botón copiar
    divMensajes.style.display = 'flex'; // Mostrar el div mensajes
  } else {
    mensaje.classList.add('ocultar-imagen');  // Oculta la imagen de fondo
    btnCopiar.style.display = 'block';  // Mostrar el botón copiar
    divMensajes.style.display = 'none'; // Ocultar el div mensajes
  }
}

// Event listeners para los botones
btnEncriptar.addEventListener('click', () => {
  const texto = textArea.value;
  mensaje.value = encriptar(texto);
  actualizarElementos();  // Actualiza la visibilidad de los elementos
});

btnDesencriptar.addEventListener('click', () => {
  const texto = textArea.value;
  mensaje.value = desencriptar(texto);
  actualizarElementos();  // Actualiza la visibilidad de los elementos
});

// Copiar al portapapeles
btnCopiar.addEventListener('click', () => {
  mensaje.select();
  document.execCommand('copy');
});

// Verificar el texto en tiempo real mientras el usuario escribe
textArea.addEventListener('input', verificarTexto);

// Inicializar la visibilidad de los elementos cuando la página carga
actualizarElementos();
