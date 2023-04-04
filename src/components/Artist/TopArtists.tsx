import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import ArtistList from "./ArtistList";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
};

const TopArtists = ({ time_range = "short_term", limit }: Props) => {
  const { spotify } = useSpotify();
  const [artists, setArtists] = useState<Api.Artist[] | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getUsersTopItems("artists", {
        limit: limit || 10,
        time_range: time_range,
      });
      result
        .then((json) => setArtists(json.items as Api.Artist[]))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify, time_range]);

  return <ArtistList artists={artists} />;
};

export default TopArtists;
