interface Player {
  position: number;
  score: number;
  isReady: boolean;
}
export interface Socket {
  readyUp: () => void;
  joinRoom: (roomId: string) => void;
  isGameStarted: boolean;
  room: Room;
  playerId: string;
  playerData: Player;
  otherPlayerId: string;
  otherPlayerData: Player;
  validateAnswer: (question: string, option: string, diceValue: number) => void;
  isLeftMessageShown: boolean;
  closeLeftMessage: () => void;
  answerState: AnsState;
}

export interface Questions {
  question: string;
  options: Array<string>;
  answer: string;
}
export interface Room {
  board: Array<Questions>;
  winner: null;
  players: Record<string, Player>;
  turn: string;
  turnDuration: 20; //seconds
}
export interface AnsStateObj {
  correct: "correct";
  wrong: "wrong";
  default: "default";
  loading: "loading";
}
export type AnsState = "correct" | "wrong" | "default" | "loading";
