import { Album } from "@/utilities/Spotify/Api/albums";
import { UserPlaylist } from "@/utilities/Spotify/Api/playlists";
import { AudioFeatures, Track } from "@/utilities/Spotify/Api/tracks";

export type FilterOptions = {
  name: string;
  field?: string;
  get?: (obj: any) => any;
  tests: FilterTest[];
};

export type FilterTest = {
  name: string;
  matcher: (checkValue: any, testValue?: any) => boolean;
  value?: {
    component: ({ onChange }: { onChange: (value: any) => any }) => JSX.Element;
  };
};

const NumberInput = ({
  rounded,
  onChange,
}: {
  rounded?: boolean;
  onChange?: (value: number) => any;
}) => {
  return (
    <div className="w-full sm:w-48">
      <label className="sr-only">Number Input</label>
      <input
        type="number"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => {
          const parsed = parseFloat(e.target.value);
          const value = rounded ? Math.round(parsed) : parsed;
          onChange && onChange(value);
        }}
      />
    </div>
  );
};

const TextInput = ({ onChange }: { onChange?: (value: string) => any }) => {
  return (
    <div className="w-full sm:w-48">
      <label className="sr-only">Text Input</label>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

const SelectInput = ({
  options,
  onChange,
}: {
  options: { name: string; value: string }[];
  onChange?: (value: string) => any;
}) => {
  return (
    <div className="w-full sm:w-48">
      <label className="sr-only">Select Input</label>
      <select
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        <option className="hidden">Select Field</option>
        {options?.map((option, i: number) => (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// TODO: make this actually select multiple
const SelectMultiInput = ({
  options,
  onChange,
}: {
  options: { name: string; value: string }[];
  onChange?: (value: string) => any;
}) => {
  return (
    <div className="w-full sm:w-48">
      <label className="sr-only">Select Input</label>
      <select
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        <option className="hidden">Select Field</option>
        {options?.map((option, i: number) => (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

type Tests = {
  [key: string]: FilterTest | ((...props: any) => FilterTest);
  isNumber: FilterTest;
  isSelect: (options: { name: string; value: string }[]) => FilterTest;
  isSelectMulti: (options: { name: string; value: string }[]) => FilterTest;
  isGreater: FilterTest;
  isLess: FilterTest;
  isSet: FilterTest;
  isUnset: FilterTest;
  startsWith: FilterTest;
  endsWith: FilterTest;
  contains: FilterTest;
};

export const Tests: Tests = {
  isNumber: {
    name: "Is",
    matcher: (c: number, t: number) => c === t,
    value: {
      component: NumberInput,
    },
  },
  isSelect: (options) => {
    return {
      name: "Is",
      matcher: (c: string, t: string) => c === t,
      value: {
        component: ({ onChange }: { onChange?: (value: string) => any }) =>
          SelectInput({ options, onChange }),
      },
    };
  },
  // TODO: make multi select compare correctly
  isSelectMulti: (options) => {
    return {
      name: "Is",
      matcher: (c: number, t: number) => c === t,
      value: {
        component: ({ onChange }: { onChange?: (value: string) => any }) =>
          SelectMultiInput({ options, onChange }),
      },
    };
  },
  isGreater: {
    name: "Is Greater Than",
    matcher: (c: number, t: number) => c > t,
    value: {
      component: NumberInput,
    },
  },
  isLess: {
    name: "Is Less Than",
    matcher: (c: number, t: number) => c < t,
    value: {
      component: NumberInput,
    },
  },
  isSet: {
    name: "Is Set",
    matcher: (c) => c !== undefined,
  },
  isUnset: {
    name: "Is Not Set",
    matcher: (c, t) => c === undefined,
  },
  startsWith: {
    name: "Starts With",
    matcher: (c: string, t: string) => c.startsWith(t),
    value: {
      component: TextInput,
    },
  },
  endsWith: {
    name: "Ends With",
    matcher: (c: string, t: string) => c.endsWith(t),
    value: {
      component: TextInput,
    },
  },
  contains: {
    name: "Contains",
    matcher: (c: string, t: string) => c.includes(t),
    value: {
      component: TextInput,
    },
  },
};

export const Filters = {
  danceability: {
    name: "Danceability",
    field: "danceability",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  energy: {
    name: "Energy",
    field: "energy",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  key: {
    name: "Key",
    field: "key",
    tests: [Tests.isSelect([]), Tests.isSet],
  } as FilterOptions,

  loudness: {
    name: "Loudness",
    field: "loudness",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  mode: {
    name: "Mode",
    get: (obj: AudioFeatures) => obj.mode.toString(),
    tests: [
      Tests.isSelect([
        { name: "Major", value: "1" },
        { name: "Minor", value: "0" },
      ]),
    ],
  } as FilterOptions,

  speechiness: {
    name: "Speechiness",
    field: "speechiness",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  acousticness: {
    name: "Acousticness",
    field: "acousticness",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  instrumentalness: {
    name: "Instrumentalness",
    field: "instrumentalness",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  liveness: {
    name: "Liveness",
    field: "liveness",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  valence: {
    name: "Valence",
    field: "valence",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  tempo: {
    name: "Tempo",
    field: "tempo",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  duration: {
    name: "Duration",
    get: (obj: Track) => Math.round(obj.duration_ms / 1000),
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  // market: {},
  popularity: {
    name: "Popularity",
    field: "popularity",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  explicit: {
    name: "Explicit",
    get: (obj: AudioFeatures) => obj.explicit.toString(),
    tests: [
      Tests.isSelect([
        { name: "True", value: "true" },
        { name: "False", value: "false" },
      ]),
    ],
  } as FilterOptions,

  name: {
    name: "Name",
    field: "name",
    tests: [Tests.contains, Tests.startsWith, Tests.endsWith],
  } as FilterOptions,

  artistName: {
    name: "Name",
    get: (obj: Track | Album) => obj.artists.map((a) => a.name).join(" "),
    tests: [Tests.contains],
  } as FilterOptions,

  genre: {
    name: "Genre",
    field: "genre",
    // TODO: setup possible genres
    tests: [Tests.isSelectMulti([])],
  } as FilterOptions,

  followers: {
    name: "Followers",
    field: "followers",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  albumTrackCount: {
    name: "Track Count",
    field: "total_tracks",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  playlistTrackCount: {
    name: "Track Count",
    get: (obj: UserPlaylist) => obj.tracks.total,
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  } as FilterOptions,

  albumType: {
    name: "Album Type",
    field: "type",
    tests: [
      Tests.isSelectMulti([
        { name: "Single", value: "single" },
        { name: "Album", value: "album" },
        { name: "Compilation", value: "compilation" },
      ]),
    ],
  } as FilterOptions,
};
