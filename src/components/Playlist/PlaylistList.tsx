import Item from "./Item";
import RenderedItemList from "../Shared/RenderedItemList";
import { FullPlaylist, UserPlaylist } from "@/utilities/Spotify/Api/playlists";

const PassedItem = (
  data: FullPlaylist | undefined,
  index: number | undefined
) => {
  return <Item playlist={data} key={data ? data.id : index} />;
};

type Props = {
  playlists?: FullPlaylist[] | UserPlaylist[];
  placeholderCount?: number;
};

const PlaylistList = ({ playlists, placeholderCount }: Props) => {
  return (
    <RenderedItemList
      dataList={playlists}
      itemComponent={PassedItem}
      placeholderCount={placeholderCount}
    />
  );
};

export default PlaylistList;
