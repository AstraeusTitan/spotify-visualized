import { Meta, StoryFn } from "@storybook/react";
import { Filters, Tests } from "./Filters";
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

const exampleAppliedFilter = {
  filter: {
    name: "Energy",
    field: "energy",
    tests: [Tests.isNumber, Tests.isGreater, Tests.isLess],
  },
  test: Tests.isGreater,
  value: 1234,
};

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

export const WithInitialState = Template.bind({});
WithInitialState.args = {
  initialState: exampleAppliedFilter,
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
