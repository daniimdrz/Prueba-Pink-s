import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type OrdersContextProps = {
  orders: Array<Order>;
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
  const { soundEnabled } = require("@/contexts/SoundSettings.context").useSoundSettings();
  
  // La función ahora solo se encarga de eliminar el pedido.
  const cancelOrder = (orderId: string) => {
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
        }
      }
    };
    listener.on("order", handleOrder);
    return () => {
      if (listener && listener.off) listener.off("order", handleOrder);
    };
  }, [soundEnabled]);

  const pickup = (order: Order) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, state: "DELIVERED" } : o
      )
    );
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