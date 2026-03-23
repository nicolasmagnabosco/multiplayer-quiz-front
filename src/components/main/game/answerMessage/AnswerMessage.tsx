import type { AnsState } from "../../../../../types/Socket";
import { ANS_STATE } from "../../../../constants/constants";
import CorrectIcon from "../../../Icons/CorrectIcon";
import WrongIcon from "../../../Icons/WrongIcon";

export default function AnswerMessage({ state }: { state: AnsState }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pop-up-animation-fade-out rounded-full p-4 justify-center flex items-center ${state === ANS_STATE.correct ? "bg-green-400" : "bg-red-500"}`}
    >
      <p>
        {state === ANS_STATE.correct ? (
          <CorrectIcon width={50} height={50} fill="white" stroke="white" />
        ) : (
          <WrongIcon width={50} height={50} fill="white" stroke="white" />
        )}
      </p>
    </div>
  );
}
