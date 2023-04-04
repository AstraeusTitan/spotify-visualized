import { Album } from "@/utilities/Spotify/Api";
import ItemList from "../Shared/ItemList";
import Item from "./Item";

const AlbumList = ({ albums }: { albums?: Album[] }) => {
  return (
    <ItemList>
      <>
        {albums === undefined && (
          <>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </>
        )}

        {albums?.length ? (
          albums?.map((album) => <Item album={album} key={album.id} />)
        ) : (
          <div>Empty State</div>
        )}
      </>
    </ItemList>
  );
};

export default AlbumList;
