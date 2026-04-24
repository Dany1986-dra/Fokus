# Fokus LocalStoragl

> Aplicación web de productividad orientada a sesiones de enfoque tipo Pomodoro con gestión de tareas persistentes en `localStorage`.

## ✨ Resumen

Proyecto desarrollado para reforzar competencias de frontend con JavaScript, manipulación del DOM y persistencia de datos en el navegador. La interfaz integra temporizador, audio de apoyo y una lista de tareas con estado activo.

## ℹ️ Información importante

- La aplicación se ejecuta directamente en el navegador, sin proceso de compilación.
- Las tareas se almacenan en `localStorage`, una API del navegador de tipo Web Storage, bajo la clave `tareas`.
- El temporizador y el CRUD de tareas se distribuyen en [script.js](script.js) y [script-crud.js](script-crud.js).
- Existe una región accesible `#a11y-status` para anunciar cambios de estado al lector de pantalla.
- La documentación de QA vive en [docs](docs) y complementa la validación funcional y de accesibilidad.

## 🎯 Objetivo general

Construir una aplicación web que permita gestionar tiempos de enfoque y una lista de tareas, manteniendo el estado entre sesiones mediante almacenamiento local.

## 🧩 Funcionalidades principales

- ⏱️ Temporizador con modos de enfoque y descanso.
- ▶️ Control de inicio y pausa del temporizador.
- 🎵 Audio de apoyo en la experiencia de uso.
- 📝 Formulario para agregar tareas con validación.
- ✏️ Edición de la descripción por tarea.
- 📍 Selección de tarea activa que actualiza el área `#En proceso`.
- ✔️ Marcado de tareas completadas al finalizar el enfoque.
- 🗑️ Eliminación de tareas completadas (remover concluidas).
- 🗑️ Eliminación de todas las tareas (remover todas con confirmación).
- 💾 Persistencia de tareas en la clave `tareas` de `localStorage`.
- ♿ Región de estado accesible `#a11y-status` para anuncios de cambios en la interfaz.
- 📢 Anuncios de accesibilidad (aria-live) para operaciones críticas.

## 🛠️ Tecnologías utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)
![Web Storage API](https://img.shields.io/badge/Web%20Storage%20API-0B2E57?style=for-the-badge&logo=googlechrome&logoColor=white)
![Live Server](https://img.shields.io/badge/Live%20Server-5C2D91?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![WCAG 2.1](https://img.shields.io/badge/WCAG%202.1%20AA-009900?style=for-the-badge&logo=accessibility&logoColor=white)

- HTML5 para la estructura semántica del documento.
- CSS3 para estilos, estados visuales y comportamiento responsive.
- JavaScript (ES6+) para la lógica de temporizador, tareas y accesibilidad.
- Web Storage API (`localStorage`) para persistencia de datos en el navegador.
- WCAG 2.1 AA para accesibilidad web.
- Live Server como herramienta de desarrollo para pruebas locales.

## 🗂️ Estructura del módulo

- [index.html](index.html): estructura principal de la interfaz.
- [styles.css](styles.css): estilos, estados visuales y responsive.
- [script.js](script.js): lógica del temporizador.
- [script-crud.js](script-crud.js): lógica de tareas, persistencia y accesibilidad.
- [imagenes](imagenes): recursos visuales.
- [sonidos](sonidos): recursos de audio.
- [docs/](docs): documentación de QA y accesibilidad.

## 🚀 Ejecución del proyecto

1. Abrir la carpeta [LocalStoragl](.) en VS Code.
2. Levantar un servidor local estático, preferiblemente con Live Server.
3. Abrir la URL local en el navegador.

## 📋 Guía de uso

1. Haz clic en `Agregar nueva tarea`.
2. Escribe la descripción (no permite vacías).
3. Haz clic en `Guardar`.
4. Haz clic sobre una tarea para marcarla como activa.
5. Verifica el reflejo de la selección en el área `#En proceso`.
6. Usa el icono de edición para actualizar la descripción.
7. Usa el menú (⋮) para remover tareas completadas o todas.

## 💾 Persistencia de datos

- Clave: `tareas`.
- Formato: arreglo de objetos JSON.

Ejemplo:

```json
[
  { "descripcion": "Preparar clase", "complete": false },
  { "descripcion": "Revisar ejercicios", "complete": true }
]
```

## ✅ Criterios de aceptación

- La aplicación carga sin errores bloqueantes en consola.
- Se puede agregar al menos una tarea y se mantiene tras recargar.
- Se puede editar una tarea existente.
- Al seleccionar una tarea, se aplica el estilo activo y se actualiza `#En proceso`.
- Los cambios de estado se anuncian en la región accesible `#a11y-status`.
- El temporizador responde al cambio de contexto y al inicio/pausa.
- Validación de entrada (no permite tareas vacías).
- Confirmación antes de borrar todas las tareas.

## 🧪 Checklist de validación

- [x] Carga inicial correcta.
- [x] Agregado de tareas funcional con validación.
- [x] Edición de tareas funcional.
- [x] Persistencia en `localStorage` validada.
- [x] Selección de tarea activa visible.
- [x] Actualización del área `#En proceso` correcta.
- [x] Flujo base del temporizador funcional.
- [x] Anuncios de accesibilidad implementados.
- [x] Eliminación de tareas con confirmación.

## 🧾 Documentación de QA

- [QA README](docs/QA-README.md)
- [QA Checklist](docs/QA-CHECKLIST.md) - Incluye pruebas de eliminación
- [Requirements Traceability Matrix](docs/REQUIREMENTS-TRACEABILITY.md)
- [Accessibility Statement](docs/ACCESSIBILITY-STATEMENT.md)

## 🛟 Incidencias comunes

### No guarda tareas

- Revisar errores en [script-crud.js](script-crud.js).
- Confirmar la presencia de `.app__form-add-task` en [index.html](index.html).
- Limpiar `localStorage.tareas` si el JSON está corrupto.

### No aplica estilo activo

- Verificar la regla `.app__section-task-list-item-active.app__section-task-list-item` en [styles.css](styles.css).
- Confirmar que el clic se ejecute sobre el `li` creado dinámicamente.

### Mensaje "form detection precheck code injected"

- Suele provenir de extensiones del navegador, no del proyecto.
- Validar el comportamiento en modo incógnito o sin extensiones.

---

## 🔧 CAMBIOS RECIENTES (v2.0) - Mejoras de Accesibilidad y Validación

### Implementación de 6 mejoras principales en eliminación de tareas (script-crud.js)

Se optimizó completamente el módulo de eliminación y validación con mejoras críticas de accesibilidad, validación de datos y experiencia de usuario.

**Problemas corregidos en v1.0:**
- ❌ Error de sintaxis: `const btnTareasCompletas.onclick = ...`
- ❌ Variable `selector` usada antes de ser declarada
- ❌ Tipo de dato incorrecto: `tareas = ""` en lugar de `tareas = []`
- ❌ Asignaciones duplicadas y conflictivas de eventos

### 6 MEJORAS IMPLEMENTADAS:

#### 1. ✅ VALIDACIÓN ROBUSTA DE ENTRADA
```javascript
const descripcion = textarea.value.trim()
if (!descripcion) {
    const a11yStatus = document.getElementById("a11y-status")
    a11yStatus.textContent = "Error: la tarea no puede estar vacía"
    textarea.focus()
    return
}
```
- **Beneficio:** No permite tareas vacías o con solo espacios
- **Accesibilidad:** Anuncio de error para lectores de pantalla
- **UX:** Focus automático para corrección inmediata
- **Código limpio:** Trimming automático y validación temprana

#### 2. ✅ CONFIRMACIÓN ANTES DE BORRAR TODO
```javascript
btnEliminarTareas.onclick = () => {
    if (confirm("¿Estás seguro de que deseas eliminar TODAS las tareas?...")) {
        eliminarTareas(false);
    }
};
```
- **Beneficio:** Previene borrados accidentales irreversibles
- **UX:** Dialogo claro y explícito
- **Seguridad:** Acción confirmable por el usuario
- **Mensajería:** Advertencia clara sobre la irreversibilidad

#### 3. ✅ ANUNCIOS DE ACCESIBILIDAD (aria-live)
```javascript
// Al agregar
a11yStatus.textContent = `Tarea agregada: ${descripcion}`

// Al completar
a11yStatus.textContent = `Tarea completada: ${tareaSeleccionada.descripcion}`

// Al eliminar
a11yStatus.textContent = `Se eliminaron ${cantidadEliminadas} tarea(s) completada(s)`
```
- **Beneficio:** Compatible total con lectores de pantalla
- **Accesibilidad:** Anuncios en tiempo real de cambios
- **Feedback:** Información específica (no genérica)
- **Inclusión:** Usuarios no videntes reciben toda la información

#### 4. ✅ VARIABLE RENOMBRADA PARA CLARIDAD
- **Cambio:** `soloCompletas` → `eliminarSoloCompletadas`
- **Beneficio:** Código autoexplicativo y más mantenible
- **Readabilidad:** Semántica clara del parámetro booleano
- **Profesionalismo:** Estándar de nomenclatura mejorado

#### 5. ✅ MANEJO INTELIGENTE DE SELECCIÓN
```javascript
if (tareaSeleccionada && elementos.some(e => e === liTareaSeleccionada)) {
    pDescTarea.textContent = ""
    tareaSeleccionada = null
    liTareaSeleccionada = null
}
```
- **Beneficio:** Limpia automáticamente la sección "En proceso"
- **Prevención:** Evita referencias colgantes y errores
- **Lógica:** Resetea estado interno correctamente
- **Robustez:** Manejo correcto de casos borde

#### 6. ✅ CONTADOR DINÁMICO DE TAREAS ELIMINADAS
```javascript
const cantidadEliminadas = elementos.length;
const mensaje = eliminarSoloCompletadas 
    ? `Se eliminaron ${cantidadEliminadas} tarea(s) completada(s)`
    : `Se eliminaron todas las ${cantidadEliminadas} tarea(s)`
```
- **Beneficio:** Feedback específico y cuantificable
- **UX:** El usuario sabe exactamente cuántas se eliminaron
- **Accesibilidad:** Información clara para todos
- **Dinámico:** Adapta el mensaje a la acción realizada

### VALIDACIÓN DE FUNCIONALIDADES (v2.0):

| Funcionalidad | Estado | Detalles |
|---------------|--------|----------|
| Agregar tarea | ✅ | Con validación de entrada |
| Validar entrada | ✅ | No permite vacías o solo espacios |
| Completar tarea | ✅ | Con anuncio accesible |
| Eliminar completas | ✅ | Funcional sin confirmación |
| Eliminar todas | ✅ | Con confirmación preventiva |
| Persistencia | ✅ | localStorage funcional |
| Anuncios a11y | ✅ | aria-live operacional |
| Sin errores | ✅ | Consola limpia |
| Integridad datos | ✅ | Type de datos preservado |
| Manejo selección | ✅ | Limpieza correcta |

### DOCUMENTACIÓN ACTUALIZADA:

- ✅ [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md) - Pruebas de eliminación documentadas
- ✅ README.md - Cambios y mejoras documentados
- ✅ Código comentado - Explicaciones claras en script-crud.js

## 🔮 Mejoras futuras

- Incorporar eliminación individual por tarea con confirmación.
- Agregar pruebas automatizadas (Jest/Vitest) para CRUD.
- Implementar deshacer/rehacer para acciones destructivas.
- Agregar categorías, prioridades y fechas a las tareas.
- Estadísticas: contador de tareas (total, completas, pendientes).
- Exportar/importar tareas en JSON o CSV.

---

**Última actualización:** 24 de abril de 2026  
**Versión:** 2.0 - Mejoras de accesibilidad y validación  
**Autor:** Daniel Rivera Alpízar - Alura Latam
