import { Artist } from "@/utilities/Spotify/Api";
import Image from "next/image";

const Card = ({ name, images }: Artist) => {
  return (
    <div
      className="
      flex
      flex-col
      rounded
      bg-zinc-100
      shadow
      w-32
      sm:w-fit
      sm:p-4"
    >
      <div
        className="
        bg-zinc-300
        rounded
        h-32
        w-32
        sm:h-48
        sm:w-48
        relative
        object-cover
        overflow-hidden"
      >
        {images !== undefined && (
          <Image src={images[0].url} alt={name || "Artist Image"} fill />
        )}
      </div>
      <div
        className="
        h-12
        sm:h-16
        m-2
        flex
        justify-center
        sm:justify-start
        items-center
        sm:max-w-[192px]"
      >
        {name !== undefined ? (
          <h4
            className="
            text-center
            sm:text-left
            text-sm
            overflow-hidden
            max-h-11
            sm:max-h-16
            sm:text-lg"
          >
            {name}
          </h4>
        ) : (
          <div
            className="
            bg-zinc-300
            rounded
            h-8
            w-24
            sm:w-32"
          ></div>
        )}
      </div>
    </div>
  );
};

export default Card;
