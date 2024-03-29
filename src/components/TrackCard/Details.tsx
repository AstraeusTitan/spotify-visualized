import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";
import Popularity from "./Popularity";

const formatDuration = (durationMs: number) => {
  let duration = durationMs / 1000;
  return `${Math.floor(duration / 60) || 0}:${(Math.round(duration % 60) || 0)
    .toString()
    .padStart(2, "0")}`;
};

const keys = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "N/A",
];

export type DetailsProps = {
  track: Track;
  features?: AudioFeatures;
};

const Details = ({ track, features }: DetailsProps) => {
  return (
    <div>
      <div className="flex gap-4">
        <Popularity value={track.popularity} height={90} />
        <div>
          <h4
            className="
            text-lg
            sm:text-xl
            mb-3"
          >
            {track.name}
          </h4>
          <p
            className="
            text-zinc-700
            text-sm
            sm:text-base"
          >
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div
        className="
        flex
        text-xs
        gap-2
        justify-center
        sm:justify-start
        items-center
        text-zinc-700
        mt-4"
      >
        <p>key: {keys[features?.key || 12] || "N/A"}</p>
        <span className="w-2 border-b-2 border-zinc-700" />
        <p>{features?.mode ? "Major" : "Minor"}</p>
        <span className="w-2 border-b-2 border-zinc-700" />
        <p>{Math.round(features?.tempo || 0)} bpm</p>
        <span className="w-2 border-b-2 border-zinc-700" />
        <p>{formatDuration(features?.duration_ms || 0)}</p>
      </div>
    </div>
  );
};
export default Details;
