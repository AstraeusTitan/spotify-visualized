import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Artist from "./Artist";

const TopArtists = ({
  time_range = "short_term",
}: {
  time_range?: "short_term" | "medium_term" | "long_term";
}) => {
  const { spotify } = useSpotify();
  const [data, setData] = useState<Api.Artist[] | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getUsersTopItems("artists", {
        limit: 4,
        time_range: time_range,
      });
      result.then((json) => setData(json.items as Api.Artist[]));
    }
  }, [spotify, time_range]);

  return (
    <Artist.Grid
      title="Top Artists"
      artists={data}
      indexRoute="/me/top/artists"
      itemRoute="/artist"
    />
  );
};

export default TopArtists;
