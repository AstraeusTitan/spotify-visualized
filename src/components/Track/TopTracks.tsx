import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import { useEffect, useState } from "react";
import Tabs from "../Shared/Tabs";
import TrackList from "./TrackList";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";

type Props = {
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
  includeCharts?: boolean;
  className?: string;
};

const TopTracks = ({
  time_range = "short_term",
  limit,
  includeCharts = false,
  className,
}: Props) => {
  const { spotify } = useSpotify();
  const [tracks, setTracks] = useState<Track[] | undefined>(undefined);
  const [features, setFeatures] = useState<AudioFeatures[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getUsersTopItems("tracks", {
        limit: limit || 10,
        time_range: time_range,
      });
      result
        .then((json) => setTracks(json.items as Track[]))
        .catch((reason) => console.info(reason));
    }
  }, [limit, spotify, time_range]);

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

export default TopTracks;
