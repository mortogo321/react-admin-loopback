import React, { Component } from 'react';
import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
} from 'react-admin';

import { Config } from '../../config';

const UserCreateToolbar = ({ ...props }) => (
  <Toolbar {...props}>
    <SaveButton
      label="Save"
      redirect="show"
      submitOnEnter={true}
    />
  </Toolbar>
);

class UserCreate extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - Create User';
  }

  render() {
    return (
      <Create {...this.props}>
        <SimpleForm
          toolbar={<UserCreateToolbar />}
          defaultValue={{ role: 'user' }}
        >
          <TextInput source="username" validate={[required()]} />
          <TextInput type="email" source="email" validate={[required()]} />
          <TextInput source="password" validate={[required()]} />
          <TextInput source="role" validate={[required()]} />
        </SimpleForm>
      </Create>
    );
  }
}

export default UserCreate;