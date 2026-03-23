import { type ReactNode } from "react";
import useSocketIO from "../../hooks/useSocketIO";
import type { Socket } from "../../../types/Socket";
import { SocketCtx } from "./SocketCtx";
export default function SocketProvider({ children }: { children: ReactNode }) {
  const value = useSocketIO() as Socket;

  return <SocketCtx.Provider value={value}>{children}</SocketCtx.Provider>;
}
