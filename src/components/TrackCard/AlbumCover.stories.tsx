import AlbumCover, { AlbumCoverProps } from "./AlbumCover";
import { Meta, StoryFn } from "@storybook/react";

export default {
  component: AlbumCover,
  title: "TrackCard/Album Cover",
} as Meta;

const Template: StoryFn = (args: any) => <AlbumCover {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  album: {
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      },
    ],
    name: "Test Album",
  },
  className: "w-24 h-24",
};
