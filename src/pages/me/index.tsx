import { Container } from "@/components/Container";
import TopArtists from "@/components/Artist/TopArtists";
import { useSpotify } from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopTracks from "@/components/Track/TopTracks";
import RecentTracks from "@/components/Track/RecentTracks";
import UserPlaylists from "@/components/Playlist/UserPlaylists";
import DataSection from "@/components/Shared/DataSection";
import Head from "next/head";

const Me = () => {
  const router = useRouter();
  const { spotify } = useSpotify();
  const [artistTimeFrame, setArtistTimeFrame] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [trackTimeFrame, setTrackTimeFrame] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");

  useEffect(() => {
    if (spotify && !spotify.Auth.tokenValid()) {
      router.push("/");
    }
  }, [router, spotify]);

  return (
    <main>
      <Head>
        <title>Profile - Spotify Visualized</title>
      </Head>
      <Container>
        <div className="py-8">
          <DataSection>
            <DataSection.Header>
              <DataSection.Header.Title showAll="/me/recent/tracks">
                Recently Played Tracks
              </DataSection.Header.Title>
            </DataSection.Header>
            <DataSection.Panel>
              <RecentTracks limit={5} />
            </DataSection.Panel>
          </DataSection>
        </div>

        <div className="py-8">
          <DataSection>
            <DataSection.Header>
              <DataSection.Header.Title showAll="/me/top/artists">
                Top Artists
              </DataSection.Header.Title>
              <div className="w-fit">
                <select
                  id="time_frame"
                  name="time_frame"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={artistTimeFrame}
                  onChange={(e) => setArtistTimeFrame(e.target.value as any)}
                >
                  <option value="short_term">Last 4 Weeks</option>
                  <option value="medium_term">Last 6 Months</option>
                  <option value="long_term">All Time</option>
                </select>
              </div>
            </DataSection.Header>
            <DataSection.Panel>
              <TopArtists time_range={artistTimeFrame} limit={5} />
            </DataSection.Panel>
          </DataSection>
        </div>

        <div className="py-8">
          <DataSection>
            <DataSection.Header>
              <DataSection.Header.Title showAll="/me/top/tracks">
                Top Tracks
              </DataSection.Header.Title>
              <div className="w-fit">
                <select
                  id="time_frame"
                  name="time_frame"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={trackTimeFrame}
                  onChange={(e) => setTrackTimeFrame(e.target.value as any)}
                >
                  <option value="short_term">Last 4 Weeks</option>
                  <option value="medium_term">Last 6 Months</option>
                  <option value="long_term">All Time</option>
                </select>
              </div>
            </DataSection.Header>
            <DataSection.Panel>
              <TopTracks time_range={trackTimeFrame} limit={5} />
            </DataSection.Panel>
          </DataSection>
        </div>

        <div className="py-8">
          <DataSection>
            <DataSection.Header>
              <DataSection.Header.Title showAll="/me/playlists">
                Your Playlists
              </DataSection.Header.Title>
            </DataSection.Header>
            <DataSection.Panel>
              <UserPlaylists limit={4} />
            </DataSection.Panel>
          </DataSection>
        </div>
      </Container>
    </main>
  );
};

export default Me;
