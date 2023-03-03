import { Meta, StoryFn } from "@storybook/react";
import Popularity, { PopularityProps } from "./Popularity";

export default {
  title: "TrackCard/Popularity",
  component: Popularity,
} as Meta;

const Template: StoryFn = (args) => (
  <Popularity {...(args as PopularityProps)} />
);

export const Default = Template.bind({});
Default.args = {
  value: 85,
};
