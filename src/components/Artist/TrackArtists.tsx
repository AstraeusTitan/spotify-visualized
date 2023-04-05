import { Artist } from "@/utilities/Spotify/Api/artists";
import Tabs from "../Shared/Tabs";
import ArtistList from "./ArtistList";
import { useSpotify } from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import { Track } from "@/utilities/Spotify/Api/tracks";

type Props = {
  track?: Track;
  includeCharts?: boolean;
  className?: string;
};

const TrackArtists = ({ track, className, includeCharts }: Props) => {
  const { spotify } = useSpotify();
  const [artists, setArtists] = useState<Artist[] | undefined>(undefined);

  useEffect(() => {
    if (spotify && track) {
      const artistIds = track.artists.map((a) => a.id);
      const result = spotify.Api.getSeveralArtists({ ids: artistIds });
      result
        .then((json) => setArtists(json.artists))
        .catch((reason) => console.info(reason));
    }
  }, [spotify, track]);

  return (
    <div className={className}>
      {includeCharts ? (
        <Tabs.Group>
          <Tabs.List>
            <Tabs.BasicTab>Tracks</Tabs.BasicTab>
            <Tabs.BasicTab>Graphs</Tabs.BasicTab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel>
              <ArtistList artists={artists} />
            </Tabs.Panel>
            <Tabs.Panel>Graphs go here</Tabs.Panel>
          </Tabs.Panels>
        </Tabs.Group>
      ) : (
        <ArtistList artists={artists} placeholderCount={1} />
      )}
    </div>
  );
};

export default TrackArtists;
