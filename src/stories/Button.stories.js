import React from 'react';

import Button from '../_components/Button';

const buttonTemplate = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    backgroundColor: { control: 'color' },
  },
};

export default buttonTemplate

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  blink: true,
  children: 'Button',
  data: {value1: 1, value2: 2}
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  children: 'HAHA',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
