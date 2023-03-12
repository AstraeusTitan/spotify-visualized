import { AudioFeatures, Track } from "@/utilities/Spotify/Api";
import Link from "next/link";
import Item from "./Item";

const range = (start: number, stop: number) => {
  return new Array(stop - start).fill(0).map((x, i) => start + i);
};

type Props = {
  tracks?: Track[];
  features?: AudioFeatures[];
  title?: string;
  itemRoute?: string;
  indexRoute?: string;
};

const List = ({ tracks, features, title, itemRoute, indexRoute }: Props) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden">
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
        <ul role="list" className="divide-y divide-gray-200">
          {tracks === undefined && range(0, 9).map((n, i) => <Item key={i} />)}
          {/* TODO: Add an empty state */}
          {tracks?.map((track) => {
            return (
              <Item
                track={track}
                features={features?.find((f) => f.id === track.id)}
                key={track.id}
                route={itemRoute}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
