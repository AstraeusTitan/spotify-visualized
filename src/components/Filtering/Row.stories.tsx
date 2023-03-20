import { Meta, StoryFn } from "@storybook/react";
import { Filters } from "./Filters";
import Row from "./Row";

export default {
  component: Row,
  title: "Filtering/Row",
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <Row {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const WithFilters = Template.bind({});
WithFilters.args = {
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
