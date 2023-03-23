import { Meta, StoryFn } from "@storybook/react";
import * as PlaylistCard from "../Playlist/Card.stories";
import * as AlbumCard from "../Album/Card.stories";
import CardGrid from "../Shared/CardGrid";

export default {
  component: CardGrid,
  title: "Shared/CardGrid",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <CardGrid {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  title: "Playlists",
  route: "/playlists",
};

// Playlists
export const LoadingPlaylists = Template.bind({});
LoadingPlaylists.args = {
  title: "Playlists",
  route: "/playlists",
  children: (
    <>
      <PlaylistCard.Skeleton {...PlaylistCard.Skeleton.args} />
      <PlaylistCard.Skeleton {...PlaylistCard.Skeleton.args} />
      <PlaylistCard.Skeleton {...PlaylistCard.Skeleton.args} />
      <PlaylistCard.Skeleton {...PlaylistCard.Skeleton.args} />
    </>
  ),
};
export const PopulatedPlaylists = Template.bind({});
PopulatedPlaylists.args = {
  title: "Playlists",
  route: "/playlists",
  children: (
    <>
      <PlaylistCard.WithData1 {...PlaylistCard.WithData1.args} />
      <PlaylistCard.WithData2 {...PlaylistCard.WithData2.args} />
      <PlaylistCard.WithData1 {...PlaylistCard.WithData1.args} />
      <PlaylistCard.WithData2 {...PlaylistCard.WithData2.args} />
      <PlaylistCard.WithData1 {...PlaylistCard.WithData1.args} />
      <PlaylistCard.WithData2 {...PlaylistCard.WithData2.args} />
      <PlaylistCard.WithData1 {...PlaylistCard.WithData1.args} />
      <PlaylistCard.WithData2 {...PlaylistCard.WithData2.args} />
    </>
  ),
};

// Albums
export const LoadingAlbums = Template.bind({});
LoadingAlbums.args = {
  title: "Albums",
  route: "/albums",
  children: (
    <>
      <AlbumCard.Skeleton {...AlbumCard.Skeleton.args} />
      <AlbumCard.Skeleton {...AlbumCard.Skeleton.args} />
      <AlbumCard.Skeleton {...AlbumCard.Skeleton.args} />
      <AlbumCard.Skeleton {...AlbumCard.Skeleton.args} />
    </>
  ),
};
export const PopulatedAlbums = Template.bind({});
PopulatedAlbums.args = {
  title: "Albums",
  route: "/albums",
  children: (
    <>
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
      <AlbumCard.WithData {...AlbumCard.WithData.args} />
    </>
  ),
};
