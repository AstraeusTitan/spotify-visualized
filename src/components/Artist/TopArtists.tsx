import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Artist from ".";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  title?: string;
  limit?: number;
  showLink?: boolean;
};

const TopArtists = ({ title, time_range = "short_term", limit, showLink=true }: Props) => {
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

  return (
    <Artist.Grid title={title} route={showLink ? "/me/top/artists" : undefined}>
      {artists === undefined && (
        <>
          <Artist.Card />
          <Artist.Card />
          <Artist.Card />
          <Artist.Card />
        </>
      )}
      {!!artists?.length && (
        <>
          {artists.map((artist, i) => (
            <Artist.Card {...artist} route="/artist" key={i} />
          ))}
        </>
      )}
    </Artist.Grid>
  );
};

export default TopArtists;
