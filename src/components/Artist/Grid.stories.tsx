import { Artist } from "@/utilities/Spotify/Api";
import { Meta, StoryFn } from "@storybook/react";
import { WithData, Skeleton } from "./Card.stories";
import Grid from "./Grid";

export default {
  component: Grid,
  title: "Artist/Grid",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <Grid {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  title: "Artists",
  route: "/artists",
  artists: [],
};
export const Loading = Template.bind({});
Loading.args = {
  title: "Artists",
  route: "/artists",
  children: (
    <>
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
      <Skeleton {...Skeleton.args} />
    </>
  ),
};
export const Populated = Template.bind({});
Populated.args = {
  title: "Artists",
  route: "/artists",
  children: (
    <>
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
      <WithData {...WithData.args} />
    </>
  ),
};
