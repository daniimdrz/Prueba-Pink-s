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
                  className={s["pk-card"]}
                >
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
