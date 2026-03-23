import { io, Socket } from "socket.io-client";

//creates the connection with the server
export const socket: Socket = io(import.meta.env.VITE_API_URL);
