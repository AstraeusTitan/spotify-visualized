import { Meta, StoryFn } from "@storybook/react";
import { Filters } from "./Filters";
import Picker from "./Picker";

export default {
  component: Picker,
  title: "Filtering/Picker",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args: any) => <Picker {...args} />;

export const Default = Template.bind({});
Default.args = {
  filters: [
    Filters.duration,
    Filters.energy,
    Filters.name,
    Filters.mode,
    Filters.explicit,
    Filters.albumType,
  ],
  onChange: (f: any) => console.log("onChange", f),
};
