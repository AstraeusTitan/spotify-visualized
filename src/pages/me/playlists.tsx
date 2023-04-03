import { Container } from "@/components/Container";
import UserPlaylists from "@/components/Playlist/UserPlaylists";
import DataSection from "@/components/Shared/DataSection";
import Tabs from "@/components/Shared/Tabs";
import { useSpotify } from "@/hooks/useSpotify";
import Head from "next/head";
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
      <Head>
        <title>My Playlists - Spotify Visualized</title>
      </Head>
      <Container>
        <DataSection className="divide-none">
          <DataSection.Header>
            <DataSection.Header.Title>Your Playlists</DataSection.Header.Title>
          </DataSection.Header>
          <DataSection.Panel className="pt-0">
            <Tabs.Group>
              <Tabs.List>
                <Tabs.BasicTab>Playlists</Tabs.BasicTab>
                <Tabs.BasicTab>Charts</Tabs.BasicTab>
              </Tabs.List>
              <Tabs.Panels>
                <Tabs.Panel>
                  <UserPlaylists limit={50} />
                </Tabs.Panel>
                <Tabs.Panel>Panel 2</Tabs.Panel>
              </Tabs.Panels>
            </Tabs.Group>
          </DataSection.Panel>
        </DataSection>
      </Container>
    </main>
  );
};

export default UserPlaylistsPage;
