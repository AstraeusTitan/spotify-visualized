import { Container } from "@/components/Container";
import Section from "@/components/Section";
import TrackCard from "@/components/TrackCard";
import { useSpotify } from "@/hooks/useSpotify";
import SpotifyAPI from "@/utilities/spotifyApi";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const Details: FC = () => {
  const router = useRouter();
  const [recentTracks, setRecentTracks] = useState([]);
  const [recentTracksFeatures, setRecentTracksFeatures] = useState([]);
  const [recentTracksloaded, setRecentTracksloaded] = useState(false);

  const { spotify } = useSpotify();

  useEffect(() => {
    if (!spotify || !spotify.Auth.tokenValid()) {
      router.push("/");
    }
  }, [router, spotify]);

  }, [router]);

  return (
            <div>
      <h1>Show data</h1>
      <p>{SpotifyAPI.tokenValid && "valid token"}</p>
            </div>
  );
};

export default Details;
