import { Artist } from "@/utilities/Spotify/Api/artists";
import { Meta, StoryFn } from "@storybook/react";
import { Skeleton, WithData } from "./Item.stories";
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

export const Empty = Template.bind({});
Empty.args = {
  title: "Tracks",
  route: "tracks",
};
export const Loading = Template.bind({});
Loading.args = {
  title: "Tracks",
  route: "tracks",
  children: (
    <>
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
    </>
  ),
};
export const Populated = Template.bind({});
Populated.args = {
  title: "Tracks",
  route: "tracks",
  children: (
    <>
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
    </>
  ),
};
