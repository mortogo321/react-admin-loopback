import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import loopbackRestClient, { authClient } from 'aor-loopback';

import { Config } from './config';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import Income from './pages/Income';
import User from './pages/User';

import './App.css';

class App extends Component {
  componentDidMount() {
    document.title = Config.app.name;
  }

  render() {
    return (
      <Admin
        dataProvider={loopbackRestClient(Config.api())}
        authProvider={authClient(Config.api() + '/Users/login')}
        dashboard={Dashboard}
      >
        <Resource {...Expense} />
        <Resource {...Income} />
        <Resource {...User} />
      </Admin>
    );
  }
}

export default App;
