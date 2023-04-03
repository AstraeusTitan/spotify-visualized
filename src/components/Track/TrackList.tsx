import * as Api from "@/utilities/Spotify/Api";
import ItemList from "../Shared/ItemList";
import Item from "./Item";

const TrackList = ({
  tracks,
  features,
}: {
  tracks?: Api.Track[];
  features?: Api.AudioFeatures[];
}) => (
  <ItemList>
    <>
      {tracks === undefined && (
        <>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </>
      )}

      {tracks?.length ? (
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
