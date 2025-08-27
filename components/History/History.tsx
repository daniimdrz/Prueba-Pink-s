import React from 'react';
import { useOrders } from '@/contexts/Orders.context';
import s from './History.module.scss';

export default function History() {
  const { orderHistory } = useOrders();

  if (orderHistory.length === 0) {
    return (
      <div className={s.container}>
        <div className={s.emptyState}>
          <h2>No hay pedidos en el historial</h2>
          <p>Los pedidos entregados o cancelados aparecerán aquí.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Historial de Pedidos</h2>
      <ul className={s.list}>
        {orderHistory.map((order) => (
          <li key={`${order.id}-${order.timestamp}`} className={s.listItem}>
            <span>
              Orden: <b>{order.id}</b>
            </span>
            <span
              className={`${s.status} ${
                order.finalState === 'ENTREGADO' ? s.delivered : s.cancelled
              }`}
            >
              {order.finalState}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
