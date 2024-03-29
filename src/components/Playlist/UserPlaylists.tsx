import { useSpotify } from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import { UserPlaylist } from "@/utilities/Spotify/Api/playlists";
import PlaylistList from "./PlaylistList";

type Props = {
  limit?: number;
  all?: boolean;
};

const UserPlaylists = ({ limit, all }: Props) => {
  const { spotify } = useSpotify();
  const [playlists, setPlaylists] = useState<UserPlaylist[] | undefined>(
    undefined
  );

  useEffect(() => {
    // TODO: Add handling for paging past 50 results
    if (spotify) {
      const result = spotify.Api.getCurrentUsersPlaylists(
        {
          limit: limit || 10,
        },
        all
      );
      result
        .then((json) => setPlaylists(json.items))
        .catch((reason) => console.info(reason));
    }
  }, [all, limit, spotify]);

  return <PlaylistList playlists={playlists} />;
};

export default UserPlaylists;
