// Referencias a elementos de la interfaz para evitar buscarlos repetidamente en el DOM.
const btnAgregarTarea = document.querySelector(".app__button--add-task")
const formAgregarTarea = document.querySelector(".app__form-add-task")
const textarea = document.querySelector(".app__form-textarea")
const ulTareas = document.querySelector(".app__section-task-list")
const pDescTarea = document.querySelector(".app__section-active-task-description")
const btnMenuTareas = document.querySelector(".app_button-more")
const menuTareas = document.getElementById("task-menu")
const btnTareasCompletas = document.getElementById("btn-remover-concluidas")
const btnEliminarTareas = document.getElementById("btn-remover-todas")

if (btnMenuTareas && menuTareas) {
    btnMenuTareas.onclick = function (evento) {
        evento.stopPropagation()

        if (menuTareas.hasAttribute("hidden")) {
            menuTareas.removeAttribute("hidden")
            btnMenuTareas.setAttribute("aria-expanded", "true")
        } else {
            menuTareas.setAttribute("hidden", "")
            btnMenuTareas.setAttribute("aria-expanded", "false")
        }
    }

    document.addEventListener("click", function (evento) {
        if (!menuTareas.contains(evento.target) && !btnMenuTareas.contains(evento.target)) {
            menuTareas.setAttribute("hidden", "")
            btnMenuTareas.setAttribute("aria-expanded", "false")
        }
    })
}

// Carga el arreglo de tareas desde localStorage.
// Si no existe nada guardado, usa un arreglo vacio para iniciar.
let tareas = JSON.parse(localStorage.getItem("tareas")) || []
// Guarda la tarea actualmente seleccionada en memoria (objeto de datos).
let tareaSeleccionada = null
// Guarda el <li> seleccionado para aplicar/quitar clases visuales.
let liTareaSeleccionada = null
console.log(tareas)

function actualizarTareas() {
    // Persiste el estado actual de tareas para no perder cambios al recargar.
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function crearElementoTarea(tarea) {
    // Crea un item visual de tarea (<li>) a partir de un objeto de datos.
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    // Icono de estado (circulo/check) mostrado a la izquierda de cada tarea.
    const svg = document.createElement("svg")
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
</svg>
    `

    // Parrafo que muestra la descripcion textual de la tarea.
    const parrafoDesc = document.createElement("p")
    parrafoDesc.classList.add("app__section-task-list-item-description")
    parrafoDesc.innerText = tarea.descripcion

    // Boton para editar la descripcion de la tarea.
    const btn = document.createElement("button")
    btn.classList.add("app_button-edit")

    btn.addEventListener("click", () => {
        // Solicita la nueva descripcion al usuario.
        const nuevaDescripcion = prompt("¿Cuál es la nueva tarea?")
        console.log(nuevaDescripcion)

        // Si hay texto valido, actualiza la vista y el dato en memoria.
        // Luego persiste el cambio en localStorage.
        if (nuevaDescripcion) {
            parrafoDesc.innerText = nuevaDescripcion
            tarea.descripcion = nuevaDescripcion
            actualizarTareas()
        }

    })

    // Imagen del lapiz para el boton de editar.
    const img = document.createElement("img")
    img.src = "./imagenes/edit.png"

    // Estructura final del item en orden visual: icono, texto y boton.
    li.appendChild(svg)
    li.appendChild(parrafoDesc)

    btn.appendChild(img)

    li.appendChild(btn)

    if(tarea.complete){
        // Si la tarea ya estaba marcada como completa, aplica estilos y bloquea el boton de editar.
        li.classList.add("app__section-task-list-item-complete")
        btn.setAttribute("disabled", "disabled")
    }else{
       li.onclick = () => {

        // Quita el estado "activo" de cualquier otra tarea antes de seleccionar una.
        const elementos = document.querySelectorAll(".app__section-task-list-item-active")
        elementos.forEach((elemento) => {
            elemento.classList.remove("app__section-task-list-item-active")
        })

        // Si se hace clic en la misma tarea ya seleccionada, se deselecciona.
        if (tareaSeleccionada == tarea) {
            // Limpia la descripcion visible del panel de tarea activa.
            pDescTarea.textContent = ""
            // Reinicia referencias de seleccion en memoria.
            tareaSeleccionada = null
            liTareaSeleccionada = null
            // Sale para evitar volver a marcarla como activa en este mismo clic.
            return
        }

        // Guarda la nueva tarea activa tanto en datos como en su nodo DOM.
        tareaSeleccionada = tarea
        liTareaSeleccionada = li

        // Muestra la descripcion de la tarea activa en el panel principal.
        pDescTarea.textContent = tarea.descripcion

        // Aplica estilo visual de seleccion.
        li.classList.add("app__section-task-list-item-active")
        }
    }


    // Devuelve el item listo para insertarse en la lista.
    return li
}

btnAgregarTarea.addEventListener("click", function () {
    console.log("Click")
    // Muestra u oculta el formulario para agregar una nueva tarea.
    formAgregarTarea.classList.toggle("hidden")
})

formAgregarTarea.addEventListener("submit", function (evento) {
    // Evita que el formulario recargue la pagina al enviar.
    evento.preventDefault()
    
    // Valida que la descripción no sea vacía ni solo espacios.
    const descripcion = textarea.value.trim()
    if (!descripcion) {
        // Anuncia el error para accesibilidad.
        const a11yStatus = document.getElementById("a11y-status")
        a11yStatus.textContent = "Error: la tarea no puede estar vacía"
        textarea.focus()
        return
    }
    
    console.log("Guardar", descripcion)

    // Crea el objeto de tarea usando el texto ingresado por el usuario.
    const tarea = {
        descripcion: descripcion
    }

    // Agrega la tarea al arreglo en memoria.
    tareas.push(tarea)

    // Crea su representacion visual y la inserta en la lista del DOM.
    const elementoTarea = crearElementoTarea(tarea)
    ulTareas.appendChild(elementoTarea)

    // Guarda la lista actualizada en localStorage.
    actualizarTareas()

    // Limpia el campo para la siguiente tarea.
    textarea.value = ""

    // Cierra el formulario despues de guardar.
    formAgregarTarea.classList.add('hidden')
    
    // Anuncia a lectores de pantalla.
    const a11yStatus = document.getElementById("a11y-status")
    a11yStatus.textContent = `Tarea agregada: ${descripcion}`

})


// Al iniciar la app, reconstruye la lista visual con lo que estaba guardado.
tareas.forEach((tarea) => {
    const elementoTarea = crearElementoTarea(tarea)
    ulTareas.appendChild(elementoTarea)
})


document.addEventListener("EnfoqueFinalizado", () => {
    if (tareaSeleccionada && liTareaSeleccionada) {
        // Cuando termina el enfoque, marca la tarea activa como completada.
        liTareaSeleccionada.classList.add("app__section-task-list-item-complete")

        // Ya no debe verse como activa porque paso a estado completado.
        liTareaSeleccionada.classList.remove("app__section-task-list-item-active")

        // Bloquea el boton de editar para evitar cambios en tareas completadas.
        liTareaSeleccionada.querySelector("button").setAttribute("disabled", "disabled")

        tareaSeleccionada.complete = true;
        actualizarTareas();
        
        // Anuncia a lectores de pantalla.
        const a11yStatus = document.getElementById("a11y-status")
        a11yStatus.textContent = `Tarea completada: ${tareaSeleccionada.descripcion}`
    }
})

function eliminarTareas(eliminarSoloCompletadas) {
    // Define el selector según el parámetro (renombrado para mayor claridad).
    const selector = eliminarSoloCompletadas 
        ? ".app__section-task-list-item-complete" 
        : ".app__section-task-list-item";
    
    // Obtiene los elementos del DOM con el selector.
    const elementos = document.querySelectorAll(selector);
    const cantidadEliminadas = elementos.length;
    
    // Elimina del DOM las tareas según el selector.
    elementos.forEach((elemento) => {
        elemento.remove();
    });
    
    // Actualiza el arreglo de tareas.
    tareas = eliminarSoloCompletadas 
        ? tareas.filter(tarea => !tarea.complete)
        : [];
    
    // Persiste los cambios en localStorage.
    actualizarTareas();
    
    // Limpia la selección si se eliminó la tarea activa.
    if (tareaSeleccionada && elementos.some(e => e === liTareaSeleccionada)) {
        pDescTarea.textContent = ""
        tareaSeleccionada = null
        liTareaSeleccionada = null
    }
    
    // Anuncia a lectores de pantalla.
    const a11yStatus = document.getElementById("a11y-status")
    const mensaje = eliminarSoloCompletadas 
        ? `Se eliminaron ${cantidadEliminadas} tarea(s) completada(s)`
        : `Se eliminaron todas las ${cantidadEliminadas} tarea(s)`
    a11yStatus.textContent = mensaje
}

btnTareasCompletas.onclick = () => eliminarTareas(true);
btnEliminarTareas.onclick = () => {
    if (confirm("¿Estás seguro de que deseas eliminar TODAS las tareas? Esta acción no se puede deshacer.")) {
        eliminarTareas(false);
    }
};
