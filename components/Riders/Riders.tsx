import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";
import { useOrders } from "@/contexts/Orders.context";

export default function Riders() {
  const { riders, riderPickup } = useRiders();

  const { orders } = useOrders();
  const sortedRiders = [...riders].sort((a: any, b: any) => {
    const orderA = orders.find((o: any) => o.id === a.orderWanted);
    const orderB = orders.find((o: any) => o.id === b.orderWanted);
    const isReadyA = orderA?.state === "READY" ? 0 : 1;
    const isReadyB = orderB?.state === "READY" ? 0 : 1;
    return isReadyA - isReadyB;
  });

  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>
          Riders / Deliveries{" "}
          <span style={{ color: "#888", fontWeight: 400, fontSize: "0.95em" }}>
            ({riders.length})
          </span>
        </h3>
        {sortedRiders.map((rider) => (
          <div key={rider.orderWanted} className={s["pk-rider__container"]}>
            <Rider orderWanted={rider.orderWanted} pickup={() => riderPickup(rider.orderWanted)} />
          </div>
        ))}
      </div>
    </section>
  );
}
