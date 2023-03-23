import { Meta, StoryFn } from "@storybook/react";
import ItemList from "./ItemList";

export default {
  component: ItemList,
  title: "Shared/ItemList",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Track: StoryFn = (args) => (
  <ItemList>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.track.name}</ItemList.Item.Title>
        <ItemList.Item.Subtitle>{args.artist.name}</ItemList.Item.Subtitle>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock
          label="popularity"
          data={args.track.popularity}
          className="hidden md:flex"
        />
        <ItemList.Item.DataBlock
          label="pop."
          data={args.track.popularity}
          className="md:hidden"
        />
        <ItemList.Item.DataBlock label="duration" data={args.track.duration} />
        <ItemList.Item.DataBlock label="tempo" data={args.track.tempo} />
        <ItemList.Item.DataBlock label="key" data={args.track.key} />
      </div>
    </ItemList.Item>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.track.name}</ItemList.Item.Title>
        <ItemList.Item.Subtitle>{args.artist.name}</ItemList.Item.Subtitle>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock
          label="popularity"
          data={args.track.popularity}
          className="hidden md:flex"
        />
        <ItemList.Item.DataBlock
          label="pop."
          data={args.track.popularity}
          className="md:hidden"
        />
        <ItemList.Item.DataBlock label="duration" data={args.track.duration} />
        <ItemList.Item.DataBlock label="tempo" data={args.track.tempo} />
        <ItemList.Item.DataBlock label="key" data={args.track.key} />
      </div>
    </ItemList.Item>
  </ItemList>
);
Track.args = {
  route: "/track/1234",
  src: "https://i.scdn.co/image/ab67616d0000b27360026b6614c10bf718fe9197",
  alt: "Album Cover",
  track: {
    name: "Movin' On",
    duration: "2:36",
    tempo: "120 bpm",
    key: "B Major",
    popularity: 57,
  },
  artist: {
    name: "American Authors",
  },
};

export const Artist: StoryFn = (args) => (
  <ItemList>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.name}</ItemList.Item.Title>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock label="popularity" data={args.popularity} />
        <ItemList.Item.DataBlock label="followers" data={args.followers} />
      </div>
    </ItemList.Item>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.name}</ItemList.Item.Title>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock label="popularity" data={args.popularity} />
        <ItemList.Item.DataBlock label="followers" data={args.followers} />
      </div>
    </ItemList.Item>
  </ItemList>
);
Artist.args = {
  route: "/artist/1234",
  src: "https://i.scdn.co/image/ab6761610000e5ebf227a12da7990e1201753f54",
  alt: "Artist Image",
  followers: "2,000,000",
  popularity: 79,
  name: "Bliss n Eso",
};

export const Album: StoryFn = (args) => (
  <ItemList>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.album.name}</ItemList.Item.Title>
        <ItemList.Item.Subtitle>{args.artist.name}</ItemList.Item.Subtitle>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock
          label="popularity"
          data={args.album.popularity}
        />
        <ItemList.Item.DataBlock label="tracks" data={args.album.tracks} />
        <ItemList.Item.DataBlock label="type" data={args.album.type} />
      </div>
    </ItemList.Item>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.album.name}</ItemList.Item.Title>
        <ItemList.Item.Subtitle>{args.artist.name}</ItemList.Item.Subtitle>
      </div>
      <div className="flex flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.DataBlock
          label="popularity"
          data={args.album.popularity}
        />
        <ItemList.Item.DataBlock label="tracks" data={args.album.tracks} />
        <ItemList.Item.DataBlock label="type" data={args.album.type} />
      </div>
    </ItemList.Item>
  </ItemList>
);
Album.args = {
  route: "/track/1234",
  src: "https://i.scdn.co/image/ab67616d0000b27360026b6614c10bf718fe9197",
  alt: "Album Cover",
  album: {
    name: "Movin' On",
    type: "album",
    tracks: 14,
    popularity: 57,
  },
  artist: {
    name: "American Authors",
  },
};

export const Playlist: StoryFn = (args) => (
  <ItemList>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.name}</ItemList.Item.Title>
        <ItemList.Item.Subtitle>by {args.owner}</ItemList.Item.Subtitle>
      </div>
      <div className="flex items-center flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        {/* TODO: turn into a tag */}
        <ItemList.Item.Tag className="bg-blue-300 text-blue-900">
          {args.visible}
        </ItemList.Item.Tag>
        <ItemList.Item.DataBlock label="followers" data={args.followers} />
        <ItemList.Item.DataBlock label="tracks" data={args.tracks} />
      </div>
    </ItemList.Item>
    <ItemList.Item route={args.route}>
      <ItemList.Item.Thumbnail src={args.src} alt={args.alt} />
      <div className="flex flex-col gap-2">
        <ItemList.Item.Title>{args.name}</ItemList.Item.Title>
        <ItemList.Item.Subtitle>by {args.owner}</ItemList.Item.Subtitle>
      </div>
      <div className="flex items-center flex-grow flex-wrap justify-evenly md:justify-end gap-2 md:gap-6 md:pr-8">
        <ItemList.Item.Tag className="bg-blue-300 text-blue-900">
          {args.visible}
        </ItemList.Item.Tag>
        <ItemList.Item.DataBlock label="followers" data={args.followers} />
        <ItemList.Item.DataBlock label="tracks" data={args.tracks} />
      </div>
    </ItemList.Item>
  </ItemList>
);
Playlist.args = {
  route: "/track/1234",
  src: "https://i.scdn.co/image/ab67616d0000b27360026b6614c10bf718fe9197",
  alt: "Playlist Cover",
  name: "My First Playlist",
  owner: "Cody Constant",
  tracks: 14,
  followers: "3,650",
  visible: "Public",
};
