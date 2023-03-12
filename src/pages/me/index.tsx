import { Container } from "@/components/Container";
import TopArtists from "@/components/Artist/TopArtists";
import { useSpotify } from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TopTracks from "@/components/Track/TopTracks";

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
          <TopArtists
            time_range="short_term"
            title="Top Artists"
            indexRoute="/me/top/artists"
            itemRoute="/artist"
          />
        </div>
        <div>
          <TopTracks
            time_range="short_term"
            title="Top Tracks"
            indexRoute="/me/top/tracks"
            itemRoute="/track"
          />
        </div>
      </Container>
    </main>
  );
};

export default Me;
