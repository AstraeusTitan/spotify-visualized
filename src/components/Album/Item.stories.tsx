import { Meta, StoryFn } from "@storybook/react";
import Item from "./Item";

export default {
  component: Item,
  title: "Album/Item",
  decorators: [
    (Story) => (
      <ul className="max-w-3xl">
        <Story />
      </ul>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <Item album={args} />;

const exampleAlbum = {
  album_group: "album",
  album_type: "album",
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg",
      },
      href: "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
      id: "0TnOYISbd1XYRBk9myaseg",
      name: "Pitbull",
      type: "artist",
      uri: "spotify:artist:0TnOYISbd1XYRBk9myaseg",
    },
  ],
  copyrights: [
    {
      text: "(P) 2012 RCA Records, a division of Sony Music Entertainment",
      type: "P",
    },
  ],
  external_ids: {
    upc: "886443671584",
  },
  external_urls: {
    spotify: "https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy",
  },
  genres: [],
  href: "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
  id: "4aawyAB9vmqN3uQ7FjRGTy",
  images: [
    {
      height: 640,
      url: "https://i.scdn.co/image/ab67616d0000b2732c5b24ecfa39523a75c993c4",
      width: 640,
    },
    {
      height: 300,
      url: "https://i.scdn.co/image/ab67616d00001e022c5b24ecfa39523a75c993c4",
      width: 300,
    },
    {
      height: 64,
      url: "https://i.scdn.co/image/ab67616d000048512c5b24ecfa39523a75c993c4",
      width: 64,
    },
  ],
  label: "Mr.305/Polo Grounds Music/RCA Records",
  name: "Global Warming",
  popularity: 56,
  release_date: "2012-11-16",
  release_date_precision: "day",
  total_tracks: 18,
  type: "album",
  uri: "spotify:album:4aawyAB9vmqN3uQ7FjRGTy",
};

export const Skeleton = Template.bind({});
export const WithData = Template.bind({});
WithData.args = exampleAlbum;
