import React, { Component } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton
} from 'react-admin';

import { Config } from '../../config';

class ExpenseList extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - Expense';
  }

  render() {
    return (
      <List {...this.props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="cost" />
          <TextField source="date" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      </List>
    );
  }
}

export default ExpenseList;