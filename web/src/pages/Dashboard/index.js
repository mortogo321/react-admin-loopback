import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { Config } from '../../config';

class Dashboard extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - Dashboard';
  }

  render() {
    return (
      <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
          <p>The demo of react-admin and loopback with mongoDB.</p>
          <p>
            View source code: <a href="https://github.com/sekseason/react-admin-loopback" target="_blank" rel="noopener noreferrer">Github</a>
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default Dashboard;
