import Details from "./Details";

export default {
  title: "TrackCard/Details",
  component: Details,
};

const Template = (args) => <Details {...args} />;

export const Default = Template.bind({});
Default.args = {
  track: {
    popularity: 44,
    name: "Song Name",
    artists: [{ name: "Artist_1" }, { name: "Artist_2" }],
  },
  features: {
    key: 3,
    mode: 1,
    tempo: 120,
    duration_ms: 210791,
  },
};
