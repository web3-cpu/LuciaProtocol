import { createContext, useState, useMemo, type ReactNode } from "react";

const initialValue = {
  apiKey: "",
  setApiKey: () => {},
  clientId: "",
  setClientId: () => {},
};

const ApiContext = createContext<{
  apiKey: string;
  setApiKey: (v: string) => void;
  clientId: string;
  setClientId: (v: string) => void;
}>(initialValue);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");

  const value = useMemo(
    () => ({
      apiKey,
      setApiKey,
      clientId,
      setClientId,
    }),
    [apiKey, setApiKey, clientId, setClientId],
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
