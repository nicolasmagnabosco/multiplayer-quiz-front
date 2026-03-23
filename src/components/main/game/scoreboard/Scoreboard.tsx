import { useContext } from "react";
import { SocketCtx } from "../../../context/SocketCtx";
import type { Socket } from "../../../../../types/Socket";

export default function Scoreboard() {
  const { room, playerData, otherPlayerData, playerId } = useContext(
    SocketCtx,
  ) as Socket;
  return (
    <section
      className="border-2 m-5 border-emerald-200 rounded p-4 gap-2 flex flex-col justify-center items-left"
      aria-label="scoreboard"
    >
      <div className="flex gap-2">
        <div className="h-8 w-8 rounded-full bg-pink-600"></div>
        <p>You:</p>
        <div className="w-8 h-8 rounded-full border border-pink-600 p-2 flex justify-center items-center">
          <p>{playerData.score}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-8 rounded-full bg-emerald-300 p-2"></div>
        <p className="text-center">{`Your opponent:`}</p>
        <div>
          <div className="w-8 h-8 rounded-full border border-emerald-300 p-2 flex justify-center items-center">
            <p>{otherPlayerData.score}</p>
          </div>
        </div>
      </div>
      <p
        className={` rounded p-2 text-center ${room.turn === playerId ? "bg-pink-600" : "bg-emerald-300"}`}
      >
        Turn: {room.turn === playerId ? "You" : "Your opponent"}
      </p>
    </section>
  );
}
