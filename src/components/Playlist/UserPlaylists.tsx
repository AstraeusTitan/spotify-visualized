import { useSpotify } from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import ItemList from "../Shared/ItemList";
import Item from "./Item";
import { UserPlaylist } from "@/utilities/Spotify/Api/playlists";

type Props = {
  limit?: number;
};

const UserPlaylists = ({ limit }: Props) => {
  const { spotify } = useSpotify();
  const [playlists, setPlaylists] = useState<UserPlaylist[] | undefined>(
    undefined
  );

  useEffect(() => {
    // TODO: Add handling for paging past 50 results
    if (spotify) {
      const result = spotify.Api.getCurrentUsersPlaylists({
        limit: limit || 10,
      });
      result
        .then((json) => setPlaylists(json.items))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify]);

  return (
    <ItemList>
      <>
        {playlists === undefined && (
          <>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </>
        )}

        {playlists?.length ? (
          playlists?.map((playlist) => (
            <Item playlist={playlist} key={playlist.id} />
          ))
        ) : (
          <div>Empty State</div>
        )}
      </>
    </ItemList>
  );
};

export default UserPlaylists;
