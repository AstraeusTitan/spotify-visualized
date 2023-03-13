import { FullPlaylist, UserPlaylist } from "@/utilities/Spotify/Api";
import Link from "next/link";
import Card from "./Card";
const range = (start: number, stop: number) => {
  return new Array(stop - start).fill(0).map((x, i) => start + i);
};

type Props = {
  playlists?: UserPlaylist[];
  title?: string;
  itemRoute?: string;
  indexRoute?: string;
};

const Grid = ({ playlists, title, itemRoute, indexRoute }: Props) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg">
      {(!!title || !!indexRoute) && (
        <div className="px-4 py-5 sm:px-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {title}
              </h2>
            </div>
            {!!indexRoute && (
              <div className="mt-4 flex md:mt-0">
                <Link
                  href={indexRoute}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Show All
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {playlists === undefined &&
            range(0, 9).map((n, i) => <Card key={i} />)}
          {/* TODO: Add an empty state */}
          {playlists?.map((playlist) => {
            return <Card {...playlist} key={playlist.name} route={itemRoute} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Grid;
