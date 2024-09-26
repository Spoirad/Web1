// Función para calcular el área del triángulo
function calcularArea(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores de base y altura
    const base = parseFloat(document.getElementById('base').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validar que ambos valores son números positivos
    if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
        alert("Por favor, ingresa valores válidos para la base y la altura.");
        return;
    }

    // Calcular el área
    const area = (base * altura) / 2;

    // Mostrar el resultado en el HTML
    document.getElementById('resultado').textContent = `El área del triángulo es: ${area} unidades cuadradas.`;
}

// Función para borrar los campos y el resultado
function borrarCampos() {
    // Limpiar los valores de los inputs
    document.getElementById('base').value = '';
    document.getElementById('altura').value = '';

    // Limpiar el resultado
    document.getElementById('resultado').textContent = '';
}

// Asignar el evento al formulario cuando la página esté cargada
document.addEventListener('DOMContentLoaded', function () {
    // Evento para calcular el área
    document.getElementById('form-triangulo').addEventListener('submit', calcularArea);

    // Evento para borrar los campos
    document.getElementById('borrar').addEventListener('click', borrarCampos);
});