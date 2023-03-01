import Popularity from "./Popularity";

const formatDuration = (durationMs: number) => {
  let duration = durationMs / 1000;
  return `${Math.floor(duration / 60) || 0}:${(duration % 60 || 0)
    .toString()
    .padStart(2, "0")}`;
};

type DetailsProps = {
  title: string;
  artist: string;
  mode?: 1 | 0;
  tempo?: number;
  songKey?: string;
  duration: number;
  popularity: number;
};
const Details = ({
  title,
  artist,
  tempo,
  mode,
  songKey,
  duration,
  popularity,
}: DetailsProps) => {
  return (
    <div>
      <div className="flex gap-4">
        <Popularity value={popularity} height={90} />
        <div>
          <h4 className="text-xl mb-3">{title}</h4>
          <p className="text-zinc-700 text-lg">{artist}</p>
        </div>
      </div>
      <div
        className="
          flex
          text-xs
          gap-2
          items-center
          text-zinc-700"
      >
        <p>key: {songKey || "N/A"}</p>
        <span className="w-2 border-b-2 border-zinc-700" />
        <p>{mode === 1 ? "Major" : "Minor"}</p>
        <span className="w-2 border-b-2 border-zinc-700" />
        <p>{tempo} bpm</p>
        <span className="w-2 border-b-2 border-zinc-700" />
        <p>{formatDuration(duration)}</p>
      </div>
    </div>
  );
};
export default Details;
