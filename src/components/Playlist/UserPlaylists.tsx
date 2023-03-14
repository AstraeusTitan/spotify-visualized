import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Playlist from ".";
import CardGrid from "../Shared/CardGrid";

type Props = {
  title?: string;
  limit?: number;
  showLink?: boolean;
};

const UserPlaylists = ({ title, limit, showLink = true }: Props) => {
  const { spotify } = useSpotify();
  const [playlists, setPlaylists] = useState<Api.UserPlaylist[] | undefined>(
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
    <CardGrid title={title} route={showLink ? "/me/playlists" : undefined}>
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
    </CardGrid>
  );
};

export default UserPlaylists;
