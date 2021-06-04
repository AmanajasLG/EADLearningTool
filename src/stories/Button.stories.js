import React from 'react';
import '../colorPalettes.scss'

import {Button, ButtonConfigs} from '../_components/Button';

const buttonTemplate = {
  title: 'Game/Button',
  component: Button,
  parameters:{docs:{description:{component: 'Botão ~~de~~ **uso** _geral_'}}},
  argTypes: {
    onClick: { action: 'clicked' },
    colorScheme: {
      description: 'Cor do botão',
      table: {
        type: {summary: 'enum'},
        defaultValue: {summary: Object.keys(ButtonConfigs.COLOR_SCHEMES)[0]},
      },
      type: {name: 'enum', required: true},
      control: {
        type: 'select',
        options: Object.keys(ButtonConfigs.COLOR_SCHEMES),
      },
      defaultValue: Object.keys(ButtonConfigs.COLOR_SCHEMES)[0],
    },
    direction: {
      description: 'Para qual direção o botão deve apontar',
      table: {
        type: {summary: 'enum'},
        defaultValue: {summary: ButtonConfigs.BUTTON_DIRECTIONS.CENTER},
      },
      defaultValue: ButtonConfigs.BUTTON_DIRECTIONS.CENTER,
      control: {
        type: 'select',
        options: Object.values(ButtonConfigs.BUTTON_DIRECTIONS),
      },
      type: {name: 'enum', required: false},
    },
  },
};

export default buttonTemplate;

const Template = ({label, ...otherArgs}) => {return(
  <Button {...otherArgs} >
    {label}
  </Button>
)};

export const Next = Template.bind({});
Next.args = {
  primary: true,
  blink: true,
  label: 'Start',
  direction: ButtonConfigs.BUTTON_DIRECTIONS.RIGHT,
};

export const Previous = Template.bind({});
Previous.args = {
  primary: false,
  blink: true,
  label: 'Back',
  direction: ButtonConfigs.BUTTON_DIRECTIONS.LEFT,
};

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
