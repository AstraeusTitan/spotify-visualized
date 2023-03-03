import { AudioFeatures, Track } from "@/utilities/Spotify/Api";
import AlbumCover from "./AlbumCover";
import Details from "./Details";
import Mood from "./Mood";

export type TrackCardProps = {
  track: Track;
  features: AudioFeatures;
  averages?: AudioFeatures;
};
const TrackCard = ({ track, features, averages }: TrackCardProps) => {
  return (
    <div
      className="
      flex
      flex-col
      sm:flex-row
      justify-center
      shadow
      rounded
      px-6
      py-6
      max-w-3xl
      gap-4"
    >
      <div
        className="
        flex
        flex-col
        sm:flex-row
        items-center
        gap-4
        sm:grow"
      >
        <AlbumCover album={track.album} className="w-32 h-32" />
        <Details track={track} features={features} />
      </div>
      <div className="px-2">
        <Mood features={features} averages={averages} />
      </div>
    </div>
  );
};

export default TrackCard;
