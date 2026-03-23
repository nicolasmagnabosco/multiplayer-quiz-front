import { useEffect, useRef, useState } from "react";
import { socket } from "../socket.ts";
import type { Room, AnsState } from "../../types/Socket";
import { ANS_STATE } from "../constants/constants.ts";
export default function useSocketIO() {
  const [room, setRoom] = useState<Room | null>(null);
  const [isGameStarted, setisGameStarted] = useState<boolean>(false);
  const [isLeftMessageShown, setIsLeftMessageShown] = useState<boolean>(false);
  const [answerState, setAnswerState] = useState<AnsState>(ANS_STATE.default);
  const playerData = room && room.players[socket.id!];

  const closeLeftMessage = () => {
    setIsLeftMessageShown(false);
  };

  const otherPlayerId = room
    ? Object.keys(room.players).find((id) => id !== socket.id)
    : null;
  const otherPlayerData =
    room && otherPlayerId ? room.players[otherPlayerId] : null;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetAnswerState = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setAnswerState(ANS_STATE.default);
    }, 2000);
  };
  //Server.IO Client Actions

  const joinRoom = (roomId: string) => {
    if (roomId) socket.emit("joinRoom", roomId);
    else throw new Error("Couldn't join");
  };
  const readyUp = () => {
    if (room) socket.emit("ready");
  };

  const validateAnswer = (
    question: string,
    answer: string,
    diceValue: number,
  ) => {
    setAnswerState(ANS_STATE.loading);
    socket.emit("validateAnswer", question, answer, diceValue);
  };

  useEffect(() => {
    //Server.IO Server Listener
    socket.on("startGame", (roomInfo) => {
      setisGameStarted(true);
      setRoom(roomInfo);
    });
    socket.on("fullRoom", (roomId) => {
      alert("Room" + roomId + "is full");
    });
    socket.on("displayQuestion", (question) => {
      alert(question);
    });
    socket.on("joined", (roomInfo) => {
      setRoom(roomInfo);
    });
    socket.on("correctAnswer", (id, roomInfo) => {
      if (id === socket.id) {
        //identify is it's my answer or my opponent's
        setAnswerState(ANS_STATE.correct);
        resetAnswerState();
      }
      setRoom(roomInfo);
    });

    socket.on("wrongAnswer", (id, roomInfo) => {
      if (id === socket.id) {
        setAnswerState(ANS_STATE.wrong);
        resetAnswerState();
      }
      setRoom(roomInfo);
    });

    socket.on("playerLeft", (roomInfo) => {
      setIsLeftMessageShown(true);
      setRoom(roomInfo);
    });
    return () => {
      socket.off();
    };
  }, []);

  return {
    readyUp,
    joinRoom,
    isGameStarted,
    room,
    playerId: socket.id,
    playerData,
    otherPlayerId,
    otherPlayerData,
    validateAnswer,
    isLeftMessageShown,
    closeLeftMessage,
    answerState,
  };
}
