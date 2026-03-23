import { useContext } from "react";
import type { Socket } from "../../../types/Socket";
import { SocketCtx } from "../context/SocketCtx";
import JoinForm from "./joinForm/JoinForm";
import Game from "./game/Game";
import GameFinishedMsg from "./gameFinishedMsg/GameFinishedMsg";
export default function Main() {
  const {
    isGameStarted,
    room,

    isLeftMessageShown,
    closeLeftMessage,
  } = useContext(SocketCtx) as Socket;

  return (
    <main>
      {!isGameStarted ? (
        <JoinForm />
      ) : !room?.winner ? (
        <Game />
      ) : (
        <GameFinishedMsg />
      )}

      {isLeftMessageShown && (
        <article className="px-12 py-8 rounded bg-red-600 text-white">
          <p>Your opponent has left.</p>
          <button onClick={() => closeLeftMessage()}>&#9747;</button>
        </article>
      )}
    </main>
  );
}
