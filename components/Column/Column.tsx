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
    const React = require("react");
    const TimeCounter = ({ enteredAt, isWarning }: { enteredAt: number, isWarning: boolean }) => {
      const [seconds, setSeconds] = React.useState(Math.floor((Date.now() - enteredAt) / 1000));
      React.useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(Math.floor((Date.now() - enteredAt) / 1000));
        }, 1000);
        return () => clearInterval(interval);
      }, [enteredAt]);
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return (
        <span style={{ fontSize: "0.95em", color: isWarning ? "#ae191a" : "#888", marginLeft: "auto", fontWeight: isWarning ? 700 : 400 }}>
          {min > 0 ? `${min}m ` : ""}{sec}s
        </span>
      );
    };

    type OrderCardProps = {
      order: Order;
      idx: number;
      droppableId: string;
      onClick?: (order: Order) => void;
      cancelOrder: (id: string) => void;
    };
    function OrderCard({ order, idx, droppableId, onClick, cancelOrder }: OrderCardProps) {
      const React = require("react");
      const [isWarning, setIsWarning] = React.useState(false);
      const showWarning = droppableId === "PENDING" || droppableId === "READY";
      const [seconds, setSeconds] = React.useState(Math.floor((Date.now() - order.enteredAt) / 1000));
      React.useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(Math.floor((Date.now() - order.enteredAt) / 1000));
        }, 1000);
        return () => clearInterval(interval);
      }, [order.enteredAt]);
      React.useEffect(() => {
        setIsWarning(showWarning && seconds >= 30);
      }, [seconds, showWarning]);
      return (
        <Draggable key={order.id} draggableId={order.id} index={idx}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => onClick && onClick(order)}
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
                  : "") +
                (isWarning ? ` ${s["pk-card--warning"]}` : "")
              }
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5em", gap: "8px" }}>
                <span style={{ fontSize: "1.5em" }}>
                  {order.state === "PENDING" && "\u23f3"}
                  {order.state === "IN_PROGRESS" && "\ud83e\uddd1\u200d\ud83c\udf73"}
                  {order.state === "READY" && "\u2705"}
                </span>
                {order.priority === "HIGH" && (
                  <span style={{
                    background: "#ff3b3b",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "8px",
                    padding: "2px 10px",
                    fontSize: "0.95em",
                    letterSpacing: "0.5px",
                  }}>
                    Alta prioridad
                  </span>
                )}
                <TimeCounter enteredAt={order.enteredAt} isWarning={isWarning} />
              </div>
              <div>
                <span>
                  orden: <b>{order.id}</b>
                </span>
              </div>
              <div>
                {order.items.map((item: { id: string }) => (
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
      );
    }
  const { cancelOrder } = require("@/contexts/Orders.context").useOrders();
  const sortedOrders = [...props.orders].sort((a, b) => {
    if (a.priority === "HIGH" && b.priority !== "HIGH") return -1;
    if (a.priority !== "HIGH" && b.priority === "HIGH") return 1;
    return 0;
  });
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
          {sortedOrders.map((order, idx) => (
            <OrderCard
              key={order.id}
              order={order}
              idx={idx}
              droppableId={props.droppableId}
              onClick={props.onClick}
              cancelOrder={cancelOrder}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
