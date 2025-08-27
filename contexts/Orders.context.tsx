import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type OrderHistoryEntry = {
  id: string;
  finalState: "ENTREGADO" | "CANCELADO";
  timestamp: Date;
};

export type OrdersContextProps = {
  orders: Array<Order>;
  orderHistory: Array<OrderHistoryEntry>; 
  pickup: (order: Order) => void;
  updateOrderState: (orderId: string, newState: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => void;
  cancelOrder: (orderId: string) => void;
};

export const OrdersContext = createContext<OrdersContextProps>(
  // @ts-ignore
  {}
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [orderHistory, setOrderHistory] = useState<Array<OrderHistoryEntry>>([]);
  const { soundEnabled } = require("@/contexts/SoundSettings.context").useSoundSettings();

  const addToHistory = (orderId: string, finalState: "ENTREGADO" | "CANCELADO") => {
    const newHistoryEntry: OrderHistoryEntry = {
      id: orderId,
      finalState,
      timestamp: new Date(),
    };
    setOrderHistory((prev) => [newHistoryEntry, ...prev]);
  };
  
  const cancelOrder = (orderId: string) => {
    addToHistory(orderId, "CANCELADO");
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    const handleOrder = (order: Order) => {
      setOrders((prev) => [...prev, order]);
      if (soundEnabled) {
        try {
          const audio = new window.Audio("/sounds/pedido.mp3");
          audio.play();
        } catch (e) {
            // Silenciar error
        }
      }
    };
    listener.on("order", handleOrder);
    return () => {
      if (listener && listener.off) listener.off("order", handleOrder);
    };
  }, [soundEnabled]);

  const pickup = (order: Order) => {
    // Primero, añade al historial
    addToHistory(order.id, "ENTREGADO");
    // Luego, actualiza el estado (o elimina, según la lógica de negocio)
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, state: "DELIVERED" } : o
      )
    );
     // Opcional: si quieres que desaparezca de la vista principal tras la entrega
    setTimeout(() => {
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
    }, 500); // Pequeño delay para que se vea el cambio
  };

  const updateOrderState = (orderId: string, newState: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, state: newState } : order
      )
    );
  };

  const context = {
    orders,
    orderHistory, // Se expone el historial
    pickup,
    updateOrderState,
    cancelOrder,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
