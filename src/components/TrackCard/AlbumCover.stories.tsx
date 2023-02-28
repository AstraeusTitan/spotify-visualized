import AlbumCover from "./AlbumCover";

export default {
  component: AlbumCover,
  title: "Album Cover",
};

const Template = (args) => <AlbumCover {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
  alt: "Album Cover",
  className: "w-24 h-24",
};
