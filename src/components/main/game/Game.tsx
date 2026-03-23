import { useContext, useState } from "react";
import { SocketCtx } from "../../context/SocketCtx";
import type { Socket } from "../../../../types/Socket";
import Position from "./position/Position";
import QuestionWindow from "./questionWindow/QuestionWindow";
import Scoreboard from "./scoreboard/Scoreboard";
import Dice from "./dice/Dice";
import AnswerMessage from "./answerMessage/AnswerMessage";
import { ANS_STATE } from "../../../constants/constants";

export default function Game() {
  const { room, playerId, playerData, otherPlayerData, answerState } =
    useContext(SocketCtx) as Socket;

  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [nextPosition, setNextPosition] = useState<number>(0);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    if (playerData.position + value >= 19) setNextPosition(19);
    else setNextPosition(playerData.position + value);
    setDiceResult(value);
  };

  const resetDiceResult = () => {
    setDiceResult(null);
  };
  if (!playerData || !otherPlayerData) return;
  return (
    <section id="game" aria-label="game">
      <Scoreboard />
      {room.turn === playerId && diceResult && (
        <QuestionWindow
          question={room.board[nextPosition].question}
          options={room.board[nextPosition].options}
          diceResult={diceResult}
          resetDiceResult={resetDiceResult}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-5">
        <ul
          id="board"
          className="col-span-2 grid md:grid-cols-5 grid-cols-3 gap-2 p-4 border-2 rounded border-b-emerald-600 border-t-emerald-300 text-center bg-emerald-800"
        >
          {room?.board.map((_, i) => (
            <Position
              key={i}
              index={i}
              playerPos={playerData.position}
              otherPlayerPos={otherPlayerData.position}
            />
          ))}
        </ul>
        <Dice
          rollDice={rollDice}
          isDisabled={room.turn !== playerId || diceResult !== null}
        />
      </div>
      {(answerState === ANS_STATE.correct ||
        answerState === ANS_STATE.wrong) && (
        <AnswerMessage state={answerState} />
      )}
    </section>
  );
}
