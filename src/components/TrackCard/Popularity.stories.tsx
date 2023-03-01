import Popularity from "./Popularity";

export default {
  title: "TrackCard/Popularity",
  component: Popularity,
};

const Template = (args) => <Popularity {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 85,
};
