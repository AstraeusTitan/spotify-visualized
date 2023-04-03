import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import ItemList from "../Shared/ItemList";
import Item from "./Item";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
};

const RecentTracks = ({
  time_range = "short_term",
  limit,
}: Props) => {
  const { spotify } = useSpotify();
  const [tracks, setTracks] = useState<Api.Track[] | undefined>(undefined);
  const [features, setFeatures] = useState<Api.AudioFeatures[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getRecentlyPlayed({
        limit: limit || 10,
      });
      result
        .then((json) => setTracks(json.items.map((w) => w.track)))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify, time_range]);

  useEffect(() => {
    if (spotify && tracks?.length) {
      const ids = tracks.map((t) => t.id);
      const result = spotify.Api.getTracksAudioFeatures({ ids: ids });
      result
        .then((json) => setFeatures(json.audio_features))
        .catch((reason) => console.info(reason));
    }
  }, [spotify, tracks]);

  return (
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
};

export default RecentTracks;
