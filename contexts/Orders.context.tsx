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

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

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
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
