import * as Api from "@/utilities/Spotify/Api";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name?: string;
  images?: Api.Image[];
  id?: string;
  route?: string;
};

const Card = ({ name, images, id, route }: Props) => {
  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 bg-white text-center shadow">
      <div className="flex flex-1 flex-col py-8">
        <div className="relative mx-auto h-48 w-48 md:w-40 md:h-40 xl:w-48 xl:h-48 flex-shrink-0 rounded overflow-hidden bg-gray-300">
          {images !== undefined && (
            <Image src={images[0].url} alt={name || "Artist Image"} fill />
          )}
        </div>
        {!!name ? (
          <h3 className="mt-6 font-semibold text-gray-900">{name}</h3>
        ) : (
          <div className="mt-6 bg-gray-300 w-48 h-8 rounded mx-auto"></div>
        )}
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
