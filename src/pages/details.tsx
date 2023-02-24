import SpotifyAPI from "@/utilities/spotifyApi";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const Details: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!SpotifyAPI.tokenValid) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h1>Show data</h1>
      <p>{SpotifyAPI.tokenValid && "valid token"}</p>
    </div>
  );
};

export default Details;
