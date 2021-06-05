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
      type: {name: 'enum', required: false},
      control: {
        type: 'select',
        options: ButtonConfigs.COLOR_SCHEMES,
      },
      defaultValue: ButtonConfigs.COLOR_SCHEMES.COR_1,
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

export const Iniciar = Template.bind({});
Iniciar.args = {
  blink: true,
  showArrow: true,
  stayAsPill: false,
  label: 'Iniciar',
  direction: ButtonConfigs.BUTTON_DIRECTIONS.RIGHT,
};

export const Voltar = Template.bind({});
Voltar.args = {
  blink: true,
  showArrow: true,
  stayAsPill: false,
  label: 'Voltar',
  direction: ButtonConfigs.BUTTON_DIRECTIONS.LEFT,
  colorScheme: ButtonConfigs.COLOR_SCHEMES.COR_2,
};

export const PularTutorial = Template.bind({});
PularTutorial.args = {
  blink: true,
  showArrow: true,
  stayAsPill: true,
  label: 'Pular Tutorial',
  direction: ButtonConfigs.BUTTON_DIRECTIONS.RIGHT,
  colorScheme: ButtonConfigs.COLOR_SCHEMES.COR_2,
};
