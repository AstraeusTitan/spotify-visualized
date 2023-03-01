import AlbumCover from "./AlbumCover";
import Details from "./Details";
import Mood, { MoodData } from "./Mood";
import Popularity from "./Popularity";

type TrackData = {
  title: string;
  artist: string;
  albumCoverURL: string;
  mode?: 1 | 0;
  tempo?: number;
  songKey?: string;
  duration: number;
  popularity: number;
  accousticness: MoodData;
  danceability: MoodData;
  energy: MoodData;
  instrumentalness: MoodData;
  liveness: MoodData;
  loudness: MoodData;
  speachiness: MoodData;
  valence: MoodData;
};
type TrackCardProps = {
  trackData: TrackData;
};
const TrackCard = ({ trackData }: TrackCardProps) => {
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
        <AlbumCover
          url={trackData.albumCoverURL}
          alt={trackData.title}
          className="w-32 h-32"
        />
        <Details {...trackData} />
      </div>
      <div className="px-2">
        <Mood {...trackData} height={128} bulletWidth={25} />
      </div>
    </div>
  );
};

export default TrackCard;
