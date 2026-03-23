import { createContext } from "react";
import type { Socket } from "../../../types/Socket";

export const SocketCtx = createContext<Socket | null>(null);
