import { AudioFeatures, FullPlaylist, Track } from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Tabs from "../Shared/Tabs";
import TrackList from "./TrackList";
import { useSpotify } from "@/hooks/useSpotify";

type Props = {
  playlist?: FullPlaylist;
  includeCharts?: boolean;
  className?: string;
};

const PlaylistTracks = ({ playlist, includeCharts, className }: Props) => {
  const { spotify } = useSpotify();
  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  const [features, setFeatures] = useState<AudioFeatures[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (playlist) {
      setTracks(
        playlist.tracks.items.map((playlistTrack) => playlistTrack.track)
      );
    }
  }, [playlist]);

  useEffect(() => {
    if (spotify && tracks?.length) {
      const ids = tracks.map((t) => t.id);
      const result = spotify.Api.getTracksAudioFeatures({ ids: ids });
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

export default PlaylistTracks;
