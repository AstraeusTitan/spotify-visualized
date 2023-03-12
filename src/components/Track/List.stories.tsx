import { Artist } from "@/utilities/Spotify/Api";
import { Meta, StoryFn } from "@storybook/react";
import List from "./List";

export default {
  component: List,
  title: "Track/List",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <List {...args} />;
const exampleTrack = {
  album: {
    album_group: "album",
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/0MlOPi3zIDMVrfA9R04Fe3",
        },
        href: "https://api.spotify.com/v1/artists/0MlOPi3zIDMVrfA9R04Fe3",
        id: "0MlOPi3zIDMVrfA9R04Fe3",
        name: "American Authors",
        type: "artist",
        uri: "spotify:artist:0MlOPi3zIDMVrfA9R04Fe3",
      },
    ],
    external_urls: {
      spotify: "https://open.spotify.com/album/2rIJP88CPNzBrvHW06R3Ve",
    },
    href: "https://api.spotify.com/v1/albums/2rIJP88CPNzBrvHW06R3Ve",
    id: "2rIJP88CPNzBrvHW06R3Ve",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b27360026b6614c10bf718fe9197",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e0260026b6614c10bf718fe9197",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d0000485160026b6614c10bf718fe9197",
        width: 64,
      },
    ],
    is_playable: true,
    name: "Best Night of My Life",
    release_date: "2023-02-10",
    release_date_precision: "day",
    total_tracks: 10,
    type: "album",
    uri: "spotify:album:2rIJP88CPNzBrvHW06R3Ve",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/0MlOPi3zIDMVrfA9R04Fe3",
      },
      href: "https://api.spotify.com/v1/artists/0MlOPi3zIDMVrfA9R04Fe3",
      id: "0MlOPi3zIDMVrfA9R04Fe3",
      name: "American Authors",
      type: "artist",
      uri: "spotify:artist:0MlOPi3zIDMVrfA9R04Fe3",
    },
  ],
  disc_number: 1,
  duration_ms: 177555,
  explicit: false,
  external_ids: {
    isrc: "USFLB2301380",
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/4dwOKNdjnoeLBnH5AyfV6F",
  },
  href: "https://api.spotify.com/v1/tracks/4dwOKNdjnoeLBnH5AyfV6F",
  id: "6fQoomNZcRthXGJmR8JulG",
  is_local: false,
  name: "Movin' On",
  popularity: 35,
  preview_url:
    "https://p.scdn.co/mp3-preview/74ebbdd532d34aefdcd97a0bbdd8a1a8d6482c04?cid=d52c3270fe6a46d18cf39675c2517caf",
  track_number: 10,
  type: "track",
  uri: "spotify:track:4dwOKNdjnoeLBnH5AyfV6F",
};

const exampleFeatures = {
  danceability: 0.531,
  energy: 0.873,
  key: 5,
  loudness: -3.499,
  mode: 1,
  speechiness: 0.0357,
  acousticness: 0.0168,
  instrumentalness: 0.00000351,
  liveness: 0.341,
  valence: 0.253,
  tempo: 128.024,
  type: "audio_features",
  id: "6fQoomNZcRthXGJmR8JulG",
  uri: "spotify:track:6fQoomNZcRthXGJmR8JulG",
  track_href: "https://api.spotify.com/v1/tracks/6fQoomNZcRthXGJmR8JulG",
  analysis_url:
    "https://api.spotify.com/v1/audio-analysis/6fQoomNZcRthXGJmR8JulG",
  duration_ms: 210791,
  time_signature: 4,
};

export const Empty = Template.bind({});
Empty.args = {
  title: "Tracks",
  itemRoute: "/track",
  tracks: [],
};
export const Loading = Template.bind({});
Loading.args = {
  title: "Tracks",
  itemRoute: "/track",
  tracks: undefined,
};
export const Filled = Template.bind({});
Filled.args = {
  title: "Tracks",
  itemRoute: "/track",
  indexRoute: "tracks",
  tracks: [
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
    exampleTrack,
  ],
  features: [exampleFeatures],
};
