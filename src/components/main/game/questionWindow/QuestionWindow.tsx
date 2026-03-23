import { useContext, useState } from "react";
import Option from "./option/Option";
import { SocketCtx } from "../../../context/SocketCtx";
import type { Socket } from "../../../../../types/Socket";

export default function QuestionWindow({
  question,
  options,
  diceResult,
  resetDiceResult,
}: {
  question: string;
  options: Array<string>;
  diceResult: number;
  resetDiceResult: () => void;
}) {
  const { validateAnswer } = useContext(SocketCtx) as Socket;
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSubmit = (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (answer) {
      validateAnswer(question, answer, diceResult);
      resetDiceResult();
    }
  };

  return (
    <>
      <div className="bg-black opacity-50 inset-0 fixed w-screen h-full z-40"></div>
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 pt-2 bg-emerald-950 rounded shadow shadow-black z-50 flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="w-10 h-10 rounded-full flex justify-center items-center border-4 border-white pop-up-animation float-right">
            <p className="text-2xl ">{diceResult}</p>
          </div>
        </div>
        <div>
          <p>{question}</p>
          <form
            className="flex flex-col gap-2 justify-center items-center"
            onSubmit={handleSubmit}
            action="#"
          >
            <div className="flex gap-3">
              {options.map((o, i) => (
                <Option key={i} index={i} option={o} setAnswer={setAnswer} />
              ))}
            </div>
            <button
              className={`bg-emerald-500 gap-4 rounded ${!answer ? "disabled" : ""}`}
              type="submit"
            >
              Confirm
            </button>
          </form>
        </div>
      </article>
    </>
  );
}
