import React from 'react'
import Timer from '../_components/Timer'

const Template = args => <Timer {...args} />


const timerTemplate = {
  title: 'GAME/Timer',
  component: Timer,
  argTypes: {
    seconds: {
      description: 'O tempo em segundos',
      control: 'number'
    },
    onEnd: { action: 'clicked' },
    onStop: { action: 'clicked' },
    run: {control: 'boolean' }
  }
}

export default timerTemplate

export const Primary = Template.bind({});
Primary.args = {
  seconds: 180,
  run: false
}
