import { useSpotify } from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import Tabs from "../Shared/Tabs";
import TrackList from "./TrackList";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";

type Props = {
  limit?: number;
  includeCharts?: boolean;
  className?: string;
};

const RecentTracks = ({ limit, includeCharts = false, className }: Props) => {
  const { spotify } = useSpotify();
  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  const [features, setFeatures] = useState<AudioFeatures[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getRecentlyPlayed({
        limit: limit || 10,
      });
      result
        .then((json) => setTracks(json.items.map((w) => w.track)))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify]);

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

export default RecentTracks;
