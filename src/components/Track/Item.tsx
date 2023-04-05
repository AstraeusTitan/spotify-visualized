import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";
import Link from "next/link";
import ItemList from "../Shared/ItemList";

type Props = {
  track?: Track;
  features?: AudioFeatures;
  route?: string;
};

const formatDuration = (durationMs: number) => {
  let duration = durationMs / 1000;
  return `${Math.floor(duration / 60) || 0}:${(Math.round(duration % 60) || 0)
    .toString()
    .padStart(2, "0")}`;
};

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Item = ({ track, features, route }: Props) => {
  return (
    <ItemList.Item route={`/track/${track?.id}`}>
      <ItemList.Item.Thumbnail
        src={track?.album?.images[0].url}
        alt={`${track?.album?.name} Album Cover`}
      />
      <div className="flex flex-col gap-2 max-w-[65%]">
        <ItemList.Item.Title className="line-clamp-2">
          {track?.name}
        </ItemList.Item.Title>
        <ItemList.Item.Subtitle className="line-clamp-1">
          {track?.artists.map((artist, i) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="underline hover:text-indigo-600 px-1 py-1"
            >
              {artist.name}
            </Link>
          ))}
        </ItemList.Item.Subtitle>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock
          label="popularity"
          data={track?.popularity}
          className="hidden md:flex"
        />
        <ItemList.Item.DataBlock
          label="pop."
          data={track?.popularity}
          className="md:hidden"
        />
        <ItemList.Item.DataBlock
          label="duration"
          data={track && formatDuration(track.duration_ms)}
        />
        <ItemList.Item.DataBlock
          label="tempo"
          data={features && Math.round(features.tempo)}
        />
        <ItemList.Item.DataBlock
          label="key"
          data={
            features &&
            `${keys[features.key] || "?"} ${features.mode ? "Major" : "Minor"}`
          }
        />
      </div>
    </ItemList.Item>
  );
};

export default Item;
