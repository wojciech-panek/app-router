import React, { PureComponent } from 'react';

import { Route } from '../route/route.component';


export class TransitionRoute extends PureComponent {
  render() {
    return <Route {...this.props} />;
  }
}
