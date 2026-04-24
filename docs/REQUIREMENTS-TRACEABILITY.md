# Requirements Traceability Matrix - Fokus LocalStoragl

Matriz de trazabilidad para control de calidad. Cada requisito funcional o no funcional debe contar con prueba, resultado y evidencia asociada.

## Convención de estados

- `PENDIENTE`: no ejecutado aún.
- `OK`: validado correctamente.
- `FAIL`: requiere corrección.

## Escalas de gestión

- `Prioridad`: P0 (crítica), P1 (alta), P2 (media), P3 (baja).
- `Riesgo`: Alto, Medio, Bajo (impacto x probabilidad).
- `Severidad`: S1 (bloqueante), S2 (grave), S3 (moderada), S4 (menor).

## Matriz

| ID | Requisito | Tipo | Prioridad | Riesgo | Severidad | Método de validación | Caso de prueba | Evidencia sugerida | Mitigación si falla | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RQ-001 | El temporizador debe iniciar y pausar sin perder estado | Funcional | P0 | Alto | S1 | Manual + consola limpia | QA-TIMER-001 | Captura de UI en iniciar y pausar + video corto | Bloquear release y corregir lógica de intervalos | OK |
| RQ-002 | Debe permitir reiniciar al tiempo base del modo activo | Funcional | P1 | Medio | S2 | Manual | QA-TIMER-002 | Captura antes/después del botón Reiniciar | Revertir al último commit estable del timer | OK |
| RQ-003 | Debe cambiar entre modos de enfoque y descanso | Funcional | P1 | Medio | S2 | Manual | QA-TIMER-003 | Captura de cada modo con tiempo correcto | Ajustar mapeo de modos y duraciones | OK |
| RQ-004 | Crear tarea con descripción válida | Funcional | P0 | Alto | S1 | Manual | QA-CRUD-001 | Captura de alta de tarea | Corregir submit/validación y hacer hotfix | OK |
| RQ-005 | No permitir tarea vacía | Funcional | P1 | Medio | S3 | Manual | QA-CRUD-002 | Captura del mensaje de validación | Reforzar validación frontend antes de guardar | OK |
| RQ-006 | Marcar y desmarcar tarea activa | Funcional | P1 | Medio | S2 | Manual | QA-CRUD-003 | Captura de estado activo/desactivado | Revisar alternancia y persistencia en localStorage | OK |
| RQ-007 | Persistencia en localStorage tras recarga | Funcional | P0 | Alto | S1 | Manual | QA-DATA-001 | Captura Application > localStorage | Corregir serialización y fallback de carga | OK |
| RQ-008 | UI responsive sin solapamientos en breakpoints objetivo | No funcional | P0 | Alto | S1 | Manual visual | QA-UI-001 | Capturas 390/768/1024/1366 px | Corregir layout/grid y bloquear release visual | OK |
| RQ-009 | Navegación por teclado con foco visible | Accesibilidad | P1 | Medio | S2 | Manual + Lighthouse | QA-A11Y-001 | Capturas de foco + score Lighthouse | Ajustar focus-visible y orden tab | OK |
| RQ-010 | Soporte aria-live accesible | Accesibilidad | P1 | Medio | S2 | Inspección + lector de pantalla | QA-A11Y-002 | Captura de atributos ARIA + notas de prueba | Corregir atributos ARIA en tiempo de ejecución | OK |

## Evidencia de release (plantilla)

Para cada entrega, registrar:

- Fecha:
- Versión/commit:
- Responsable QA:
- Entorno: Navegador + SO + viewport.
- Resultado global: `APROBADO` / `RECHAZADO`.
- Hallazgos y acciones:

## Gestión de incidencias (plantilla)

- Incidencia ID:
- Requisito relacionado (RQ-xxx):
- Prioridad / Severidad:
- Entorno afectado:
- Descripción:
- Pasos para reproducir:
- Resultado esperado:
- Resultado actual:
- Estado: `Abierta` / `En progreso` / `Resuelta` / `Cerrada`.
- Evidencia adjunta:

## Referencias

- [QA-CHECKLIST.md](QA-CHECKLIST.md)
- [ACCESSIBILITY-STATEMENT.md](ACCESSIBILITY-STATEMENT.md)
- [QA-README.md](QA-README.md)
