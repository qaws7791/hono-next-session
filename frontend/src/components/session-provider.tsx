"use client";
import { SessionPayload } from "@/session";
import { createContext, useContext, useState } from "react";

type SessionContextType = {
  session: SessionPayload | null;
  setSession: (session: SessionPayload | null) => void;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = (props: {
  children: React.ReactNode;
  session: SessionContextType["session"];
}) => {
  const [session, setSession] = useState<SessionPayload | null>(props.session);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
