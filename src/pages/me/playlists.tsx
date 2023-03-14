import { Container } from "@/components/Container";
import UserPlaylists from "@/components/Playlist/UserPlaylists";
import { useSpotify } from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserPlaylistsPage = () => {
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
        <div className="divide-y divide-gray-200 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Your Playlists
              </h2>
            </div>
          </div>
          <UserPlaylists limit={50} showLink={false} />
        </div>
      </Container>
    </main>
  );
};

export default UserPlaylistsPage;
