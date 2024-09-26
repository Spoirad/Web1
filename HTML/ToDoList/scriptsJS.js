document.addEventListener('DOMContentLoaded', function () {
    const formTareas = document.getElementById('form-tareas');
    const listaTareas = document.getElementById('lista-tareas');
    
    // Función para agregar una nueva tarea
    formTareas.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const inputTarea = document.getElementById('nueva-tarea');
        const tareaTexto = inputTarea.value;
        
        // Crear un nuevo elemento li para la tarea
        const nuevaTarea = document.createElement('li');
        nuevaTarea.innerHTML = `
            <span>${tareaTexto}</span>
            <div>
                <button class="completar">Completar</button>
                <button class="eliminar">Eliminar</button>
            </div>
        `;
        
        // Añadir la nueva tarea a la lista
        listaTareas.appendChild(nuevaTarea);
        
        // Limpiar el input
        inputTarea.value = '';
        
        // Asignar eventos a los botones de completar y eliminar
        asignarEventos(nuevaTarea);
    });

    // Función para asignar los eventos de completar y eliminar a una tarea
    function asignarEventos(tarea) {
        // Botón para marcar como completada
        const botonCompletar = tarea.querySelector('.completar');
        botonCompletar.addEventListener('click', function () {
            tarea.classList.toggle('completed');
        });

        // Botón para eliminar la tarea
        const botonEliminar = tarea.querySelector('.eliminar');
        botonEliminar.addEventListener('click', function () {
            tarea.remove();
        });
    }

    function download(){
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => console.log(data));

        const titleList = document.getElementById('titleList');
        titleList.innerHTML = '';


        data.slice(0,10).forEach(todo=> {
            const li = document.createElement('li');
            li.textContent = todo.title;
            titleList.appendChild(li);
        });

    }

});
