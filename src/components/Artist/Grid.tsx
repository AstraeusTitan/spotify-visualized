import { Artist } from "@/utilities/Spotify/Api";
import Link from "next/link";
import Card from "./Card";
const range = (start: number, stop: number) => {
  return new Array(stop - start).fill(0).map((x, i) => start + i);
};

type Props = {
  artists?: Artist[];
  title: string;
  itemRoute?: string;
  indexRoute?: string;
};

const Grid = ({ artists, title, itemRoute, indexRoute }: Props) => {
  return (
    <div className="w-fill py-8">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-lg font-bold text-zinc-800">{title}</h3>
        {indexRoute !== undefined && (
          <Link
            href={indexRoute}
            className="uppercase text-sm font-bold text-zinc-500 hover:underline"
          >
            Show All
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {artists === undefined && range(0, 9).map((n, i) => <Card key={i} />)}
        {artists?.length === 0 && (
          // TODO: Add empty state
          <></>
        )}
        {artists &&
          artists.length > 0 &&
          artists.map((a, i) => <Card {...a} route={itemRoute} key={i} />)}
      </div>
    </div>
  );
};

export default Grid;
