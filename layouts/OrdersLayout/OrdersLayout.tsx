import React, { useState } from "react";
import { useSoundSettings } from "@/contexts/SoundSettings.context";
import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import Riders from "@/components/Riders";
import Kanban from "@/components/Kanban";
import History from "@/components/History/History";

export default function OrdersLayout() {
  const { soundEnabled, toggleSound } = useSoundSettings();
  const [showHistory, setShowHistory] = useState<boolean>(false);

  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        {/* Logo y subtítulo a la izquierda */}
        <div className={s["pk-layout__navbar-left"]}>
          <Logo size="S" />
          <span>KDS: Krazy Display Service</span>
        </div>

        {/* Grupo de botones a la derecha */}
        <div className={s["pk-layout__navbar-right"]}>
          {/* Botón de texto para el historial */}
          <button
            className={s["pk-layout__text-button"]}
            title={showHistory ? "Ocultar el historial" : "Mostrar el historial"}
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Ocultar Historial" : "Mostrar Historial"}
          </button>
          
          {/* Botón de icono para el sonido */}
          <button
            className={s["pk-layout__icon-button"]}
            title={soundEnabled ? "Desactivar sonido" : "Activar sonido"}
            onClick={toggleSound}
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      </nav>

      {/* Renderizado condicional de la vista */}
      {showHistory ? (
        <History />
      ) : (
        <article className={s["pk-layout__app"]}>
          <div style={{ width: "100%" }}>
            <Kanban />
          </div>
          <Riders />
        </article>
      )}
    </main>
  );
}
