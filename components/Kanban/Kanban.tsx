import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { DragDropContext } from "react-beautiful-dnd";

export default function Kanban() {
  const { orders, updateOrderState } = useOrders();

  const pendingOrders = orders.filter((i) => i.state === "PENDING");
  const inProgressOrders = orders.filter((i) => i.state === "IN_PROGRESS");
  const readyOrders = orders.filter((i) => i.state === "READY");

  const handleDragEnd = (result: any) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    updateOrderState(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className={s["pk-kanban"]}>
        <Column
          title="Pendiente"
          droppableId="PENDING"
          orders={pendingOrders}
          count={pendingOrders.length}
        />
        <Column
          title="En preparación"
          droppableId="IN_PROGRESS"
          orders={inProgressOrders}
          count={inProgressOrders.length}
        />
        <Column
          title="Listo"
          droppableId="READY"
          orders={readyOrders}
          count={readyOrders.length}
        />
      </section>
    </DragDropContext>
  );
}
