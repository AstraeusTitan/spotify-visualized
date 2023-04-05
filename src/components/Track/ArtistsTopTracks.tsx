import { useSpotify } from "@/hooks/useSpotify";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";
import { useEffect, useState } from "react";
import Tabs from "../Shared/Tabs";
import TrackList from "./TrackList";

export interface Props {
  artist?: { id: string };
  className?: string;
  includeCharts?: boolean;
}

const ArtistsTopTracks = ({
  artist,
  className,
  includeCharts = false,
}: Props) => {
  const { spotify } = useSpotify();
  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  const [features, setFeatures] = useState<AudioFeatures[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify && artist) {
      const result = spotify.Api.getArtistsTopTracks(artist.id, {
        market: "US",
      });
      result
        .then((json) => setTracks(json.tracks))
        .catch((reason) => console.info(reason));
    }
  }, [artist, spotify]);

  useEffect(() => {
    if (spotify && tracks?.length) {
      const ids = tracks.map((t) => t.id);
      const result = spotify.Api.getSeveralTrackAudioFeatures({ ids: ids });
      result
        .then((json) => setFeatures(json.audio_features))
        .catch((reason) => console.info(reason));
    }
  }, [spotify, tracks]);

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
              {/* TODO: convert this to allow for selecting a market */}
              <TrackList tracks={tracks} features={features} />
            </Tabs.Panel>
            <Tabs.Panel>Graphs go here</Tabs.Panel>
          </Tabs.Panels>
        </Tabs.Group>
      ) : (
        <TrackList tracks={tracks} features={features} />
      )}
    </div>
  );
};

export default ArtistsTopTracks;
