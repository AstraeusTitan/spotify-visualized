import { Container } from "@/components/Container";
import Section from "@/components/Section";
import TrackCard from "@/components/TrackCard";
import { useSpotify } from "@/hooks/useSpotify";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Details = () => {
  const router = useRouter();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [recentlyPlayedFeatures, setRecentlyPlayedFeatures] = useState<
    AudioFeatures[]
  >([]);
  const [recentlyPlayedAverages, setRecentlyPlayedAverages] =
    useState<AudioFeatures>();

  const { spotify } = useSpotify();

  const renderDetails =
    recentlyPlayed.length &&
    recentlyPlayedFeatures.length &&
    recentlyPlayedAverages;

  useEffect(() => {
    if (spotify && !spotify?.Auth.tokenValid()) {
      router.push("/");
    }
  }, [router, spotify]);

  // TODO: Refactor this mess of thens
  useEffect(() => {
    if (spotify?.Auth.tokenValid()) {
      spotify.Api.getRecentlyPlayed({ limit: 50 })
        .then((json) => json.items.map((wrappedTrack) => wrappedTrack.track))
        .then((tracks) => (setRecentlyPlayed(tracks), tracks))
        .then((tracks) => tracks.map((track) => track.id))
        .then((ids) =>
          spotify.Api.getTracksAudioFeatures({ ids: ids.join(",") })
        )
        .then(
          (json) => (
            setRecentlyPlayedFeatures(json.audio_features), json.audio_features
          )
        )
        .then((features) => {
          return features.reduce((avg, feat) => {
            Object.keys(feat).forEach(
              (key) => (avg[key] = feat[key] + (avg[key] || 0))
            );
            return avg;
          }, {} as AudioFeatures);
        })
        .then((sums) => {
          Object.keys(sums).forEach((key) => (sums[key] = sums[key] / 50));
          return sums;
        })
        .then((avgs) => (setRecentlyPlayedAverages(avgs), avgs))
        .catch((reason) => console.info(reason));
    }
  }, [spotify]);

  return (
    <main>
      <Container>
        <Section className="mt-16">
          <Section.Header>
            <Section.Eyebrow className="text-sky-500">
              Last 50 tracks played
            </Section.Eyebrow>
            <Section.Title>Recent Tracks</Section.Title>
          </Section.Header>
          <div
            className="
            flex
            flex-col
            gap-4
            mt-8"
          >
            {!!renderDetails &&
              recentlyPlayed.map((track, i) => {
                return (
                  <TrackCard
                    key={track.id}
                    track={track}
                    features={recentlyPlayedFeatures[i]}
                    averages={recentlyPlayedAverages}
                  />
                );
              })}
          </div>
        </Section>
      </Container>
    </main>
  );
};

export default Details;
