import React from 'react'
import Blob from '../_components/Blob'

const Template = args => <Blob {...args} />

const blobTemplate = {
  title: 'Example/Blob',
  component: Blob,
}

export default blobTemplate

export const Primary = Template.bind({});
Primary.args = {}
