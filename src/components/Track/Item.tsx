import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api";
import Image from "next/image";
import Link from "next/link";

type Props = {
  track?: Track;
  features?: AudioFeatures;
  route?: string;
};

const formatDuration = (durationMs: number) => {
  let duration = durationMs / 1000;
  return `${Math.floor(duration / 60) || 0}:${(Math.round(duration % 60) || 0)
    .toString()
    .padStart(2, "0")}`;
};

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Item = ({ track, features, route }: Props) => {
  return (
    <li>
      <Link
        href={`${route}/${track?.id || ""}`}
        className="block hover:bg-gray-100 group"
      >
        <div className="flex items-center p-4 sm:px-6">
          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex min-w-0 flex-1 gap-4">
              <div className="flex-shrink-0">
                <div className="relative h-14 w-14 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-300">
                  {!!track && (
                    <Image
                      src={track.album.images[0].url}
                      alt={`${track.album.name} Album Cover`}
                      fill
                    />
                  )}
                </div>
              </div>
              <div className="flex grow justify-between">
                <div className="flex flex-col justify-center">
                  {!!track ? (
                    <>
                      <p className="truncate text-sm md:text-base font-medium text-indigo-600 whitespace-pre-line">
                        {track?.name}
                      </p>
                      <p className="mt-2 flex text-sm md:text-base text-gray-500 whitespace-pre-line">
                        {track?.artists.map((a) => a.name).join(", ")}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="truncate text-sm font-medium w-32 md:w-48 h-5 bg-gray-300 rounded"></p>
                      <p className="truncate mt-2 flex text-sm w-32 h-5 bg-gray-300 rounded"></p>
                    </>
                  )}
                </div>
                <div>
                  {!!route && (
                    <ChevronRightIcon
                      className="h-5 w-5 mt-4 text-gray-400 md:hidden group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-x-8">
              <div className="flex grow md:grow-0 md:flex-col justify-evenly gap-y-1">
                <div className="md:w-16">
                  {!!track ? (
                    <p className="text-sm text-gray-500 w-fit">
                      {formatDuration(track?.duration_ms || 0)}
                    </p>
                  ) : (
                    <p className="text-sm h-5 bg-gray-300 rounded w-16"></p>
                  )}
                </div>
                <div className="md:w-16">
                  {!!features ? (
                    <p className="text-sm text-gray-500 w-fit whitespace-nowrap">
                      {`${Math.round(features.tempo)} bpm`}
                    </p>
                  ) : (
                    <p className="text-sm h-5 bg-gray-300 rounded w-16"></p>
                  )}
                </div>
                <div className="md:w-16">
                  {!!features ? (
                    <p className="text-sm text-gray-500 w-fit whitespace-nowrap">
                      {`${keys[features?.key || 12] || "N/A"} ${
                        features?.mode ? "Major" : "Minor"
                      }`}
                    </p>
                  ) : (
                    <p className="text-sm h-5 bg-gray-300 rounded w-16"></p>
                  )}
                </div>
              </div>
              {!!route && (
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400 hidden md:block group-hover:text-indigo-600"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Item;
