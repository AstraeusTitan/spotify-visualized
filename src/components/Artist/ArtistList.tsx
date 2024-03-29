import Item from "./Item";
import RenderedItemList from "../Shared/RenderedItemList";
import { Artist } from "@/utilities/Spotify/Api/artists";

const PassedItem = (data: Artist | undefined, index: number | undefined) => {
  return <Item artist={data} key={data ? data.id : index} />;
};

type Props = { artists?: Artist[]; placeholderCount?: number };

const ArtistList = ({ artists, placeholderCount }: Props) => {
  return (
    <RenderedItemList
      dataList={artists}
      itemComponent={PassedItem}
      placeholderCount={placeholderCount}
    />
  );
};

export default ArtistList;
