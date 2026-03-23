export default function Option({
  index,
  option,
  setAnswer,
}: {
  index: number;
  option: string;
  setAnswer: (option: string) => void;
}) {
  return (
    <>
      <label className="hover:bg-emerald-700 gap-2" htmlFor={`opt${index}`}>
        {option}
      </label>
      <input
        onChange={() => setAnswer(option)}
        type="radio"
        name="question"
        id={`opt${index}`}
      />
    </>
  );
}
