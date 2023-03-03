import { useSpotify } from "@/hooks/useSpotify";
import Spotify from "@/utilities/Spotify";
import SpotifyAPI, { SpotifyAPITypes } from "@/utilities/spotifyApi";
import { useRouter } from "next/router";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const LoginButton: FC<PropsWithChildren<ButtonHTMLAttributes<{}>>> = ({
  children,
  ...restProps
}) => {
  const { spotify } = useSpotify();
  const router = useRouter();
  return (
    <button
      type="button"
      className="
        inline-flex
        items-center
        px-5
        py-2
        border
        border-transparent
        text-base
        font-medium
        rounded-full
        shadow-sm
        text-white
        bg-purple-600
        hover:bg-purple-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-purple-400"
      onClick={() => {
        if (spotify) {
          console.log(spotify);
          if (spotify.Auth.tokenValid()) {
            router.push("/details");
          } else {
            spotify.Auth.openLoginPopup(window);
          }
        }
      }}
      {...restProps}
    >
      {children}
    </button>
  );
};
