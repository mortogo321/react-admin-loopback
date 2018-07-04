import React, { Component } from 'react';
import { List, Datagrid, TextField } from 'react-admin';

import { Config } from '../../config';

class IncomeList extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - Income';
  }

  render() {
    return (
      <List {...this.props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <TextField source="body" />
        </Datagrid>
      </List>
    );
  }
}

export default IncomeList;