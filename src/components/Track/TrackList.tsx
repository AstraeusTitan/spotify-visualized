import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";
import ItemList from "../Shared/ItemList";
import Item from "./Item";

const TrackList = ({
  tracks,
  features,
}: {
  tracks?: Track[];
  features?: AudioFeatures[];
}) => (
  <ItemList>
    <>
      {tracks === undefined ? (
        <>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </>
      ) : tracks?.length ? (
        tracks.map((track, i) => (
          <Item
            track={track}
            features={features?.find((f) => f.id === track.id)}
            route="/track"
            key={i}
          />
        ))
      ) : (
        <div>Empty State</div>
      )}
    </>
  </ItemList>
);

export default TrackList;
