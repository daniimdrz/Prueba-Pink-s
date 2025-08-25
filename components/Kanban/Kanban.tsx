import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { DragDropContext } from "react-beautiful-dnd";

export default function Kanban() {
  const { orders, updateOrderState } = useOrders();

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
          orders={orders.filter((i) => i.state === "PENDING")}
        />
        <Column
          title="En preparación"
          droppableId="IN_PROGRESS"
          orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        />
        <Column
          title="Listo"
          droppableId="READY"
          orders={orders.filter((i) => i.state === "READY")}
        />
      </section>
    </DragDropContext>
  );
}
