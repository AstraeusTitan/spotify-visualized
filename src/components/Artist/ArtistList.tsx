import * as Api from "@/utilities/Spotify/Api";
import ItemList from "../Shared/ItemList";
import Item from "./Item";

const ArtistList = ({ artists }: { artists?: Api.Artist[] }) => {
  return (
    <ItemList>
      <>
        {artists === undefined && (
          <>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </>
        )}

        {artists?.length ? (
          artists?.map((artist) => <Item artist={artist} key={artist.id} />)
        ) : (
          <div>Empty State</div>
        )}
      </>
    </ItemList>
  );
};

export default ArtistList;
