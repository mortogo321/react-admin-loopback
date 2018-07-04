import React, { Component } from 'react';
import {
  Show,
  Tab,
  TabbedShowLayout,
  TextField
} from 'react-admin';

import { Config } from '../../config';

class UserShow extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - User';
  }

  render() {
    return (
      <Show title="User Info" {...this.props}>
        <TabbedShowLayout>
          <Tab label="User Info">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="password" />
          </Tab>

          <Tab label="Role" path="security">
            <TextField source="role" />
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  }
}

export default UserShow;