import { useSpotify } from "@/hooks/useSpotify";
import { tokenValid } from "@/utilities/spotify";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const Details: FC = () => {
  const spotify = useSpotify();
  const browser = typeof window !== "undefined";
  const router = useRouter();

  useEffect(() => {
    if (spotify.setTokenValid) {
      const check = tokenValid();
      spotify.setTokenValid(check);
      if (!check) {
        router.push("/");
      }
    }
  }, [browser, spotify, router]);

  return (
    <div>
      <h1>Show data</h1>
    </div>
  );
};

export default Details;
