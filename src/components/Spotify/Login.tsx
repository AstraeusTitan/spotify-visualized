import { useSpotify } from "@/hooks/useSpotify";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const LoginButton: FC<PropsWithChildren<ButtonHTMLAttributes<{}>>> = ({
  children,
  ...restProps
}) => {
  const spotify = useSpotify();
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
      onClick={spotify.openLoginPopup}
      {...restProps}
    >
      {children}
    </button>
  );
};
