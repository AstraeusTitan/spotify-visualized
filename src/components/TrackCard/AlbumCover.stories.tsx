import AlbumCover, { AlbumCoverProps } from "./AlbumCover";

export default {
  component: AlbumCover,
  title: "TrackCard/Album Cover",
};

const Template = (args: any) => <AlbumCover {...args} />;

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
