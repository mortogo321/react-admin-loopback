import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { Config } from '../../config';

class About extends Component {
  componentDidMount() {
    document.title = Config.app.name + ' - About';
  }

  render() {
    return (
      <Card>
        <CardHeader title="About" />
        <CardContent>
          <p>Implement by <a href="mailto:sekseason@gmail.com?subject=React Admin Demo">Sekseason</a></p>
        </CardContent>
      </Card>
    );
  }
}

export default About;
