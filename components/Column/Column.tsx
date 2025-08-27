import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { Droppable, Draggable } from "react-beautiful-dnd";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  droppableId: string;
  count: number;
  onClick?: (order: Order) => void;
};

export default function Column(props: ColumnProps) {
  const { cancelOrder } = require("@/contexts/Orders.context").useOrders();
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <div
          className={s["pk-column"]}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={s["pk-column__title"]}>
            <h3>
              {props.title}{" "}
              <span
                style={{
                  color: "#888",
                  fontWeight: 400,
                  fontSize: "0.95em",
                }}
              >
                ({props.count})
              </span>
            </h3>
          </div>
          {props.orders.map((order, idx) => (
            <Draggable key={order.id} draggableId={order.id} index={idx}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => props.onClick && props.onClick(order)}
                  className={
                    `${s["pk-card"]} ` +
                    (order.state === "PENDING"
                      ? s["pk-card--pending"]
                      : order.state === "IN_PROGRESS"
                      ? s["pk-card--inprogress"]
                      : order.state === "READY"
                      ? s["pk-card--ready"]
                      : order.state === "DELIVERED"
                      ? s["pk-card--delivered"]
                      : "")
                  }
                >
                    <div style={{ fontSize: "1.5em", marginBottom: "0.5em" }}>
                        {order.state === "PENDING" && "⏳"}
                        {order.state === "IN_PROGRESS" && "🧑‍🍳"}
                        {order.state === "READY" && "✅"}
                    </div>
                  <div>
                    <span>
                      orden: <b>{order.id}</b>
                    </span>
                  </div>
                  <div>
                    {order.items.map((item) => (
                      <div key={item.id}></div>
                    ))}
                  </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "16px" }}>
                      <button
                        style={{
                          background: "none",
                          color: "#ae191a",
                          border: "none",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          fontSize: "1.3em",
                          cursor: "pointer",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.2s",
                        }}
                        title="Cancelar pedido"
                        onClick={() => {
                          if (window.confirm("¿Este pedido ha sido cancelado?")) {
                            cancelOrder(order.id);
                          }
                        }}
                      >
                        ×
                      </button>
                    </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
