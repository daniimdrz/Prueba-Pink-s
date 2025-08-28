# Pink's KDS: Krazy Display Service Challenge

En este desafío, te enfrentarás a la tarea de gestionar varias órdenes de manera simultánea utilizando tus habilidades y creatividad para resolver un problema único: las órdenes son enviadas a través de Glovo, y necesitamos permitir que nuestro equipo en la tienda opere el Kanban para poder entregar los pedidos a los riders de manera eficiente.

## Descripción del Desafío

Tu objetivo es conectar todo el flujo pero tranquilo! ya tienes medio camino hecho.

Puedes ser tan creativo y extenso como quieras.

## Criterios de Evaluación

Buscamos un Problem solver! se creativo e inteligente pero astuto; mvp first. Primero resuelve el problema, si quieres avanzar con mejoras queda en tu lado!

## Instrucciones para Participar

1. Crea un repositorio en GitHub para tu solución.
2. Desarrolla tu solución teniendo en cuenta los criterios de evaluación mencionados anteriormente.
3. Envía el enlace a tu repositorio a la dirección de correo electrónico indicada en la convocatoria del desafío.

¡Estamos emocionados de ver tu creatividad y habilidades en acción! Buena suerte y que empiece el desafío <3

# Cambios realizados en la prueba técnica

Nuevas funcionalidades y mejoras:

- Drag and drop funcional para mover los pedidos.
- Los riders pueden aceptar los pedidos, eliminando automaticamente la orden de la columna "Listo".
- Los riders cuyo pedido está en la columna de Listo, se muestran primero, para agilizar el proceso de entrega.
- Emojis y colores dinámicos en las cards según el estado del pedido.
- Notificación por sonido para pedidos y riders, con un botón que activa y desactiva estas notificaciones.
- Prioridad alta en pedidos: algunos pedidos se generan aleatoriamente como "Alta prioridad", se muestran primero y tienen badge y sonido especial.
- Timer en cada card, que se resetea al cambiar de columna y muestra el tiempo transcurrido, tras 30 segundos de espera en la columna de pendiente y en listo, las cards empiezan a vibrar.
- Historial de pedidos entregados/cancelados accesible desde el header.
- Botón para cancelar pedidos, con confirmación y registro en historial.
- Eliminación automática de riders asociados al cancelar un pedido.

La vibración de las cards está ajustada a 30 segundos para que sea visible, en un caso real se ajustaría más tarde.