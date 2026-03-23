import { useContext, useState } from "react";
import { SocketCtx } from "../../context/SocketCtx";
import type { Socket } from "../../../../types/Socket";

export default function JoinForm() {
  const { joinRoom, room, readyUp } = useContext(SocketCtx) as Socket;
  const [currentRoomId, setCurrentRoomId] = useState<string>("");
  const [playerIsReady, setPlayerIsReady] = useState<boolean>(false);

  const handleSubmit = (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (currentRoomId) joinRoom(currentRoomId);
    else alert("It's empty");
  };

  return (
    <section
      className="flex flex-col justify-center items-center gap-10"
      aria-label="join game form"
    >
      <h1>Javascript and NodeJS Quiz </h1>
      {!room ? (
        <form
          className="p-2 border-2 border-emerald-300 flex items-center justify-around gap-2"
          onSubmit={handleSubmit}
          action="#"
        >
          <label htmlFor="roomId">Room Id:</label>
          <input
            onChange={(ev) => setCurrentRoomId(ev.target.value)}
            placeholder="1234..."
            type="text"
            name="roomId"
          />
          <button type="submit">Join</button>
        </form>
      ) : (
        <div>
          {playerIsReady ? (
            <p>Waiting for your opponent...</p>
          ) : (
            <button
              onClick={() => {
                setPlayerIsReady(true);
                readyUp();
              }}
            >
              I'm Ready
            </button>
          )}
        </div>
      )}
    </section>
  );
}
