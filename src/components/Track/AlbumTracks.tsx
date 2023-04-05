import { Album } from "@/utilities/Spotify/Api/albums";
import Tabs from "../Shared/Tabs";
import TrackList from "./TrackList";
import { useSpotify } from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";

type Props = {
  album?: Album;
  includeCharts?: boolean;
  className?: string;
};

const AlbumTracks = ({ album, className, includeCharts = false }: Props) => {
  const { spotify } = useSpotify();
  const [trackIds, setTrackIds] = useState<string[] | undefined>(undefined);
  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  const [features, setFeatures] = useState<AudioFeatures[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify && album) {
      const result = spotify.Api.getAlbumTracks(album.id, {
        limit: 50,
      });
      result
        .then((json) => setTrackIds(json.items.map((track) => track.id)))
        .catch((reason) => console.info(reason));
    }
  }, [album, spotify]);

  useEffect(() => {
    if (spotify && trackIds?.length) {
      const tracksResult = spotify.Api.getSeveralTracks({
        ids: trackIds,
      });
      const featuresResult = spotify.Api.getSeveralTrackAudioFeatures({
        ids: trackIds,
      });
      tracksResult
        .then((json) => setTracks(json.tracks))
        .catch((reason) => console.info(reason));
      featuresResult
        .then((json) => setFeatures(json.audio_features))
        .catch((reason) => console.info(reason));
    }
  }, [spotify, trackIds]);

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

export default AlbumTracks;
