import { Album } from "@/utilities/Spotify/Api";
import Item from "./Item";
import RenderedItemList from "../Shared/RenderedItemList";

const PassedItem = (data?: Album, index?: number) => {
  return <Item album={data} key={data ? data.id : index} />;
};

type Props = { albums?: Album[]; placeholderCount?: number };

const AlbumList = ({ albums, placeholderCount }: Props) => {
  return (
    <RenderedItemList
      dataList={albums}
      itemComponent={PassedItem}
      placeholderCount={placeholderCount}
    />
  );
};

export default AlbumList;
