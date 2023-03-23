import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import ItemList from "../Shared/ItemList";
import Item from "./Item";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  title?: string;
  limit?: number;
  showLink?: boolean;
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

  return (
    <ItemList>
      <>
        {artists === undefined && (
          <>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </>
        )}

        {artists?.length ? (
          artists?.map((artist) => <Item artist={artist} key={artist.id} />)
        ) : (
          <div>Empty State</div>
        )}
      </>
    </ItemList>
  );
};

export default TopArtists;
