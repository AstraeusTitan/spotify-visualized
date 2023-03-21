import { Meta, StoryFn } from "@storybook/react";
import DataSection from "./DataSection";
import Tabs from "./Tabs";

export default {
  component: DataSection,
  title: "Shared/DataSection",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Basic: StoryFn = (args) => (
  <DataSection>
    <DataSection.Header>
      <DataSection.Header.Title>{args.title}</DataSection.Header.Title>
      <div>Additional Stuff in Header</div>
    </DataSection.Header>
    <DataSection.Panel>
      <div>Panel Content</div>
    </DataSection.Panel>
  </DataSection>
);
Basic.args = {
  title: "Test Header",
};

export const BasicWithRoute: StoryFn = (args) => (
  <DataSection>
    <DataSection.Header>
      <DataSection.Header.Title showAll={args.showAll}>
        {args.title}
      </DataSection.Header.Title>
      <div>Additional Stuff in Header</div>
    </DataSection.Header>
    <DataSection.Panel>
      <div>Panel Content</div>
    </DataSection.Panel>
  </DataSection>
);
BasicWithRoute.args = {
  title: "Test Header",
  showAll: "/show-all",
};

export const BasicWithExtraControl: StoryFn = (args) => (
  <DataSection>
    <DataSection.Header>
      <DataSection.Header.Title showAll={args.showAll}>
        Test Header
      </DataSection.Header.Title>
      <div className="w-fit">
        <select
          id="time_frame"
          name="time_frame"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="short_term">Last 4 Weeks</option>
          <option value="medium_term">Last 6 Months</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
    </DataSection.Header>
    <DataSection.Panel>
      <div>Panel Content</div>
    </DataSection.Panel>
  </DataSection>
);
BasicWithExtraControl.args = {
  showAll: "/show-all",
};

export const BasicWithTabs: StoryFn = (args) => (
  <DataSection className="divide-none">
    <DataSection.Header>
      <DataSection.Header.Title showAll={args.showAll}>
        {args.title}
      </DataSection.Header.Title>
      <div>Additional Stuff in Header</div>
    </DataSection.Header>
    <DataSection.Panel className="pt-0">
      <Tabs.Group>
        <Tabs.List>
          <Tabs.BasicTab>Tracks</Tabs.BasicTab>
          <Tabs.BasicTab>Charts</Tabs.BasicTab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Panel 1</Tabs.Panel>
          <Tabs.Panel>Panel 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
    </DataSection.Panel>
  </DataSection>
);
BasicWithTabs.args = {
  title: "Test Header",
  showAll: "/test",
};
