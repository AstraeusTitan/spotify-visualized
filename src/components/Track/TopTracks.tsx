import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Track from ".";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  indexRoute?: string;
  itemRoute?: string;
  title?: string;
  limit?: number;
};

const TopTracks = ({
  title,
  indexRoute,
  itemRoute,
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
      const result = spotify.Api.getUsersTopItems("tracks", {
        limit: limit || 10,
        time_range: time_range,
      });
      result
        .then((json) => setTracks(json.items as Api.Track[]))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify, time_range]);

  useEffect(() => {
    if (spotify && tracks?.length) {
      const ids = tracks.map((t) => t.id);
      const result = spotify.Api.getTracksAudioFeatures({ ids: ids });
      result
        .then((json) => (console.log(json), json))
        .then((json) => setFeatures(json.audio_features))
        .catch((reason) => console.info(reason));
    }
  }, [spotify, tracks]);

  return (
    <Track.List
      title={title}
      tracks={tracks}
      features={features}
      indexRoute={indexRoute}
      itemRoute={itemRoute}
    />
  );
};

export default TopTracks;
