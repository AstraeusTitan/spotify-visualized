import { Album } from "@/utilities/Spotify/Api";
import clsx from "clsx";
import Image from "next/image";

export type AlbumCoverProps = {
  album: Album;
  className?: string;
};
const AlbumCover = ({ album, className }: AlbumCoverProps) => {
  const url = album.images[0].url;
  const alt = `${album.name} Cover Image`;

  const baseClasses = [
    "relative",
    "object-cover",
    "w-16",
    "h-16",
    "rounded-lg",
    "overflow-hidden",
  ];
  return (
    <div className={clsx(baseClasses, className)}>
      <Image src={url} fill alt={alt} />
    </div>
  );
};
export default AlbumCover;
