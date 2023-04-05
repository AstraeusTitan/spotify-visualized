import { Meta, StoryFn } from "@storybook/react";
import ItemList from "./ItemList";
import { Artist } from "@/utilities/Spotify/Api/artists";
import ArtistList from "../Artist/ArtistList";

export default {
  component: ItemList,
  title: "Shared/RenderedItemList",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

const exampleArtist = {
  route: "/artist/1234",
  images: [
    {
      url: "https://i.scdn.co/image/ab6761610000e5ebf227a12da7990e1201753f54",
    },
  ],
  followers: {
    total: 20000,
    href: null,
  },
  popularity: 79,
  name: "Bliss n Eso",
};

export const LoadingArtistList: StoryFn = (args) => <ArtistList {...args} />;
LoadingArtistList.args = {
  artists: undefined,
  placeholderCount: 5,
};

export const FilledArtistList: StoryFn = (args) => <ArtistList {...args} />;
FilledArtistList.args = {
  artists: [
    exampleArtist,
    exampleArtist,
    exampleArtist,
    exampleArtist,
    exampleArtist,
  ],
  placeholderCount: 5,
};
