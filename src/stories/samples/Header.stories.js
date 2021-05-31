import React from 'react';

import { Header } from './Header';

const headerTemplate = {
  title: 'Example/Header',
  component: Header,
};

export default headerTemplate

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
