import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomInterval } from "@/lib/utils";
import { Rider } from "@/dtos/Rider.dto";

export type RidersContextProps = {
  riders: Array<Rider>;
  riderPickup: (orderId: string) => void;
};

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {}
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup } = useOrders();

  const riderPickup = (orderId: string) => {
    const orderToPickup = orders.find((o) => o.id === orderId);
    if (orderToPickup && orderToPickup.state === "READY") {
      pickup(orderToPickup);
      setRiders((prev) => prev.filter((r) => r.orderWanted !== orderId));
    }
  };

  const { soundEnabled } = require("@/contexts/SoundSettings.context").useSoundSettings();

  useEffect(() => {
    const order = orders.find((order) => !assignedOrders.includes(order.id));
    if (order) {
      setAssignedOrders((prev) => [...prev, order.id]);
      setTimeout(() => {
        setRiders((prev) => [
          ...prev,
          {
            orderWanted: order.id,
          },
        ]);
        if (soundEnabled) {
          try {
            const audio = new window.Audio("/sounds/riders.mp3");
            audio.play();
          } catch (e) {
          }
        }
      }, getRandomInterval(4_000, 10_000));
    }
  }, [orders, soundEnabled, assignedOrders]);

  useEffect(() => {
    const currentOrderIds = new Set(orders.map(o => o.id));

    setRiders(prevRiders => 
      prevRiders.filter(rider => currentOrderIds.has(rider.orderWanted))
    );

    setAssignedOrders(prevAssigned => 
      prevAssigned.filter(orderId => currentOrderIds.has(orderId))
    );
  }, [orders]);


  const context = { riders, riderPickup };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);