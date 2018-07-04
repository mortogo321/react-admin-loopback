import React, { Component } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton
} from 'react-admin';

import { Config } from '../../config';

class UserList extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - User';
  }

  render() {
    return (
      <List {...this.props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="username" />
          <TextField type="email" source="email" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      </List>
    );
  }
}

export default UserList;