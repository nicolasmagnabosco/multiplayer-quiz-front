export default function Dice({
  rollDice,
  isDisabled,
}: {
  rollDice: () => void;
  isDisabled: boolean;
}) {
  return (
    <section className="flex flex-col gap-5 justify-center items-center">
      <button
        type="button"
        disabled={isDisabled}
        className={`${isDisabled && "opacity-10 pointer-events-none"}rounded-full border border-white hover:shadow-2xl shadow-gray-500 cursor-pointer active:opacity-50 p-5 transform scale-125`}
        onClick={rollDice}
        id="dice"
      >
        Roll!
      </button>
    </section>
  );
}
