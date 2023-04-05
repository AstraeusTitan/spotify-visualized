import { Album } from "@/utilities/Spotify/Api/albums";
import Link from "next/link";
import ItemList from "../Shared/ItemList";

const Item = ({ album }: { album?: Album }) => {
  return (
    <ItemList.Item route={`/album/${album?.id}`}>
      <ItemList.Item.Thumbnail
        src={album?.images && album?.images[0].url}
        alt={album?.name}
      />
      <div className="flex flex-col gap-2 max-w-[65%]">
        <ItemList.Item.Title className="line-clamp-2">
          {album?.name}
        </ItemList.Item.Title>
        <ItemList.Item.Subtitle className="line-clamp-1">
          {album?.artists &&
            album?.artists.map((artist, i) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="underline hover:text-indigo-600 px-1 py-1"
              >
                {artist.name}
              </Link>
            ))}
        </ItemList.Item.Subtitle>
      </div>
      <div className="flex items-center flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        {album?.album_type === "single" && (
          <ItemList.Item.Tag className="bg-blue-300 text-blue-900">
            {album?.album_type}
          </ItemList.Item.Tag>
        )}
        {album?.album_type === "album" && (
          <ItemList.Item.Tag className="bg-green-300 text-green-900">
            {album?.album_type}
          </ItemList.Item.Tag>
        )}
        {album?.album_type === "compilation" && (
          <ItemList.Item.Tag className="bg-indigo-300 text-indigo-900">
            {album?.album_type}
          </ItemList.Item.Tag>
        )}
        <ItemList.Item.DataBlock label="popularity" data={album?.popularity} />
        <ItemList.Item.DataBlock label="tracks" data={album?.total_tracks} />
      </div>
    </ItemList.Item>
  );
};

export default Item;
