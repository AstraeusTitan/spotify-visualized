import { Meta, StoryFn } from "@storybook/react";
import DescriptionList from "./DescriptionList";

export default {
  component: DescriptionList,
  title: "Shared/DescriptionList",
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: StoryFn = (args) => (
  <DescriptionList>
    <DescriptionList.Header>
      <DescriptionList.Header.Title>
        Some Kind of Title
      </DescriptionList.Header.Title>
      <DescriptionList.Header.Subtitle>
        Here is the subtitle of the section
      </DescriptionList.Header.Subtitle>
    </DescriptionList.Header>
    <DescriptionList.List>
      <DescriptionList.Item>
        <DescriptionList.Item.Name>Item Name</DescriptionList.Item.Name>
        <DescriptionList.Item.Description>
          This is the description
        </DescriptionList.Item.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Item.Name>Item Name</DescriptionList.Item.Name>
        <DescriptionList.Item.Description>
          This is the description
        </DescriptionList.Item.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Item.Name>Item Name</DescriptionList.Item.Name>
        <DescriptionList.Item.Description>
          This is the description
        </DescriptionList.Item.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Item.Name>Item Name</DescriptionList.Item.Name>
        <DescriptionList.Item.Description>
          This is the description
        </DescriptionList.Item.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Item.Name>Item Name</DescriptionList.Item.Name>
        <DescriptionList.Item.Description>
          This is the description
        </DescriptionList.Item.Description>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Item.Name>Item Name</DescriptionList.Item.Name>
        <DescriptionList.Item.Description>
          This is the description
        </DescriptionList.Item.Description>
      </DescriptionList.Item>
    </DescriptionList.List>
  </DescriptionList>
);
