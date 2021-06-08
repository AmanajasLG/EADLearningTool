import React from 'react'
import Blob, { BlobBg } from '../_components/Blob'

const Template = args => <Blob {...args} />


const blobTemplate = {
  title: 'Example/Blob',
  component: Blob,
  argTypes: {
    fill: { control: 'color' },
    stroke: { control: 'color' },
    strokeWidth: {
      control: {
        type: 'range',
        min: 0,
        max: 10
      }
    }
  }
}

export default blobTemplate

export const Primary = Template.bind({});
Primary.args = {
  fill: '#d6e3f4'
}
