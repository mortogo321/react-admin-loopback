import React, { Component } from 'react';
import {
  DisabledInput,
  Edit,
  FormTab,
  TabbedForm,
  TextInput,
  required,
} from 'react-admin';

import { Config } from '../../config';

class UserEdit extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - Edit User';
  }

  render() {
    return (
      <Edit title="Edit" {...this.props}>
        <TabbedForm defaultValue={{ role: 'user' }}>
          <FormTab label="User Info" path="">
            <DisabledInput source="id" />
            <TextInput source="username" validate={[required()]} />
            <TextInput type="email" source="email" validate={[required()]} />
            <TextInput source="password" validate={[required()]} />
          </FormTab>

          <FormTab label="Role" path="security">
            <TextInput source="role" validate={required()} />
          </FormTab>
        </TabbedForm>
      </Edit>
    );
  }
}

export default UserEdit;