import { Artist } from "@/utilities/Spotify/Api";
import ItemList from "../Shared/ItemList";

const Item = ({ artist }: { artist?: Artist }) => {
  return (
    <ItemList.Item route={`/artist/${artist?.id}`}>
      <ItemList.Item.Thumbnail
        src={artist?.images ? artist.images[0].url : ""}
        alt={artist?.name || ""}
      />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{artist?.name}</ItemList.Item.Title>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock label="popularity" data={artist?.popularity} />
        {/* Currently /top/artists endpoint returns bugged follower count */}
        {/* <ItemList.Item.DataBlock
                  label="followers"
                  data={artist.followers.total}
                /> */}
      </div>
    </ItemList.Item>
  );
};

export default Item;
