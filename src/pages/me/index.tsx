import { Container } from "@/components/Container";
import TopArtists from "@/components/Artist/TopArtists";
import { useSpotify } from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TopTracks from "@/components/Track/TopTracks";
import RecentTracks from "@/components/Track/RecentTracks";
import UserPlaylists from "@/components/Playlist/UserPlaylists";

const Me = () => {
  const router = useRouter();
  const { spotify } = useSpotify();

  useEffect(() => {
    if (spotify && !spotify.Auth.tokenValid()) {
      router.push("/");
    }
  }, [router, spotify]);

  return (
    <main>
      <Container>
        <div className="py-8">
          <RecentTracks title="Recently Played Tracks" limit={5} />
        </div>
        <div className="py-8">
          <TopArtists time_range="short_term" title="Top Artists" limit={4} />
        </div>
        <div className="py-8">
          <TopTracks time_range="short_term" title="Top Tracks" limit={5} />
        </div>
        <div className="py-8">
          <UserPlaylists title="Your Playlists" limit={4} />
        </div>
      </Container>
    </main>
  );
};

export default Me;
