import React, { PureComponent } from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';

import { RouterProvider } from './router.context';

export class Router extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.history = createHistory();
    this.history.listen(this.handleHistoryChange);

    this.state = {
      location: this.history.location,
      push: this.history.push,
      replace: this.history.replace,
    };
  }

  handleHistoryChange = (location) => this.setState({ location });

  render() {
    return (
      <RouterProvider value={this.state}>
        {this.props.children}
      </RouterProvider>
    );
  }
}
