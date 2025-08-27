import React from "react";

export type DashboardProps = {
  orders: Array<{ state: string }>;
  riders: Array<{ orderWanted: string }>;
};

export default function Dashboard({ orders, riders }: DashboardProps) {
  const pending = orders.filter((o) => o.state === "PENDING").length;
  const inProgress = orders.filter((o) => o.state === "IN_PROGRESS").length;
  const ready = orders.filter((o) => o.state === "READY").length;
  const delivered = orders.filter((o) => o.state === "DELIVERED").length;
  const ridersActive = riders.length;

  return (
    <div style={{
      display: "flex",
      gap: 24,
      padding: "12px 0",
      fontWeight: 600,
      fontSize: "1.05em",
      borderBottom: "1px solid #eee",
      marginBottom: 8,
    }}>
      <span>Pendientes: {pending}</span>
      <span>En preparación: {inProgress}</span>
      <span>Listos: {ready}</span>
      <span>Entregados: {delivered}</span>
      <span>Riders activos: {ridersActive}</span>
    </div>
  );
}
