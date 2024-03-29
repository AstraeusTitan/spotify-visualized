import { Container } from "@/components/Container";
import DataSection from "@/components/Shared/DataSection";
import Tabs from "@/components/Shared/Tabs";
import TopTracks from "@/components/Track/TopTracks";
import { useSpotify } from "@/hooks/useSpotify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TopTracksPage = () => {
  const router = useRouter();
  const { spotify } = useSpotify();
  const [timeFrame, setTimeFrame] = useState<
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
        <title>My Top Tracks - Spotify Visualized</title>
      </Head>
      <Container>
        <DataSection className="divide-none">
          <DataSection.Header>
            <DataSection.Header.Title>Top Tracks</DataSection.Header.Title>
            <div className="w-fit">
              <select
                id="time_frame"
                name="time_frame"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value as any)}
              >
                <option value="short_term">Last 4 Weeks</option>
                <option value="medium_term">Last 6 Months</option>
                <option value="long_term">All Time</option>
              </select>
            </div>
          </DataSection.Header>
          <DataSection.Panel className="pt-0">
            <TopTracks time_range={timeFrame} limit={50} includeCharts />
          </DataSection.Panel>
        </DataSection>
      </Container>
    </main>
  );
};

export default TopTracksPage;
