import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Track from ".";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  title?: string;
  limit?: number;
  showLink?: boolean;
};

const RecentTracks = ({
  title,
  time_range = "short_term",
  limit,
  showLink = true,
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
    <Track.List
      title={title}
      route={showLink ? "/me/recent/tracks" : undefined}
    >
      {tracks === undefined && (
        <>
          <Track.Item />
          <Track.Item />
          <Track.Item />
          <Track.Item />
        </>
      )}
      {!!tracks?.length && (
        <>
          {tracks.map((track, i) => (
            <Track.Item
              track={track}
              features={features?.find((f) => f.id === track.id)}
              route="/track"
              key={i}
            />
          ))}
        </>
      )}
    </Track.List>
  );
};

export default RecentTracks;
