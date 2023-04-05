import { Artist } from "@/utilities/Spotify/Api/artists";
import { Followers, SpotifyImage } from "@/utilities/Spotify/Api/common";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name?: string;
  images?: SpotifyImage[];
  id?: string;
  followers?: Followers;
  total_tracks?: number;
  album_type?: "single" | "album" | "compilation";
  artists?: Artist[];
  route?: string;
};

const Card = ({
  name,
  images,
  id,
  followers,
  total_tracks,
  album_type,
  artists,
  route,
}: Props) => {
  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 bg-white text-center shadow">
      <div className="flex flex-1 flex-col py-8">
        <div className="relative mx-auto h-48 w-48 md:w-40 md:h-40 xl:w-48 xl:h-48 flex-shrink-0 rounded overflow-hidden bg-gray-300">
          {images !== undefined && (
            <Image src={images[0].url} alt={name || "Album Image"} fill />
          )}
        </div>
        <div className="px-6">
          {!!name ? (
            <h3 className="mt-6 font-semibold text-gray-900">{name}</h3>
          ) : (
            <div className="mt-6 bg-gray-300 w-48 h-8 rounded mx-auto"></div>
          )}
        </div>
        <div className="mt-1 px-6 flex flex-grow flex-col justify between">
          {!!artists ? (
            <p className="text-sm text-gray-500">
              {artists.map((a) => a.name).join(", ")}
            </p>
          ) : (
            <div className="bg-gray-300 w-32 h-5 rounded mx-auto"></div>
          )}
          <div
            className={`flex justify-center items-center h-8 mt-4 group gap-4 ${
              album_type || ""
            }`}
          >
            {!!album_type ? (
              <span
                className="
                rounded-full
                px-2 py-1 text-xs font-medium
                group-[.single]:bg-green-300 group-[.single]:text-green-900
                group-[.album]:bg-blue-300 group-[.album]:text-blue-900
                group-[.compilation]:bg-indigo-300 group-[.compilation]:text-indigo-900"
              >
                {album_type}
              </span>
            ) : (
              <span className="rounded-full px-2 py-1 text-xs font-medium bg-gray-300 w-16 h-6"></span>
            )}
          </div>
          <div className="flex justify-center items-center mt-4 gap-6">
            {!!total_tracks ? (
              <p className="text-sm text-gray-500">{`${total_tracks} tracks`}</p>
            ) : (
              <div className="bg-gray-300 w-24 h-5 rounded"></div>
            )}

            {!!followers && (
              <p className="text-sm text-gray-500">{`${followers.total} followers`}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            {!!route && (
              <Link
                href={route ? `${route}/${id || ""}` : ""}
                className="relative -mr-px w-0 flex-1 items-center-justify center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                View
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
