import clsx from "clsx";
import Image from "next/image";

type AlbumCoverProps = {
  url: string;
  alt: string;
  className?: string;
};
const AlbumCover = ({ url, alt, className }: AlbumCoverProps) => {
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
