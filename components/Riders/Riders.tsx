import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";

export default function Riders() {
  const { riders, riderPickup } = useRiders();

  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>
          Riders / Deliveries{" "}
          <span style={{ color: "#888", fontWeight: 400, fontSize: "0.95em" }}>
            ({riders.length})
          </span>
        </h3>
        {riders.map((rider) => (
          <div key={rider.orderWanted} className={s["pk-rider__container"]}>
            <Rider orderWanted={rider.orderWanted} pickup={() => riderPickup(rider.orderWanted)} />
          </div>
        ))}
      </div>
    </section>
  );
}
