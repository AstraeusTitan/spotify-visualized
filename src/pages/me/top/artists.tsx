import { Container } from "@/components/Container";
import TopArtists from "@/components/Artist/TopArtists";
import { useSpotify } from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TopArtistsPage = () => {
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
      <Container>
        <div className="divide-y divide-gray-200 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Top Artists
              </h2>
            </div>
            <div className="my-4 flex md:mt-0">
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
          </div>
          <TopArtists time_range={timeFrame} itemRoute="/artist" limit={50} />
        </div>
      </Container>
    </main>
  );
};

export default TopArtistsPage;
