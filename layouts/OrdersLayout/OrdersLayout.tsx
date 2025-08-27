import React from "react";
import { useSoundSettings } from "@/contexts/SoundSettings.context";
import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import Riders from "@/components/Riders";
import Kanban from "@/components/Kanban";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";

export default function OrdersLayout() {
  const { orders } = useOrders();
  const { riders } = useRiders();
  const { soundEnabled, toggleSound } = useSoundSettings();

  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        <Logo size="S" />
        <span>KDS: Krazy Display Service</span>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5em",
            marginLeft: "auto",
          }}
          title={soundEnabled ? "Desactivar sonido" : "Activar sonido"}
          onClick={toggleSound}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </nav>
      <article className={s["pk-layout__app"]}>
        <div style={{ width: "100%" }}>
          <Kanban />
        </div>
        <Riders />
      </article>
    </main>
  );
}
