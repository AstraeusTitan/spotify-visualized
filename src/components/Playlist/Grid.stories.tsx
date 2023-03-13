import { Meta, StoryFn } from "@storybook/react";
import { WithData1, WithData2, Skeleton } from "./Card.stories";
import Grid from "./Grid";

export default {
  component: Grid,
  title: "Playlist/Grid",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <Grid {...args} />;

const examplePlaylist = {
  collaborative: true,
  description:
    "Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every Monday.",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/37i9dQZEVXcNcJAbKyiLSR",
  },
  href: "https://api.spotify.com/v1/playlists/37i9dQZEVXcNcJAbKyiLSR",
  id: "37i9dQZEVXcNcJAbKyiLSR",
  images: [
    {
      height: null,
      url: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/aAbca4VNfzWuUCQ_FGiEFA==/bmVuZW5lbmVuZW5lbmVuZQ==",
      width: null,
    },
  ],
  name: "Discover Weekly",
  owner: {
    display_name: "Spotify",
    external_urls: {
      spotify: "https://open.spotify.com/user/spotify",
    },
    href: "https://api.spotify.com/v1/users/spotify",
    id: "spotify",
    type: "user",
    uri: "spotify:user:spotify",
  },
  public: false,
  _public: false,
  snapshot_id: "MCwwMDAwMDAwMGY3ZTZhYWViNDZlZGYwNjIyNjYwMDkwN2ExMDM4NTVh",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/37i9dQZEVXcNcJAbKyiLSR/tracks",
    total: 30,
  },
  type: "playlist",
  uri: "spotify:playlist:37i9dQZEVXcNcJAbKyiLSR",
};

const examplePlaylist2 = {
  collaborative: false,
  description: "",
  external_urls: {
    spotify: "https://open.spotify.com/playlist/3Rx8tLIYa290mnviAKg50k",
  },
  href: "https://api.spotify.com/v1/playlists/3Rx8tLIYa290mnviAKg50k",
  id: "3Rx8tLIYa290mnviAKg50k",
  images: [
    {
      height: 640,
      url: "https://mosaic.scdn.co/640/ab67616d0000b27330f001c095708ef8e4ddf6ddab67616d0000b2734b2ccb72271a4a1510a7d250ab67616d0000b273741e3f0a9e7cf598b7ece6d4ab67616d0000b273f8d099fc53a9697c11010c2d",
      width: 640,
    },
    {
      height: 300,
      url: "https://mosaic.scdn.co/300/ab67616d0000b27330f001c095708ef8e4ddf6ddab67616d0000b2734b2ccb72271a4a1510a7d250ab67616d0000b273741e3f0a9e7cf598b7ece6d4ab67616d0000b273f8d099fc53a9697c11010c2d",
      width: 300,
    },
    {
      height: 60,
      url: "https://mosaic.scdn.co/60/ab67616d0000b27330f001c095708ef8e4ddf6ddab67616d0000b2734b2ccb72271a4a1510a7d250ab67616d0000b273741e3f0a9e7cf598b7ece6d4ab67616d0000b273f8d099fc53a9697c11010c2d",
      width: 60,
    },
  ],
  name: "Breathless ft. Michelle Quezada - Regulators Remix – Candyland",
  owner: {
    display_name: "1262408958",
    external_urls: {
      spotify: "https://open.spotify.com/user/1262408958",
    },
    href: "https://api.spotify.com/v1/users/1262408958",
    id: "1262408958",
    type: "user",
    uri: "spotify:user:1262408958",
  },
  primary_color: null,
  public: true,
  _public: true,
  snapshot_id: "MTEsNDY1ZGRmODllYjUwODg1MTkzNDQ0M2RiMjU1OTg3ZGY3MzUxYjRjYg==",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/3Rx8tLIYa290mnviAKg50k/tracks",
    total: 9,
  },
  type: "playlist",
  uri: "spotify:playlist:3Rx8tLIYa290mnviAKg50k",
};

export const Empty = Template.bind({});
Empty.args = {
  title: "Playlists",
  route: "/playlists",
};
export const Loading = Template.bind({});
Loading.args = {
  title: "Playlists",
  route: "/playlists",
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
  title: "Playlists",
  route: "/playlists",
  children: (
    <>
      <WithData1 {...WithData1.args} />
      <WithData2 {...WithData2.args} />
      <WithData1 {...WithData1.args} />
      <WithData2 {...WithData2.args} />
      <WithData1 {...WithData1.args} />
      <WithData2 {...WithData2.args} />
      <WithData1 {...WithData1.args} />
      <WithData2 {...WithData2.args} />
    </>
  ),
};
