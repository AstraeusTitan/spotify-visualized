import Mood from "./Mood";

export default {
  title: "TrackCard/Mood",
  component: Mood,
};

const Template = (args) => <Mood {...args} />;

export const Default = Template.bind({});
Default.args = {
  bulletWidth: 20,
  height: 96,
  accousticness: {
    measure: 0.1,
    compare: 0.5,
  },
  danceability: {
    measure: 0.4,
    compare: 0.2,
  },
  energy: {
    measure: 0.678,
    compare: 0.467,
  },
  instrumentalness: {
    measure: 0.02,
    compare: 0.1,
  },
  liveness: {
    measure: 0.2,
    compare: 0.8,
  },
  loudness: {
    measure: -45,
    compare: -20,
  },
  speachiness: {
    measure: 0.378,
    compare: 0.256,
  },
  valence: {
    measure: 0.5,
    compare: 0.45,
  },
};
