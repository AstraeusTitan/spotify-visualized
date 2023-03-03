import Mood from "./Mood";

export default {
  title: "TrackCard/Mood",
  component: Mood,
};

const Template = (args) => <Mood {...args} />;

export const Default = Template.bind({});
Default.args = {
  features: {
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
