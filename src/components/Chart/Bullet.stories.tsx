import Bullet, { BulletProps } from "./Bullet";

export default {
  component: Bullet,
  title: "Charts/Bullet Chart",
};
const Template = (args) => <Bullet {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 20,
  height: 200,
  min: 0,
  max: 100,
  measure: 75,
  compare: 25,
  label: "A",
  margins: {
    top: 10,
    bottom: 30,
    left: 5,
    right: 5,
  },
};

export const NoCompare = Template.bind({});
NoCompare.args = {
  ...Default.args,
  compare: undefined,
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  ...Default.args,
  label: undefined,
  margins: {},
};
