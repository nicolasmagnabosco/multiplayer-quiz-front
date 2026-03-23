export default function Position({
  index,
  playerPos,
  otherPlayerPos,
}: {
  index: number;
  playerPos: number;
  otherPlayerPos: number;
}) {
  return (
    <li
      className={`bg-emerald-950 rounded w-24 h-24 flex justify-center items-center`}
    >
      <div
        className={`h-12 w-12 text-center rounded flex justify-center items-center ${
          playerPos === otherPlayerPos && index === playerPos
            ? "bg-linear-to-br from-pink-600 from-50% to-emerald-300 to-50%"
            : index === playerPos
              ? "bg-pink-600 h-20 w-20"
              : index === otherPlayerPos && "bg-emerald-300"
        }`}
      >
        <p className="text-white text-shadow-black font-bold">{index + 1}</p>
      </div>
    </li>
  );
}
