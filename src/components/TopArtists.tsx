import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Artist from "./Artist";

const TopArtists = ({
  title = true,
  time_range = "short_term",
}: {
  time_range?: "short_term" | "medium_term" | "long_term";
  title?: boolean;
}) => {
  const { spotify } = useSpotify();
  const [data, setData] = useState<Api.Artist[] | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getUsersTopItems("artists", {
        limit: 4,
        time_range: time_range,
      });
      result
        .then((json) => setData(json.items as Api.Artist[]))
        .catch((reason) => console.info(reason));
    }
  }, [spotify, time_range]);

  return (
    <Artist.Grid
      title={title ? "Top Artists" : undefined}
      artists={data}
      indexRoute="/me/top/artists"
      itemRoute="/artist"
    />
  );
};

export default TopArtists;
