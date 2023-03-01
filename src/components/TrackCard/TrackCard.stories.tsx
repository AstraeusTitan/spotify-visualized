import TrackCard from ".";

export default {
  title: "TrackCard",
  component: TrackCard,
};

const Template = (args) => <TrackCard trackData={args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Song Title",
  artist: "Song artist",
  albumCoverURL:
    "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
  mode: 1,
  tempo: 120,
  songKey: undefined,
  duration: 120000,
  popularity: 34,
  accousticness: {
    measure: 0.3,
    compare: 0.5,
  },
  danceability: {
    measure: 0.3,
    compare: 0.5,
  },
  energy: {
    measure: 0.3,
    compare: 0.5,
  },
  instrumentalness: {
    measure: 0.3,
    compare: 0.5,
  },
  liveness: {
    measure: 0.3,
    compare: 0.5,
  },
  loudness: {
    measure: -34,
    compare: -7,
  },
  speachiness: {
    measure: 0.3,
    compare: 0.5,
  },
  valence: {
    measure: 0.3,
    compare: 0.5,
  },
};
