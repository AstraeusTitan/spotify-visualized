import { Container } from "@/components/Container";
import DescriptionList from "@/components/Shared/DescriptionList";
import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArtistList from "@/components/Artist/ArtistList";
import TrackArtists from "@/components/Artist/TrackArtists";
import AlbumList from "@/components/Album/AlbumList";

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
  const [artists, setArtists] = useState<Api.Artist[] | undefined>(undefined);
  const [album, setAlbum] = useState<Api.Album | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getTrack(id as string);
      result
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setTrack(json);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify]);

  useEffect(() => {
    if (spotify && track) {
      const artistIds = track?.artists.map((a) => a.id);
      const artistsResult = spotify.Api.getSeveralArtists({ ids: artistIds });
      artistsResult
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setArtists(json.artists);
          }
        })
        .catch((reason) => console.info(reason));

      const featuresResult = spotify.Api.getTrackAudioFeatures(id as string);
      featuresResult
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setFeatures(json);
          }
        })
        .catch((reason) => console.info(reason));

      const albumResult = spotify.Api.getAlbum(track.album.id);
      albumResult
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setAlbum(json);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify, track]);
  return (
    <main className="mt-8">
      <Head>
        <title>{`Track: ${track?.name || id} - Spotify Visualized`}</title>
      </Head>
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
                <AlbumList albums={!!album ? [album] : undefined} />
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Artist</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                <div className="flex gap-2">
                  <TrackArtists track={track} className="w-full" />
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
                  `${keys[features.key] || "?"} ${
                    features.mode ? "Major" : "Minor"
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
