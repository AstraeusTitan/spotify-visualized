import Details from "./Details";

export default {
  title: "TrackCard/Details",
  component: Details,
};

const Template = (args) => <Details {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Some Track Name",
  artist: "An Artist Name",
  tempo: 120,
  mode: 1,
  songKey: "b",
  duration: 80000,
  popularity: 75,
};
