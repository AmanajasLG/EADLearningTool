import React from 'react';

import {Button, BUTTON_DIRECTIONS} from '../_components/Button';

const buttonTemplate = {
  title: 'Game/Button',
  component: Button,
  parameters:{docs:{description:{component: 'Botão ~~de~~ **uso** _geral_'}}},
  argTypes: {
    onClick: { action: 'clicked' },
    direction: {
      defaultValue: 'center',
      control: {
        type: 'select',
        // options: opts,
        options: Object.entries(BUTTON_DIRECTIONS).map(opt => opt[1]),
      },
      type: {name: 'enum', required: false},
      description: 'Para qual direção o botão deve apontar',
      table: {
        type: {summary: 'enum'},
        defaultValue: {summary: 'center'},
      },
    },
  },
};

export default buttonTemplate;

const Template = ({label, ...otherArgs}) => {return(
  <Button {...otherArgs} >
    {label}
  </Button>
)};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  blink: true,
  label: 'Button',
  data: {value1: 1, value2: 2}
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
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
