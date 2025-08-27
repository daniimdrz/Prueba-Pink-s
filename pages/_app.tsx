import { OrdersProvider } from "@/contexts/Orders.context";
import { RidersProvider } from "@/contexts/Riders.context";
import { SoundSettingsProvider } from "@/contexts/SoundSettings.context";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SoundSettingsProvider>
      <OrdersProvider>
        <RidersProvider>
          <Component {...pageProps} />
        </RidersProvider>
      </OrdersProvider>
    </SoundSettingsProvider>
  );
}
