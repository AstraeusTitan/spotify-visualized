import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Artist from ".";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  indexRoute?: string;
  itemRoute?: string;
  title?: string;
  limit?: number;
};

const TopArtists = ({
  title,
  indexRoute,
  itemRoute,
  time_range = "short_term",
  limit,
}: Props) => {
  const { spotify } = useSpotify();
  const [data, setData] = useState<Api.Artist[] | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getUsersTopItems("artists", {
        limit: limit || 10,
        time_range: time_range,
      });
      result
        .then((json) => setData(json.items as Api.Artist[]))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify, time_range]);

  return (
    <Artist.Grid
      title={title}
      artists={data}
      indexRoute={indexRoute}
      itemRoute={itemRoute}
    />
  );
};

export default TopArtists;
