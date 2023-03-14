import { Container } from "@/components/Container";
import RecentTracks from "@/components/Track/RecentTracks";
import { useSpotify } from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RecentTracksPage = () => {
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
                Recently Played Tracks
              </h2>
            </div>
          </div>
          <RecentTracks limit={50} />
        </div>
      </Container>
    </main>
  );
};

export default RecentTracksPage;
