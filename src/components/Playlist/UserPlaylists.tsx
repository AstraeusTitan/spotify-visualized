import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Playlist from ".";

type Props = {
  title?: string;
  limit?: number;
};

const UserPlaylists = ({ title, limit }: Props) => {
  const { spotify } = useSpotify();
  const [playlists, setPlaylists] = useState<Api.UserPlaylist[] | undefined>(
    undefined
  );

  useEffect(() => {
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
    <Playlist.Grid title={title} route="/me/playlists">
      {playlists === undefined && (
        <>
          <Playlist.Card />
          <Playlist.Card />
          <Playlist.Card />
          <Playlist.Card />
        </>
      )}
      {!!playlists?.length && (
        <>
          {playlists.map((playlist, i) => (
            <Playlist.Card
              {...playlist}
              _public={playlist.public}
              route="/playlist"
              key={i}
            />
          ))}
        </>
      )}
    </Playlist.Grid>
  );
};

export default UserPlaylists;
