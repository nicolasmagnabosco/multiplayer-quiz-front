import { useContext } from "react";
import type { Socket } from "../../../../types/Socket";
import { SocketCtx } from "../../context/SocketCtx";

export default function GameFinishedMsg() {
  const { room, playerId } = useContext(SocketCtx) as Socket;
  return (
    <article className="flex flex-col justify-center items-center gap-5">
      <div
        className={`p-5 rounded ${room?.winner !== playerId ? "bg-red-600" : "bg-green-500"}`}
      >
        <p className="text-3xl">
          {room?.winner === playerId ? "YOU WIN!" : "You lose..."}
        </p>
      </div>
      <p>{`Game Finished. ${room?.winner === playerId ? "You are" : "Your opponent is"} the winner with ${room.players[room.winner!].score} points`}</p>
    </article>
  );
}
