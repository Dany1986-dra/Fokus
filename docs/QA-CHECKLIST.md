# QA Checklist - Fokus LocalStoragl

Este documento reúne las pruebas mínimas recomendadas para validar calidad funcional, visual, de rendimiento y de accesibilidad antes de publicar.

## 1) Smoke Test (rápido)

- Carga inicial sin errores visuales ni de consola.
- Temporizador visible y controles operativos.
- Sección de tareas sin elementos montados fuera del contenedor.
- Tema y sonidos conmutan correctamente.

## 2) Pruebas Funcionales

### Temporizador

- Cambiar entre modos de enfoque y descanso actualiza la duración.
- `Comenzar` inicia el conteo regresivo.
- `Pausar` detiene el conteo sin perder el tiempo restante.
- `Reiniciar` vuelve al tiempo base del modo activo.
- Al finalizar, se reproduce la alerta y el estado vuelve a listo.

### CRUD Tareas

- Crear tarea con descripción válida.
- Validación de descripción vacía.
- Marcar y desmarcar tarea activa.
- Editar una tarea individual.
- Persistencia tras recargar (`localStorage`).

#### Eliminación de Tareas (Corrección Reciente)

**Escenario 1: Remover solo tareas completadas**
- [ ] Crear al menos 3 tareas.
- [ ] Completar 1 o 2 tareas (seleccionar y activar temporizador hasta completar).
- [ ] Hacer clic en botón "Remover concluidas".
- [ ] Verificar que **solo desaparecen las tareas completadas**.
- [ ] Confirmar que las tareas incompletas **siguen visibles** en la lista.
- [ ] Recargar la página (`F5`).
- [ ] Validar en `localStorage` que las tareas incompletas persisten correctamente.

**Escenario 2: Remover todas las tareas**
- [ ] Crear al menos 2 tareas (completas e incompletas).
- [ ] Hacer clic en botón "Remover todas".
- [ ] Verificar que **desaparecen todas las tareas** (completas e incompletas).
- [ ] Confirmar que la lista queda **vacía**.
- [ ] Recargar la página (`F5`).
- [ ] Validar que `localStorage.tareas` contiene un arreglo vacío `[]`.

**Escenario 3: Persistencia después de eliminación**
- [ ] Crear varias tareas.
- [ ] Completar algunas.
- [ ] Usar "Remover concluidas" o "Remover todas".
- [ ] Abrir herramientas de desarrollador (`F12`) → Tab de **Application** → **localStorage**.
- [ ] Verificar que la clave `tareas` refleja correctamente el estado actual (arreglo con tareas restantes o vacío).
- [ ] Recargar la página.
- [ ] Confirmar que el estado se preserva exactamente como se guardó.

**Escenario 4: Sin errores en consola**
- [ ] Ejecutar "Remover concluidas" y "Remover todas".
- [ ] Abrir consola (`F12` → Tab **Console**).
- [ ] Verificar que **no hay errores** (`error`, `undefined`, `Uncaught`).
- [ ] Confirmar que solo aparecen logs normales (ej: `console.log(tareas)`).

## 3) Pruebas UI/Responsive

Validar al menos en anchos: `360`, `390`, `768`, `1024`, `1366`.

- Hero con imagen visible dentro del cuadro.
- Bloques sin solapamientos.
- Tarjetas de tarea sin colisiones entre texto y botones.
- Botones de temporizador apilados en móvil y alineados en desktop.

## 4) Accesibilidad (mínimo WCAG 2.2 AA)

- Navegación completa por teclado (Tab, Shift+Tab, Enter, Space).
- Foco visible en todos los controles interactivos.
- Labels y descripciones disponibles para formularios.
- Regiones dinámicas con `aria-live`.
- Revisar contraste de color con Lighthouse o herramienta equivalente.
- Ejecutar auditoría Lighthouse Accessibility con objetivo >= 95.

## 5) Rendimiento básico

- Primera carga sin bloqueos.
- Recursos estáticos cargan sin 404.
- Sin errores de JavaScript en consola.

## 6) Criterio de salida (Definition of Done)

- Sin errores funcionales críticos.
- Sin solapamiento visual en breakpoints objetivo.
- Accesibilidad validada manualmente y con Lighthouse.
- README y docs actualizados.
