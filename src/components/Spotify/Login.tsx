import { useSpotifyAuth } from "@/hooks/useSpotify";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

const LoginButton: FC<PropsWithChildren<ButtonHTMLAttributes<{}>>> = ({
  children,
  ...restProps
}) => {
  const spotify = useSpotifyAuth();
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
      {...restProps}
    >
      {children}
    </button>
  );
};

export default LoginButton;
