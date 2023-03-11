import { Artist } from "@/utilities/Spotify/Api";
import { Meta, StoryFn } from "@storybook/react";
import Card from "./Card";

export default {
  component: Card,
  title: "Artist/Card",
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <Card {...args} />;

const exampleArtist: Artist = {
  external_urls: {
    spotify: "https://open.spotify.com/artist/1xSSjJrKTO2ZNPU81uLtmI",
  },
  followers: {
    href: null,
    total: 0,
  },
  genres: ["australian hip hop", "pop rap"],
  href: "https://api.spotify.com/v1/artists/1xSSjJrKTO2ZNPU81uLtmI",
  id: "1xSSjJrKTO2ZNPU81uLtmI",
  images: [
    {
      height: 640,
      url: "https://i.scdn.co/image/ab6761610000e5ebf227a12da7990e1201753f54",
      width: 640,
    },
    {
      height: 320,
      url: "https://i.scdn.co/image/ab67616100005174f227a12da7990e1201753f54",
      width: 320,
    },
    {
      height: 160,
      url: "https://i.scdn.co/image/ab6761610000f178f227a12da7990e1201753f54",
      width: 160,
    },
  ],
  name: "Bliss n Eso",
  popularity: 58,
  type: "artist",
  uri: "spotify:artist:1xSSjJrKTO2ZNPU81uLtmI",
};

export const Skeleton = Template.bind({});
export const Filled = Template.bind({});
Filled.args = { ...exampleArtist, route: "/artist" };
