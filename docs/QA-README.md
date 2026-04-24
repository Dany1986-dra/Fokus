# QA README - Fokus LocalStoragl

Documento de referencia para las pruebas de calidad del proyecto. Reúne los enlaces clave, el alcance de validación y el flujo recomendado para ejecutar QA de forma consistente.

## Documentos relacionados

- [QA Checklist](QA-CHECKLIST.md)
- [Requirements Traceability Matrix](REQUIREMENTS-TRACEABILITY.md)
- [Accessibility Statement](ACCESSIBILITY-STATEMENT.md)

## Alcance de QA

- Temporizador y cambio de contexto.
- CRUD de tareas y persistencia en `localStorage`.
- Estados visuales y comportamiento responsive.
- Accesibilidad: teclado, foco visible y regiones ARIA.

## Flujo recomendado de validación

1. Ejecutar un smoke test inicial.
2. Validar el CRUD de tareas.
3. Revisar la persistencia al recargar.
4. Comprobar los estados accesibles y la navegación por teclado.
5. Confirmar comportamiento responsive en los breakpoints objetivo.

## Evidencia sugerida

- Capturas de pantalla por caso de prueba.
- Video corto para flujos críticos.
- Notas de consola sin errores.
- Resultado de Lighthouse para accesibilidad y rendimiento.

## Criterio de salida

- Sin errores funcionales críticos.
- Sin problemas visuales en los breakpoints objetivo.
- Accesibilidad validada manualmente y con auditoría automatizada.
