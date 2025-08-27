import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import Riders from "@/components/Riders";
import Kanban from "@/components/Kanban";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";

export default function OrdersLayout() {
  const { orders } = useOrders();
  const { riders } = useRiders();

  return (
    <main className={s["pk-layout"]}>
      <nav className={s["pk-layout__navbar"]}>
        <Logo size="S" />
        <span>KDS: Krazy Display Service</span>
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
