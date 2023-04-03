import { Container } from "@/components/Container";
import DataSection from "@/components/Shared/DataSection";
import Tabs from "@/components/Shared/Tabs";
import RecentTracks from "@/components/Track/RecentTracks";
import { useSpotify } from "@/hooks/useSpotify";
import Head from "next/head";
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
      <Head>
        <title>My Recently Played Tracks - Spotify Visualized</title>
      </Head>
      <Container>
        <DataSection className="divide-none">
          <DataSection.Header>
            <DataSection.Header.Title>
              Recently Played Tracks
            </DataSection.Header.Title>
          </DataSection.Header>
          <DataSection.Panel className="pt-0">
            <RecentTracks limit={50} includeCharts />
          </DataSection.Panel>
        </DataSection>
      </Container>
    </main>
  );
};

export default RecentTracksPage;
