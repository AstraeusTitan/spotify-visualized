import TrackCard from ".";

export default {
  title: "TrackCard",
  component: TrackCard,
};

const Template = (args) => <TrackCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  track: {
    popularity: 44,
    name: "Song Name",
    artists: [{ name: "Artist_1" }, { name: "Artist_2" }],
    album: {
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        },
      ],
      name: "Test Album",
    },
  },
  features: {
    key: 3,
    mode: 1,
    tempo: 120,
    duration_ms: 210791,
    danceability: 0.4,
    energy: 0.4,
    loudness: -40,
    speechiness: 0.4,
    acousticness: 0.4,
    instrumentalness: 0.4,
    liveness: 0.4,
    valence: 0.4,
  },
  averages: {
    danceability: 0.6,
    energy: 0.6,
    loudness: -20,
    speechiness: 0.6,
    acousticness: 0.6,
    instrumentalness: 0.6,
    liveness: 0.6,
    valence: 0.6,
  },
};
