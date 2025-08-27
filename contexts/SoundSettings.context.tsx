import { createContext, useContext, useState, ReactNode } from "react";

type SoundSettingsContextType = {
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SoundSettingsContext = createContext<SoundSettingsContextType | undefined>(undefined);

export const SoundSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const toggleSound = () => setSoundEnabled((v) => !v);
  return (
    <SoundSettingsContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundSettingsContext.Provider>
  );
};

export const useSoundSettings = () => {
  const ctx = useContext(SoundSettingsContext);
  if (!ctx) throw new Error("useSoundSettings must be used within SoundSettingsProvider");
  return ctx;
};
