import { Meta, StoryFn } from "@storybook/react";
import Tabs from ".";

export default {
  title: "Shared/Tabs",
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: StoryFn = (args) => (
  <Tabs.Group>
    <Tabs.List>
      <Tabs.BasicTab>Tab 1</Tabs.BasicTab>
      <Tabs.BasicTab>Tab 2</Tabs.BasicTab>
      <Tabs.BasicTab>Tab 3</Tabs.BasicTab>
      <Tabs.BasicTab>Tab 4</Tabs.BasicTab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel>Panel 1</Tabs.Panel>
      <Tabs.Panel>Panel 2</Tabs.Panel>
      <Tabs.Panel>Panel 3</Tabs.Panel>
      <Tabs.Panel>Panel 4</Tabs.Panel>
    </Tabs.Panels>
  </Tabs.Group>
);
