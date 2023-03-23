import { UserPlaylist } from "@/utilities/Spotify/Api";
import ItemList from "../Shared/ItemList";

const Item = ({ playlist }: { playlist?: UserPlaylist }) => {
  return (
    <ItemList.Item route={`/playlist/${playlist?.id}`}>
      <ItemList.Item.Thumbnail
        src={playlist?.images && playlist?.images[0]?.url}
        alt={`${playlist?.name} Cover Image`}
      />
      <div className="flex flex-col gap-2 max-w-[65%]">
        <ItemList.Item.Title className="line-clamp-2">
          {playlist?.name}
        </ItemList.Item.Title>
        <ItemList.Item.Subtitle className="line-clamp-1">
          {!!playlist &&
            !!playlist.owner &&
            `by ${playlist?.owner?.display_name}`}
        </ItemList.Item.Subtitle>
      </div>
      <div className="flex items-center flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.Tag className="bg-blue-300 text-blue-900">
          {playlist?.public ? "public" : "private"}
        </ItemList.Item.Tag>
        {playlist?.collaborative && (
          <ItemList.Item.Tag className="bg-green-300 text-green-900">
            collabrative
          </ItemList.Item.Tag>
        )}
        {/* When getting user playlists, no followers are returned */}
        {/* <ItemList.Item.DataBlock
          label="followers"
          data={playlist?.followers?.total}
        /> */}
        <ItemList.Item.DataBlock
          label="tracks"
          data={playlist?.tracks?.total}
        />
      </div>
    </ItemList.Item>
  );
};

export default Item;
