import { Container } from "@/components/Container";
import DescriptionList from "@/components/Shared/DescriptionList";
import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const formatDuration = (durationMs: number) => {
  let duration = durationMs / 1000;
  return `${Math.floor(duration / 60) || 0}:${(Math.round(duration % 60) || 0)
    .toString()
    .padStart(2, "0")}`;
};

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Track = () => {
  const router = useRouter();
  const { id } = router.query;
  const { spotify } = useSpotify();
  const [track, setTrack] = useState<Api.Track | undefined>(undefined);
  const [features, setFeatures] = useState<Api.AudioFeatures | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getTrack({ id: id as string });
      result
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setTrack(json as Api.Track);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify]);

  useEffect(() => {
    if (spotify && track) {
      const result = spotify.Api.getTrackAudioFeatures({ id: id as string });
      result
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setFeatures(json as Api.AudioFeatures);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify, track]);
  return (
    <main className="mt-8">
      <Container>
        <DescriptionList>
          <DescriptionList.Header>
            <DescriptionList.Header.Title>
              Full Track Details
            </DescriptionList.Header.Title>
            <DescriptionList.Header.Subtitle>
              Includes basic track data along with the track audio features
            </DescriptionList.Header.Subtitle>
          </DescriptionList.Header>
          <DescriptionList.List>
            <DescriptionList.Item>
              <DescriptionList.Item.Name>Title</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {track?.name || (
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Album</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!track ? (
                  // TODO: Style
                  <Link
                    href={`/album/${track.album.id}`}
                    className="underline hover:text-indigo-600"
                  >
                    {track.album.name}
                  </Link>
                ) : (
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Artist</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                <div className="flex gap-2">
                  {!!track ? (
                    track?.artists.map((a) => (
                      // TODO: Style
                      <Link
                        href={`/artist/${a.id}`}
                        key={a.id}
                        className="underline hover:text-indigo-600"
                      >
                        {a.name}
                      </Link>
                    ))
                  ) : (
                    <div className="h-5 w-24 bg-gray-300 rounded"></div>
                  )}
                </div>
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Popularity</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {track?.popularity || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Duration</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!track ? (
                  formatDuration(track?.duration_ms || 0)
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Tempo</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!features ? (
                  `${Math.round(features.tempo)} bpm`
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Key</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!features ? (
                  `${keys[features?.key || 12] || "key?"} ${
                    features?.mode ? "Major" : "Minor"
                  }`
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Explicit</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!track ? (
                  track.explicit ? (
                    "True"
                  ) : (
                    "False"
                  )
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            {/* TODO: add mood details */}
            <DescriptionList.Item>
              <DescriptionList.Item.Name>Mood</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {/* TODO: Replace with actual mood details and charts */}
                Mood Charts
              </DescriptionList.Item.Description>
            </DescriptionList.Item>
          </DescriptionList.List>
        </DescriptionList>
      </Container>
    </main>
  );
};

export default Track;
